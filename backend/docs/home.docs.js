/**
 * @swagger
 * /api/home:
 *   get:
 *     summary: Get Homepage Events Data
 *     tags: [Events]
 *     description: Returns curated event data for homepage including trending, music, comedy, this week, and India's top events based on selected city.
 *     parameters:
 *       - in: query
 *         name: city
 *         required: true
 *         schema:
 *           type: string
 *         example: Delhi
 *         description: City name to filter homepage events
 *     responses:
 *       200:
 *         description: Homepage data fetched successfully
 *       400:
 *         description: City is required
 *       500:
 *         description: Internal server error
 */







