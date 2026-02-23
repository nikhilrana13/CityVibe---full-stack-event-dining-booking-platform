const cron = require("node-cron")
const moment = require("moment-timezone")
const Event = require("../models/eventmodel.js")


// Automatically deactivate past events
// Runs every night at 12:05 AM IST

const EventStatusUpdater = ()=>{
    cron.schedule(" * * * * *",async()=>{
        console.log("running event status updater")
        try {
            // get current date
            const today = moment().tz("Asia/Kolkata").startOf("day").toDate()
            const result = await Event.updateMany({
                eventIsActive:true,
                $or:[
                    // multi day event 
                    {endDate:{$ne:null,$lt:today}},
                    // single day event 
                    {endDate:null,startDate:{$lt:today}}
                ]
            },{$set: { eventIsActive: false }})
            console.log( `Event status updated successfully. Modified: ${result.modifiedCount}`)
        } catch (error) {
            console.log("failed to update event status",error)
        }
    })
}


module.exports = EventStatusUpdater