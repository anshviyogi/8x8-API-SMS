const axios = require("axios")
const express = require("express")
const app = express();

app.use(express.json())

require("dotenv").config();

require("./model/db")
const MessageSchema = require("./model/messageSchema");

async function sendSMS(phoneNumber, message) {
  const url = 'https://sms.8x8.com/api/v1/subaccounts/FREELANCERS_3sS38_hq/messages';

  try {
    const response = await axios.post(url, {
      destination: phoneNumber,
      text: message
    }, {
      headers: {
        Authorization: `Bearer ${process.env.KEY}`,
        'Content-Type': 'application/json'
      }
    });

    return response.data;
  } catch (error) {
    console.log(error.message)
    console.error('Error sending SMS:', error.response.data);
    throw error;
  }
}

app.post("/message", (req,res)=>{
    console.log(req.body)
    const {phoneNumber, textMessage} = req.body;

    if(!phoneNumber) return res.json({message:"Phone Number is mandatory"})
    if(!textMessage) return res.json({message:"Text Message is mandatory"})

    const saveMessage = new MessageSchema({
        phoneNumber, textMessage
    })

    saveMessage.save()

    sendSMS(`${phoneNumber}`, `${textMessage}`)
  .then(response => {
    console.log('SMS sent successfully:', response);
    res.json({message:"SMS sent successfully"})
  })
  .catch(error => {
    console.error('Error:', error);
  });
})

  const PORT = 5000;
  app.listen(PORT, ()=> console.log(`Server started at ${PORT}`))
