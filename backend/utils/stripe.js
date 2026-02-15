const {Stripe} = require("stripe")

const StripeInstance = new Stripe(process.env.STRIPE_SECRET_KEY) 
module.exports = StripeInstance 
