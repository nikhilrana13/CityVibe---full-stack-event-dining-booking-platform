/**
 * @swagger
 * /api/organizer/onboarding:
 *   post:
 *     summary: Organizer Onboarding (Business KYC)
 *     tags: [Organizer]
 *     description: User submits business details and PAN card image to become an organizer. Admin approval required.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - businessName
 *               - businessEmail
 *               - businessPhone
 *               - panNumber
 *               - bankAccountNumber
 *               - ifscCode
 *               - pancardimage
 *             properties:
 *               businessName:
 *                 type: string
 *                 example: Royal Events Pvt Ltd
 *
 *               businessEmail:
 *                 type: string
 *                 example: contact@royalevents.com
 *
 *               businessPhone:
 *                 type: string
 *                 example: 9876543210
 *
 *               panNumber:
 *                 type: string
 *                 example: ABCDE1234F
 *
 *               bankAccountNumber:
 *                 type: string
 *                 example: 123456789012
 *
 *               ifscCode:
 *                 type: string
 *                 example: HDFC0001234
 *
 *               pancardimage:
 *                 type: string
 *                 format: binary
 *                 description: Upload PAN card image
 *
 *     responses:
 *       200:
 *         description: Onboarding successful
 *       400:
 *         description: Validation error or already submitted
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/updateprofile:
 *   patch:
 *     summary: Update Organizer Business Profile
 *     tags: [Organizer]
 *     description: Approved organizer can update business name, email, or phone number.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               businessName:
 *                 type: string
 *                 example: Royal Events Updated
 *
 *               businessEmail:
 *                 type: string
 *                 example: newemail@royalevents.com
 *
 *               businessPhone:
 *                 type: string
 *                 example: 9999999999
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error
 *       403:
 *         description: Only approved organizers can update profile
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/dashboard/stats:
 *   get:
 *     summary: Get Organizer Dashboard Statistics
 *     tags: [Organizer]
 *     description: Returns overall statistics including total revenue, tickets sold, total events, event bookings and dining bookings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dashboard stats fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/eventmanagement/stats:
 *   get:
 *     summary: Get Organizer Event Management Statistics
 *     tags: [Organizer]
 *     description: Returns event-specific statistics including total revenue, tickets sold, current month revenue and active events count.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Event management stats fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/diningmanagement/stats:
 *   get:
 *     summary: Get Organizer Dining Management Statistics
 *     tags: [Organizer]
 *     description: Returns restaurant booking statistics including total bookings, confirmed, cancelled, today bookings and this month bookings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dining dashboard stats fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/eventbooking/stats:
 *   get:
 *     summary: Get Organizer Event Booking Statistics
 *     tags: [Organizer]
 *     description: Returns event booking statistics including total, confirmed, cancelled and pending bookings.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Booking stats fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/organizer/diningbooking/stats:
 *   get:
 *     summary: Get Organizer Dining Booking Statistics
 *     tags: [Organizer]
 *     description: Returns restaurant booking statistics including total, confirmed, cancelled and pending bookings for the organizer.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dining booking stats fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */