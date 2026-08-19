const { GoogleGenAI } = require("@google/genai");
const { UserAllBookedEvents } = require("../controllers/eventbookingcontroller.js");
const { UserallDiningbookings } = require("../controllers/restaurantbookingcontroller.js");
const User = require("../models/usermodel.js");
const { BookingAgentPrompt } = require("../prompts/bookingAgentPrompt.js");
const { GetUserEventBookingsForAgent, GetUserDiningBookingsForAgent } = require("../services/bookingAgentService.js");
const Response = require("../utils/responsehandler.js")

const genAI = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});


const BookingAgent = async (req, res) => {
  try {
    const userId = req.user;
    const { type, question } = req.body;
    // console.log("req",req.body)
    // field validation
    if (!type || !question?.trim()) {
      return Response(res, 400, "Type and Question is required");
    }
    const allowedTypes = ["event", "dining"];
    if (!allowedTypes.includes(type)) {
      return Response(res,400,`${type} is not valid`);
    }
    // check user exists or not
    const user = await User.findById(userId);
    if (!user) {
      return Response(res, 404, "User not found");
    }
    // get booking data based on type
    let bookingData
    if(type === "event"){
        bookingData = await GetUserEventBookingsForAgent(userId)
    }else if (type === "dining"){
        bookingData = await GetUserDiningBookingsForAgent(userId)
    }else{
         return Response(res, 400, "Invalid booking type");
    }
    const Prompt = BookingAgentPrompt({type,question,bookingData})
    // config gemini 
    const interaction = await genAI.interactions.create({
        model:"gemini-3.6-flash",
        input:Prompt,
        generation_config:{
            temperature:0.7,
            max_output_tokens:1024,
        },
        response_format: [
        {
          type: "text",
          mime_type: "application/json",
        },
      ],
    })
    // get gemini output");
    let output = interaction.output_text?.trim()
    if (!output) {
      throw new Error("Gemini returned an empty response");
    }
    return Response(res,200,{role:"agent",message:output})
  } catch (error) {
    console.error("Failed to Connect With Booking Agent",error)
    return Response(res,500,"Internal server error")
  }
};

module.exports = {BookingAgent}
