const mongoose = require('mongoose')

const connect = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/redux_users")
        console.log("Connected to Db");
    } catch (error) {
        console.log('An error occured while connecting to Db',error.message)
        process.exit(1)
    }
}



module.exports = connect