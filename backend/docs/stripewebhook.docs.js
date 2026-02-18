/**
 * @swagger
 * tags:
 *   name: Payments
 *   description: Stripe payment and webhook APIs
 */

/**
 * @swagger
 * /api/stripe/webhook:
 *   post:
 *     summary: Stripe Webhook Handler
 *     tags: [Payments]
 *     description: Handles Stripe events like successful payments, expired sessions and failed payments. This endpoint is called directly by Stripe.
 *     requestBody:
 *       required: true
 *       description: Raw Stripe event payload
 *     responses:
 *       200:
 *         description: Webhook processed successfully
 *       400:
 *         description: Webhook signature verification failed
 */