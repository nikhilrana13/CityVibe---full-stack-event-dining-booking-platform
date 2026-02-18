/**
 * @swagger
 * tags:
 *   name: User
 *   description: User profile management APIs
 */

/**
 * @swagger
 * /api/user/profile:
 *   patch:
 *     summary: Update User Profile
 *     tags: [User]
 *     description: Allows logged-in user to update name, phone number, date of birth, gender and profile picture.
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *
 *               phonenumber:
 *                 type: string
 *                 example: 9876543210
 *
 *               dob:
 *                 type: string
 *                 format: date
 *                 example: 2000-05-15
 *
 *               gender:
 *                 type: string
 *                 enum: [male, female, other]
 *                 example: male
 *
 *               profilepic:
 *                 type: string
 *                 format: binary
 *                 description: Upload profile image
 *
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       400:
 *         description: Validation error (invalid phone, gender or dob)
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 */