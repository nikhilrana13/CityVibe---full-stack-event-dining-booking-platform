/**
 * @swagger
 * /api/restaurant/slots:
 *   get:
 *     summary: Get Available Time Slots for Restaurant
 *     tags: [Dining]
 *     description: Returns available lunch and dinner slots for a selected restaurant on a specific date.
 *     parameters:
 *       - in: query
 *         name: restaurantId
 *         required: true
 *         schema:
 *           type: string
 *         example: 65c123abc456def789000333
 *         description: Restaurant ID
 *
 *       - in: query
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         example: 2026-03-10
 *         description: Booking date (YYYY-MM-DD)
 *
 *     responses:
 *       200:
 *         description: Slots fetched successfully
 *       400:
 *         description: Missing restaurantId or date
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/restaurant/create-booking:
 *   post:
 *     summary: Create Restaurant Booking
 *     tags: [Dining]
 *     description: User can book a table for a selected restaurant and time slot.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - restaurantId
 *               - bookingdate
 *               - timeSlot
 *               - numberofguests
 *               - reservationType
 *             properties:
 *               restaurantId:
 *                 type: string
 *                 example: 65c123abc456def789000333
 *
 *               bookingdate:
 *                 type: string
 *                 format: date
 *                 example: 2026-03-10
 *
 *               timeSlot:
 *                 type: string
 *                 example: 13:30
 *
 *               numberofguests:
 *                 type: integer
 *                 example: 4
 *
 *               reservationType:
 *                 type: string
 *                 example: dine-in
 *
 *               specialrequests:
 *                 type: string
 *                 example: Window seat if available
 *
 *     responses:
 *       200:
 *         description: Booking confirmed
 *       400:
 *         description: Validation error (past date, invalid slot, guest limit exceeded, etc.)
 *       404:
 *         description: User or Restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/restaurant/cancelbooking/{id}:
 *   patch:
 *     summary: Cancel Restaurant Booking
 *     tags: [Dining]
 *     description: User can cancel their confirmed restaurant booking.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65e123abc456def789000555
 *     responses:
 *       200:
 *         description: Booking cancelled successfully
 *       404:
 *         description: User or Booking not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/restaurant/userbookings:
 *   get:
 *     summary: Get All User Dining Bookings
 *     tags: [Dining]
 *     description: Returns paginated list of all dining bookings of logged-in user.
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
 * /api/restaurant/booking/{id}:
 *   get:
 *     summary: Get Dining Booking Details
 *     tags: [Dining]
 *     description: Returns full details of a specific booking for logged-in user.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65e123abc456def789000555
 *     responses:
 *       200:
 *         description: Booking details found
 *       404:
 *         description: Booking or User not found
 *       500:
 *         description: Internal server error
 */ 