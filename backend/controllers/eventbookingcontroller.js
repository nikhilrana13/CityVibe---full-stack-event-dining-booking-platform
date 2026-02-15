const Eventbooking = require("../models/bookings/eventbookingmodel.js");
const Event = require("../models/eventmodel.js");
const Ticket = require("../models/ticketmodel");
const User = require("../models/usermodel.js");
const Response = require("../utils/responsehandler.js");
const StripeInstance = require("../utils/stripe.js");

/** 
 * 
 * Create Event Booking & Initiate Stripe Payment
 *
 * Flow:
 * 1. Validate user, event, and selected tickets.
 * 2. Ensure tickets belong to the event and have sufficient availability.
 * 3. Calculate:
 *      - totalAmount (price × quantity)
 *      - totalSeats (quantity × paxCount)
 * 4. Verify event-level availableSeats.
 * 5. Prevent duplicate bookings (pending/confirmed).
 * 6. Create booking with:
 *      - paymentStatus: "pending"
 *      - bookingStatus: "pending"
 * 7. Generate Stripe Checkout session.
 * 8. Return Stripe session URL to frontend.
 *
 * Important:
 * - Seat deduction happens ONLY after successful payment
 *   (handled in webhook or payment confirmation handler).
 * - paxCount defines how many seats one ticket represents
 *   (e.g., Couple Pass = 2 seats).
 *
 * Request Body Example:
 * {
 *   eventId: "eventId",
 *   tickets: [
 *     { ticketId: "ticketId1", quantity: 2 },
 *     { ticketId: "ticketId2", quantity: 1 }
 *   ]
 * }
 */
// event booking
const CreateEventBooking = async (req, res) => {
  try {
    const userId = req.user;
    let { eventId, tickets } = req.body;
    if (!eventId) {
      return Response(res, 400, "Eventid is required");
    }
    if (!tickets) {
      return Response(res, 400, "Tickets is required");
    }
    // parse if tickets come as string
    if (typeof tickets === "string") {
      try {
        tickets = JSON.parse(tickets);
      } catch (error) {
        return Response(res, 400, "Invalid tickets format", error);
      }
    }
    if (!Array.isArray(tickets) || tickets.length === 0) {
      return Response(res, 400, "At least one ticket must be selected");
    }
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "user not found");
    }
    const event = await Event.findById(eventId);
    if (!event || !event.eventIsActive) {
      return Response(res, 404, "Event not found or inactive");
    }
    let totalAmount = 0;
    let totalSeatsToBook = 0;
    let bookingTickets = [];

    for (let item of tickets) {
      if (!item.ticketId || !item.quantity) {
        return Response(res, 400, "Invalid ticket selection");
      }
      const quantity = Number(item.quantity);
      const ticket = await Ticket.findById(item.ticketId);
      if (!ticket) {
        return Response(res, 404, "Ticket not found");
      }
      if (ticket.event.toString() !== eventId) {
        return Response(res, 400, "Ticket does not belong to this event");
      }

      if (quantity <= 0) {
        return Response(res, 400, "Invalid ticket quantity");
      }
      if (ticket.availableQuantity < quantity) {
        return Response(res, 400, "Not enough tickets available");
      }
      const seatsforThisticket = quantity * ticket.paxCount;
      totalSeatsToBook += seatsforThisticket;
      totalAmount += ticket.price * quantity;

      bookingTickets.push({
        ticket: ticket._id,
        quantity: quantity,
        price: ticket.price,
        paxCount: ticket.paxCount,
      });
    }
    // Check event level seats
    if (event.availableSeats < totalSeatsToBook) {
      return Response(res, 400, "Not enough seats available for this event");
    }
    // console.log("totalseatstobook",totalSeatsToBook)
    // checked booking already exists
    const existingBooking = await Eventbooking.findOne({
      event: eventId,
      user: userId,
      bookingStatus: { $in: ["pending", "confirmed"] },
    });
    if (existingBooking) {
      return Response(res, 400, "You have already booked this event");
    }
    // create booking
    const booking = await Eventbooking.create({
      user: user._id,
      event: event._id,
      tickets: bookingTickets,
      totalAmount,
      paymentStatus: "pending",
      bookingStatus: "pending",
      totalSeats: totalSeatsToBook,
    });
    
    // Create Stripe line items
    const lineItems = [];
    for (let item of bookingTickets) {
      const ticketDoc = await Ticket.findById(item.ticket);
      lineItems.push({
        price_data: {
          currency: "inr",
          product_data: {
            name: `${event.title} - ${ticketDoc.name}`,
            description: `Qty:${item.quantity}`,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      });
    }
    // Stripe Checkout Session
    const session = await StripeInstance.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.FRONTEND_URL}/payment-success?bookingId=${booking._id}`,
      cancel_url: `${process.env.FRONTEND_URL}/payment-failed?bookingId=${booking._id}`,
      metadata: {
        bookingId: booking._id.toString(),
        userId: user._id.toString(),
        eventId: eventId.toString(),
      },
    });
    const populatedBooking = await Eventbooking.findById(booking._id).populate(
      "tickets.ticket",
      "name price paxCount",
    );
    //  console.log("Payment successful:", session);
    return Response(res, 200, "Booking sucessfully", {
      url: session.url,
      populatedBooking,
    });
  } catch (error) {
    console.error("failed to book event", error);
    return Response(res, 500, "Internal Server error");
  }
};
// stripe webhook
const StripeWebhookHandler = async (req, res) => {
  const sig = req.headers["stripe-signature"];
  let event;
  try {
    event = StripeInstance.webhooks.constructEvent(
      req.body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET,
    );
  } catch (err) {
    console.log("Webhook signature verification failed", err.message);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  // Handle event types
  // payment success
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const bookingId = session.metadata.bookingId;
    const booking = await Eventbooking.findById(bookingId);
    if (!booking) return res.json({ received: true });
    // Prevent double processing
    if (booking.paymentStatus === "paid") {
      return res.json({ received: true });
    }
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    await booking.save();
    // Deduct ticket quantities
    for (let item of booking.tickets) {
      const ticket = await Ticket.findById(item.ticket);
      if (ticket) {
        ticket.availableQuantity -= item.quantity;
        await ticket.save();
      }
    }
    // Deduct event seats
    const eventDoc = await Event.findById(booking.event);
    if (eventDoc) {
      eventDoc.availableSeats -= booking.totalSeats;
      await eventDoc.save();
    }
  }
  //payment failed or expired
  if (
    event.type === "checkout.session.expired" ||
    event.type === "payment_intent.payment_failed"
  ) {
    const session = event.data.object;
    const bookingId = session.metadata?.bookingId;
    const booking = await Eventbooking.findById(bookingId);
    if (booking) {
      booking.paymentStatus = "failed";
      booking.bookingStatus = "cancelled";
      await booking.save();
    }
  }
  res.json({ received: true });
};
//test only - Manual payment confirmation
const UpdatePaymentStatus = async (req, res) => {
  try {
    const userId = req.user;
    const bookingId = req.params.id;
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    const booking = await Eventbooking.findById(bookingId);
    if (!booking) {
      return Response(res, 404, "Booking not found");
    }
     if (booking.user.toString() !== userId) {
      return Response(res, 403, "Unauthorized");
    }
    // Prevent double processing
    if (booking.paymentStatus === "paid") {
      return Response(res, 400, "Booking already paid");
    }
    // Update booking status
    booking.paymentStatus = "paid";
    booking.bookingStatus = "confirmed";
    await booking.save();
    // Deduct ticket quantities
    for (let item of booking.tickets) {
      const ticket = await Ticket.findById(item.ticket);
      if (ticket) {
        ticket.availableQuantity -= item.quantity;
        await ticket.save();
      }
    }
    // Deduct event seats
    const event = await Event.findById(booking.event);
     if (isNaN(booking.totalSeats)) {
      return Response(res, 400, "Invalid booking seat data");
    }
  // console.log("Booking totalSeats:", booking.totalSeats);
  // console.log("Event availableSeats before:", event.availableSeats);
    if (event) {
      event.availableSeats -= booking.totalSeats;
      await event.save();
    }
    // // Optional: Send email
    // if (event) {
    //   await SendBookingDetails(user, booking, event);
    // }
    return Response(res, 200, "Payment marked as successful", booking);
  } catch (error) {
    console.log("failed to update payment status", error);
    return Response(res, 500, "Internal server error");
  }
};


module.exports = { CreateEventBooking, StripeWebhookHandler,UpdatePaymentStatus};
