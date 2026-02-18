/**
 * @swagger
 * tags:
 *   name: Search
 *   description: Search and trending APIs (Event & Dining)
 */

/**
 * @swagger
 * /api/search:
 *   get:
 *     summary: Search Events and Restaurants
 *     tags: [Search]
 *     description: Search events, restaurants, or both (mixed results). If no query is provided, trending results are returned.
 *     parameters:
 *       - in: query
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *           enum: [event, dining, all]
 *         example: all
 *         description: Type of search (event, dining, or all)
 *
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: Delhi
 *         description: City name for filtering
 *
 *       - in: query
 *         name: query
 *         required: false
 *         schema:
 *           type: string
 *         example: music
 *         description: Search keyword (if empty, trending results are returned)
 *
 *     responses:
 *       200:
 *         description: Results found successfully
 *       400:
 *         description: Type and city are required or invalid type
 *       500:
 *         description: Internal server error
 */
