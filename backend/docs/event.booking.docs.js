/**
 * @swagger
 * /api/event/create-booking:
 *   post:
 *     summary: Create Event Booking (Stripe Payment)
 *     tags: [Events]
 *     description: User selects tickets and creates a pending booking. Stripe checkout session URL is returned.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - tickets
 *             properties:
 *               eventId:
 *                 type: string
 *                 example: 65f123abc456def789000666
 *
 *               tickets:
 *                 type: array
 *                 description: Selected ticket types with quantity
 *                 items:
 *                   type: object
 *                   required:
 *                     - ticketId
 *                     - quantity
 *                   properties:
 *                     ticketId:
 *                       type: string
 *                       example: 65fTicket123abc456
 *                     quantity:
 *                       type: integer
 *                       example: 2
 *
 *     responses:
 *       200:
 *         description: Stripe checkout session created successfully
 *       400:
 *         description: Invalid ticket selection or seat availability issue
 *       404:
 *         description: Event or Ticket not found
 *       500:
 *         description: Internal server error
 */ 

/**
 * @swagger
 * /api/event/booking/marksuccess/{id}:
 *   patch:
 *     summary: Manual Payment Confirmation (Test Only)
 *     tags: [Events]
 *     description: Manually mark a pending booking as paid (for testing without Stripe).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660abc123def456ghi789
 *     responses:
 *       200:
 *         description: Payment marked as successful
 *       400:
 *         description: Booking already paid or invalid data
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: User or Booking not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/bookings:
 *   get:
 *     summary: Get All User Event Bookings
 *     tags: [Events]
 *     description: Returns paginated list of all event bookings of logged-in user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default 1)
 *     responses:
 *       200:
 *         description: Bookings fetched successfully
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/booking/{id}:
 *   get:
 *     summary: Get Event Booking Details
 *     tags: [Events]
 *     description: Returns full details of a specific event booking for logged-in user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660abc123def456ghi789
 *     responses:
 *       200:
 *         description: Booking details found
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/booking/cancelbooking/{id}:
 *   patch:
 *     summary: Cancel Event Booking
 *     tags: [Events]
 *     description: User can cancel an event booking. If payment was completed, ticket quantities and seats are restored.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 660abc123def456ghi789
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       400:
 *         description: Booking already cancelled
 *       403:
 *         description: Unauthorized
 *       404:
 *         description: Booking not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/verify-ticket:
 *   post:
 *     summary: Verify Event Ticket (Organizer Only)
 *     tags: [Events]
 *     description: Organizer can verify a ticket using ticket code. Prevents double scanning and checks event validity.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - ticketCode
 *             properties:
 *               ticketCode:
 *                 type: string
 *                 example: A7K92XZPQR
 *     responses:
 *       200:
 *         description: Ticket verified successfully
 *       400:
 *         description: Ticket invalid, already used, expired, or not paid
 *       403:
 *         description: Unauthorized or not event organizer
 *       404:
 *         description: Ticket not found
 *       500:
 *         description: Internal server error
 */