/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Authentication related APIs (User & Admin login)
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           example: 65a123abc456def789000111
 *         name:
 *           type: string
 *           example: Sachin Rana
 *         email:
 *           type: string
 *           example: sachin@gmail.com
 *         phonenumber:
 *           type: string
 *           example: "+919876543210"
 *         role:
 *           type: string
 *           example: user
 *         provider:
 *           type: string
 *           example: google
 */

/**
 * @swagger
 * /api/auth/verify-firebase-token:
 *   post:
 *     summary: Login or Register using Firebase Phone Authentication
 *     tags: [Auth]
 *     description: User logs in using Firebase phone token. If user does not exist, a new account is created automatically.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *             properties:
 *               token:
 *                 type: string
 *                 description: Firebase ID token
 *                 example: eyJhbGciOiJSUzI1NiIsImtpZCI6Ij...
 *     responses:
 *       201:
 *         description: Login successful
 *       400:
 *         description: Token is required
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/google-login:
 *   post:
 *     summary: Login or Register using Google Authentication
 *     tags: [Auth]
 *     description: Login using Google OAuth. If user does not exist, a new user will be created.
 *     responses:
 *       200:
 *         description: Login successful
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/admin-login:
 *   post:
 *     summary: Admin Login
 *     tags: [Auth]
 *     description: Admin can login using email and password.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@gmail.com
 *               password:
 *                 type: string
 *                 example: admin123
 *     responses:
 *       200:
 *         description: Admin login successful
 *       401:
 *         description: Invalid credentials
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/auth/logout:
 *   post:
 *     summary: Logout User or Admin
 *     tags: [Auth]
 *     description: Clears authentication cookie and logs out user.
 *     responses:
 *       200:
 *         description: Logout successful
 *       500:
 *         description: Internal server error
 */
