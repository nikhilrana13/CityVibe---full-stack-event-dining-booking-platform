/**
 * @swagger
 * tags:
 *   name: Organizer
 *   description: Admin Organizer Management APIs
 */ 
/**
 * 
 * @swagger
 * /api/admin/organizers:
 *   get:
 *     summary: Get all organizers (Admin only)
 *     tags: [Organizer]
 *     description: Returns paginated list of organizers. Admin can filter by verification status.
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
 *         example: 5
 *         description: Number of records per page (default 5)
 *       - in: query
 *         name: status
 *         schema:
 *           type: string
 *           enum: [pending, approved, rejected]
 *         example: pending
 *         description: Filter organizers by verification status
 *     responses:
 *       200:
 *         description: Organizers fetched successfully
 *       400:
 *         description: Invalid status value
 *       403:
 *         description: Access denied (Admin only)
 *       404:
 *         description: Admin not found
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/admin/organizer/verify:
 *   patch:
 *     summary: Approve or Reject Organizer (Admin only)
 *     tags: [Organizer]
 *     description: Admin can approve or reject an organizer request.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organizerId
 *               - status
 *             properties:
 *               organizerId:
 *                 type: string
 *                 example: 65b123abc456def789000222
 *               status:
 *                 type: string
 *                 enum: [approved, rejected]
 *                 example: approved
 *     responses:
 *       200:
 *         description: Organizer approved or rejected successfully
 *       400:
 *         description: Invalid input or organizer already processed
 *       403:
 *         description: Access denied (Admin only)
 *       404:
 *         description: Organizer or Admin not found
 *       500:
 *         description: Internal server error
 */