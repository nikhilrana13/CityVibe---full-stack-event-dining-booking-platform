/**
 * @swagger
 * tags:
 *   name: Dining
 *   description: Restaurant management APIs (Organizer)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Restaurant:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65c123abc456def789000333
 *         name:
 *           type: string
 *           example: The Royal Dine
 *         description:
 *           type: string
 *           example: Premium fine dining restaurant
 *         city:
 *           type: string
 *           example: Delhi
 *         location:
 *           type: string
 *           example: Connaught Place
 *         address:
 *           type: string
 *           example: Block A, CP, Delhi
 *         contactnumbers:
 *           type: array
 *           items:
 *             type: string
 *           example: ["9876543210"]
 *         cuisine:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Indian", "Chinese"]
 *         availablefacility:
 *           type: array
 *           items:
 *             type: string
 *           example: ["Parking", "WiFi"]
 *         averagePrice:
 *           type: number
 *           example: 1200
 *         openingTime:
 *           type: string
 *           example: "10:00 AM"
 *         closingTime:
 *           type: string
 *           example: "11:00 PM"
 *         images:
 *           type: array
 *           items:
 *             type: string
 *           example: ["https://cloudinary.com/sample.webp"]
 */

/**
 * @swagger
 * /api/dining/restaurant/create:
 *   post:
 *     summary: Create a Restaurant (Approved Organizer only)
 *     tags: [Dining]
 *     description: Organizer can create a restaurant listing with minimum 5 images. Only approved organizers are allowed.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - city
 *               - location
 *               - address
 *               - openingTime
 *               - closingTime
 *             properties:
 *               name:
 *                 type: string
 *                 example: The Royal Dine
 *               description:
 *                 type: string
 *                 example: Premium fine dining restaurant
 *               city:
 *                 type: string
 *                 example: Delhi
 *               location:
 *                 type: string
 *                 example: Connaught Place
 *               address:
 *                 type: string
 *                 example: Block A, CP, Delhi
 *               contactnumbers:
 *                 type: string
 *                 example: ["9876543210"]
 *                 description: Send as JSON string array
 *               cuisine:
 *                 type: string
 *                 example: ["Indian","Chinese"]
 *                 description: Send as JSON string array
 *               availablefacility:
 *                 type: string
 *                 example: ["Parking","WiFi"]
 *                 description: Send as JSON string array
 *               averagePrice:
 *                 type: number
 *                 example: 1200
 *               openingTime:
 *                 type: string
 *                 example: 10:00 AM
 *               closingTime:
 *                 type: string
 *                 example: 11:00 PM
 *               lunchStart:
 *                 type: string
 *                 example: 12:00 PM
 *               lunchEnd:
 *                 type: string
 *                 example: 03:00 PM
 *               dinnerStart:
 *                 type: string
 *                 example: 07:00 PM
 *               dinnerEnd:
 *                 type: string
 *                 example: 11:00 PM
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload minimum 5 images
 *     responses:
 *       200:
 *         description: Restaurant listed successfully
 *       400:
 *         description: Validation error or missing required fields
 *       403:
 *         description: Only approved organizers can create restaurant
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/dining/restaurant/details/{id}:
 *   get:
 *     summary: Get Restaurant Details
 *     tags: [Dining]
 *     description: Fetch full details of a restaurant by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65c123abc456def789000333
 *     responses:
 *       200:
 *         description: Restaurant details found
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/dining/organizer/restaurant:
 *   get:
 *     summary: Get Logged-in Organizer Restaurant
 *     tags: [Dining]
 *     description: Returns the restaurant created by the logged-in approved organizer.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Restaurant found
 *       403:
 *         description: Only approved organizers can access
 *       400:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/dining/restaurant/delete/{id}:
 *   delete:
 *     summary: Delete Restaurant (Organizer only)
 *     tags: [Dining]
 *     description: Organizer can delete their own restaurant.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65c123abc456def789000333
 *     responses:
 *       200:
 *         description: Restaurant Deleted Successfully
 *       403:
 *         description: Unauthorized or Not approved organizer
 *       404:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/dining/restaurant/update/{id}:
 *   patch:
 *     summary: Update Restaurant Details (Organizer only)
 *     tags: [Dining]
 *     description: Organizer can update their own restaurant details. All fields are optional. Images can also be updated.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65c123abc456def789000333
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Royal Dine Updated
 *               description:
 *                 type: string
 *                 example: Newly renovated fine dining restaurant
 *               location:
 *                 type: string
 *                 example: CP Block B
 *               address:
 *                 type: string
 *                 example: New Address Delhi
 *               contactnumbers:
 *                 type: string
 *                 example: ["9876543210","9999999999"]
 *                 description: Send as JSON string array
 *               cuisine:
 *                 type: string
 *                 example: ["Indian","Italian"]
 *                 description: Send as JSON string array
 *               availablefacility:
 *                 type: string
 *                 example: ["WiFi","Parking"]
 *                 description: Send as JSON string array
 *               averagePrice:
 *                 type: number
 *                 example: 1500
 *               openingTime:
 *                 type: string
 *                 example: 10:00 AM
 *               closingTime:
 *                 type: string
 *                 example: 12:00 AM
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload new images (optional)
 *     responses:
 *       200:
 *         description: Restaurant details updated successfully
 *       403:
 *         description: Only approved organizers can update
 *       400:
 *         description: Restaurant not found or invalid data
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/dining/restaurant/toggle/{id}:
 *   patch:
 *     summary: Enable or Disable Restaurant (Organizer only)
 *     tags: [Dining]
 *     description: Organizer can enable or disable their restaurant listing.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65c123abc456def789000333
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - isActive
 *             properties:
 *               isActive:
 *                 type: boolean
 *                 example: true
 *     responses:
 *       200:
 *         description: Restaurant enabled or disabled successfully
 *       403:
 *         description: Not authorized or restaurant not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/dining/organizer/restaurant/bookings:
 *   get:
 *     summary: Get All Dining Bookings (Organizer only)
 *     tags: [Dining]
 *     description: Returns paginated list of restaurant bookings for the logged-in approved organizer. Can filter by booking status.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default is 1)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: confirmed
 *         description: Filter bookings by booking status (optional)
 *     responses:
 *       200:
 *         description: Bookings fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       400:
 *         description: Restaurant not found
 *       500:
 *         description: Internal server error
 */

