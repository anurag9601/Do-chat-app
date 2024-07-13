const express = require('express');
const dotenv = require('dotenv');
const { authRoutes } = require('./routes');
const connectDb = require('./config/db');

dotenv.config();

const app = express();

const port = process.env.PORT || 4000;

app.use(express.json());

app.use("/api/auth", authRoutes)

app.get("/", (req, res) => {
    res.send("Hello world!")
})

app.listen(port, () => {
    connectDb();
    console.log(`Server running on ${port}`);
})