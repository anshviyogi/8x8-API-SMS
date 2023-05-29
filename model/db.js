const mongoose = require("mongoose")

mongoose.connect(process.env.MONGO_URI)
.then(res => {
    console.log("Database Connected Successfully!!")
})
.catch(error => {
    console.log("Some error occured: "+error.message)
})

module.exports = mongoose;