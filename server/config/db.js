const mongoose = require("mongoose");

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
        console.log("Database connected!");
    } catch (error) {
        console.log("Error connecting to database", error.message);
    }
}

module.exports = connectDb;