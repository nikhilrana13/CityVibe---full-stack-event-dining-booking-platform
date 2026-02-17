/**
 * @swagger
 * tags:
 *   name: Events
 *   description: Event management APIs (Organizer)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Event:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65d123abc456def789000444
 *         title:
 *           type: string
 *           example: Live Music Night
 *         description:
 *           type: string
 *           example: Enjoy an amazing live concert
 *         category:
 *           type: string
 *           example: music
 *         city:
 *           type: string
 *           example: Delhi
 *         venue:
 *           type: string
 *           example: Talkatora Stadium
 *         totalSeats:
 *           type: number
 *           example: 500
 *         availableSeats:
 *           type: number
 *           example: 500
 *         coverimage:
 *           type: string
 *           example: https://cloudinary.com/event-image.webp
 */

/**
 * @swagger
 * /api/event/create-event:
 *   post:
 *     summary: Create Event (Approved Organizer only)
 *     tags: [Events]
 *     description: Organizer can create an event with cover image, tickets and optional artist details (for selected categories).
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - category
 *               - startDate
 *               - starttime
 *               - city
 *               - location
 *               - venue
 *               - totalSeats
 *               - coverimage
 *               - tickets
 *             properties:
 *               title:
 *                 type: string
 *                 example: Live Music Night
 *               description:
 *                 type: string
 *                 example: Enjoy a live concert experience
 *               category:
 *                 type: string
 *                 example: music
 *               startDate:
 *                 type: string
 *                 example: 2026-03-10
 *               starttime:
 *                 type: string
 *                 example: 07:00 PM
 *               city:
 *                 type: string
 *                 example: Delhi
 *               location:
 *                 type: string
 *                 example: Connaught Place
 *               venue:
 *                 type: string
 *                 example: Talkatora Stadium
 *               totalSeats:
 *                 type: number
 *                 example: 500
 *               artists:
 *                 type: string
 *                 example: [{"name":"Arijit Singh"},{"name":"DJ Chetas"}]
 *                 description: Required for music, comedy and performances category (JSON string array)
 *               tickets:
 *                 type: string
 *                 example: >
 *                   [
 *                     {"name":"VIP","price":2000,"totalQuantity":100},
 *                     {"name":"Regular","price":1000,"totalQuantity":400}
 *                   ]
 *                 description: Send ticket types as JSON string array
 *               coverimage:
 *                 type: string
 *                 format: binary
 *                 description: Event cover image (required)
 *               artistimage:
 *                 type: array
 *                 items:
 *                   type: string
 *                   format: binary
 *                 description: Upload one image per artist (required for music/comedy/performances)
 *     responses:
 *       200:
 *         description: Event created successfully
 *       400:
 *         description: Validation error (missing fields, invalid tickets, seat mismatch, etc.)
 *       403:
 *         description: Only approved organizers can create events
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/event/details/{id}:
 *   get:
 *     summary: Get Event Details
 *     tags: [Events]
 *     description: Fetch complete details of an event by event ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d123abc456def789000444
 *     responses:
 *       200:
 *         description: Event details found
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * /api/event/all:
 *   get:
 *     summary: Get All Events of Logged-in Organizer
 *     tags: [Events]
 *     description: Returns paginated list of events created by the approved organizer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 6
 *         description: Number of events per page (default 6)
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/event/delete{id}:
 *   delete:
 *     summary: Delete Event (Organizer only)
 *     tags: [Events]
 *     description: Organizer can permanently delete their own event.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d123abc456def789000444
 *     responses:
 *       200:
 *         description: Event Deleted Successfully
 *       403:
 *         description: Unauthorized access
 *       404:
 *         description: Event not found
 *       500:
 *         description: Internal server error
 */


/**
 * @swagger
 * /api/event/cancel/{id}:
 *   patch:
 *     summary: Cancel Event (Soft Disable)
 *     tags: [Events]
 *     description: Organizer can cancel their event (eventIsActive will be set to false).
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: 65d123abc456def789000444
 *     responses:
 *       200:
 *         description: Event Cancelled successfully
 *       403:
 *         description: Event not found or not authorized
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/event/search:
 *   get:
 *     summary: Get All Events (Public with Filters)
 *     tags: [Events]
 *     description: Fetch paginated list of active upcoming events with filtering, sorting and search options.
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default 1)
 *
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         example: 6
 *         description: Number of events per page (default 6)
 *
 *       - in: query
 *         name: city
 *         schema:
 *           type: string
 *         example: Delhi
 *         description: Filter by city name
 *
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         example: music,comedy
 *         description: Filter by multiple categories (comma separated)
 *
 *       - in: query
 *         name: startDate
 *         schema:
 *           type: string
 *           enum: [Today, Tomorrow, ThisWeek, ThisMonth]
 *         example: Today
 *         description: Filter events by date range
 *
 *       - in: query
 *         name: sortby
 *         schema:
 *           type: string
 *           enum: [lowtohigh, hightolow, relevant]
 *         example: lowtohigh
 *         description: Sort events by price or relevance
 *
 *       - in: query
 *         name: title
 *         schema:
 *           type: string
 *         example: music
 *         description: Search events by title
 *
 *     responses:
 *       200:
 *         description: Events fetched successfully
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/event/bookings:
 *   get:
 *     summary: Get Organizer Event Bookings
 *     tags: [Events]
 *     description: Returns paginated list of bookings for all events created by the approved organizer.
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         example: 1
 *         description: Page number (default 1)
 *
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *         example: confirmed
 *         description: Filter bookings by booking status (optional)
 *
 *     responses:
 *       200:
 *         description: Event bookings fetched successfully
 *       403:
 *         description: Only approved organizers can access
 *       500:
 *         description: Internal server error
 */