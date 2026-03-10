const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// MongoDB connection
mongoose.connect("mongodb://127.0.0.1:27017/lostfound")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

// test route
app.get("/", (req, res) => {
    res.send("Lost & Found API running");
});

// start server
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


const itemRoutes = require("./routes/itemRoutes");

app.use("/api", itemRoutes);