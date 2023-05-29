const mongoose = require("mongoose")

const messageSchema = new mongoose.Schema({
    phoneNumber:{
        type:String,
        required:true
    },
    textMessage:{
        type:String,
        required:true
    }
})

const MessageSchema = new mongoose.model('Message', messageSchema)
module.exports = MessageSchema;