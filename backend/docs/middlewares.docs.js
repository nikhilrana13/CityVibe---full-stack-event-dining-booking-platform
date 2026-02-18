/**
 * @swagger
 * tags:
 *   name: Authentication
 *   description: JWT Authentication and Role Based Access Control
 */

/**
 * @swagger
 * /Authmiddleware:
 *   get:
 *     summary: Example Protected Route
 *     tags: [Authentication]
 *     description: |
 *       This route requires a valid JWT token.
 *       The token must be sent in the Authorization header as:
 *       Bearer <JWT_TOKEN>
 *
 *       Middleware extracts:
 *       - userId from token (req.user)
 *       - role from token (req.role)
 *
 *       If token is missing or invalid, request will be rejected.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized request
 *       401:
 *         description: Unauthorized (Missing or Invalid token)
 *       403:
 *         description: Forbidden (Role not allowed)
 */
/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Admin only protected routes
 */

/**
 * @swagger
 * /IsAdmin:
 *   get:
 *     summary: Example Admin Only Route
 *     tags: [Admin]
 *     description: |
 *       This route is accessible only to users with role = "admin".
 *
 *       Requirements:
 *       - Valid JWT token
 *       - Token must contain role: "admin"
 *
 *       If user role is not admin, request will be rejected.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Authorized Admin Access
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Access denied - Admin only
 */
/**
 * @swagger
 * tags:
 *   name: FirebaseAuth
 *   description: Firebase Google / Phone Token Authentication
 */

/**
 * @swagger
 * /IsGoogleAuth:
 *   get:
 *     summary: Example Firebase Protected Route
 *     tags: [FirebaseAuth]
 *     description: |
 *       This route requires a valid Firebase ID Token.
 *
 *       The token must be sent in the Authorization header:
 *       Bearer <Firebase_ID_Token>
 *
 *       Firebase token is verified using admin.auth().verifyIdToken().
 *
 *       If token is missing or invalid, request will be rejected.
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Firebase token verified successfully
 *       401:
 *         description: Unauthorized or invalid token
 *       500:
 *         description: Internal server error
 */
/**
 * @swagger
 * tags:
 *   name: OrganizerAuth
 *   description: Approved Organizer Role Protection
 */

/**
 * @swagger
 * /Isorganizer:
 *   get:
 *     summary: Example Organizer Protected Route
 *     tags: [OrganizerAuth]
 *     description: |
 *       This route is accessible only to approved organizers.
 *
 *       Requirements:
 *       - Valid JWT token
 *       - User must have an organizer account
 *       - Organizer verificationStatus must be "approved"
 *
 *       If organizer is not approved or does not exist,
 *       access will be denied.
 *
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Organizer access granted
 *       401:
 *         description: Unauthorized (Invalid or missing token)
 *       403:
 *         description: Only approved organizers can access
 */
/**
 * @swagger
 * tags:
 *   name: Security
 *   description: API Security and Rate Limiting
 */

/**
 * @swagger
 * components:
 *   responses:
 *     RateLimitError:
 *       description: Too many requests
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: error
 *               message:
 *                 type: string
 *                 example: Too many requests, please try again later.
 */


