const User = require("../models/usermodel.js");
const Campaign = require("../models/campaignmodel.js");
const CampaignUsage = require("../models/campaignusagemodel.js");
const Eventbooking = require("../models/bookings/eventbookingmodel.js");

const CalculateOffer = async ({ userId, campaignId, eventId, tickets }) => {
  try {
    // basic validation
    if (!userId) {
      throw new Error("User ID is required");
    }
    if (!campaignId) {
      throw new Error("Campaign ID is required");
    }
    if (!eventId) {
      throw new Error("Event ID is required");
    }
    if (!tickets) {
      throw new Error("Tickets are required");
    }
    let parsedTickets = tickets;
    // If tickets comes from FormData
    if (typeof parsedTickets === "string") {
      try {
        parsedTickets = JSON.parse(parsedTickets);
      } catch {
        throw new Error("Invalid tickets format");
      }
    }

    if (!Array.isArray(parsedTickets) || parsedTickets.length === 0) {
      throw new Error("At least one ticket must be selected");
    }
    // user validation
    const user = await User.findById(userId);
    if (!user) {
      throw new Error("User not found");
    }
    // campaign validation
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new Error("Campaign not found");
    }
    // Active check
    if (!campaign.isActive) {
      throw new Error("Campaign is not active");
    }
    // Date check
    const now = new Date();
    if (now < campaign.startDate) {
      throw new Error("Campaign has not started yet");
    }
    if (now >= campaign.endDate) {
      throw new Error("Campaign has expired");
    }
    // Global usage limit
    if (campaign.usedCount >= campaign.usageLimit) {
      throw new Error("Campaign usage limit reached");
    }
    // per user usage limit
    const userCampaignUsage = await CampaignUsage.countDocuments({
      campaignId,
      userId,
    });

    if (userCampaignUsage >= campaign.perUserLimit) {
      throw new Error("You have already used this offer");
    }
    // applicable validation
    if (campaign.applicableFor === "first_booking") {
      const bookingCount = await Eventbooking.countDocuments({
        user: userId,
        paymentStatus: "paid",
        bookingStatus: "confirmed",
      });

      if (bookingCount > 0) {
        throw new Error("This offer is only available for your first booking");
      }
    }

    if (campaign.applicableFor === "inactive_users") {
      const lastBooking = await Eventbooking.findOne({
        userId,
        paymentStatus: "paid",
        bookingStatus: "confirmed",
      }).sort({ createdAt: -1 });

      // Never booked → don't consider inactive
      if (!lastBooking) {
        throw new Error("You are not eligible for this offer");
      }
      const inactiveDays = 30;
      const inactiveSince = new Date();
      inactiveSince.setDate(inactiveSince.getDate() - inactiveDays);

      if (lastBooking.createdAt > inactiveSince) {
        throw new Error("You are not eligible for this inactive user offer");
      }
    }
    // event validation
    const event = await Event.findById(eventId);
    if (!event) {
      throw new Error("Event not found");
    }
    // ticket validation
    let subtotal = 0;
    let totalQuantity = 0;
    const selectedTicketIds = new Set();

    for (const ticket of parsedTickets) {
      if (!ticket.ticketId) {
        throw new Error("Ticket ID is required");
      }
      // duplicate ticket   
      const ticketId = ticket.ticketId.toString();
      if (selectedTicketIds.has(ticketId)) {
        throw new Error("Duplicate ticket selected");
      }
      selectedTicketIds.add(ticketId);
       // Quantity validation
      if (ticket.quantity === undefined || ticket.quantity === null) {
        throw new Error("Ticket quantity is required");
      }
      const quantity = Number(ticket.quantity);
      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid ticket quantity");
      }
       // Ticket belongs to event
      const eventTicket = event.tickets?.find(
        (item) => item._id.toString() === ticketId
      );
      if (!eventTicket) {
        throw new Error(
          `Ticket ${ticketId} does not belong to this event`,
        );
      }
      const ticketPrice = Number(eventTicket.price);
      if (!Number.isFinite(ticketPrice) || ticketPrice < 0) {
        throw new Error("Invalid ticket price");
      }
      totalQuantity += quantity;
      subtotal += ticketPrice * quantity;
    }
    // Check total event availability
    if (totalQuantity > event.availableSeats) {
      throw new Error(`Only ${event.availableSeats} seats are available`);
    }
    // minimum order validation
    if (subtotal < campaign.minOrderAmount) {
      throw new Error(`Minimum order amount is ₹${campaign.minOrderAmount}`);
    }
    // calculate discount
    let discountAmount = 0;
    if (campaign.discountType === "percentage") {
      discountAmount = (subtotal * campaign.discountValue) / 100;

      // Apply max discount
      if (campaign.maxDiscount !== null && campaign.maxDiscount !== undefined) {
        discountAmount = Math.min(discountAmount, campaign.maxDiscount);
      }
    }

    if (campaign.discountType === "flat") {
      discountAmount = campaign.discountValue;
    }
    // Never allow discount greater than subtotal
    discountAmount = Math.min(discountAmount, subtotal);
    // Avoid floating point money issues
    discountAmount = Number(discountAmount.toFixed(2));
    const finalAmount = Number(
      Math.max(0, subtotal - discountAmount).toFixed(2),
    );
    // offer preview
    return {
      success: true,
      campaignId: campaign._id,
      campaignTitle: campaign.title,
      subtotal,
      discountType: campaign.discountType,
      discountValue: campaign.discountValue,
      discountAmount,
      finalAmount,
      minOrderAmount: campaign.minOrderAmount,
      savings: discountAmount,
    };
  } catch (error) {
    console.error("CalculateOffer error:", error);
    throw error;
  }
};

module.exports = CalculateOffer