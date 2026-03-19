require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/authRoutes");
const itemRoutes = require("./routes/itemRoutes");

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());

/* SERVE UPLOADED IMAGES */
app.use("/uploads", express.static("uploads"));

/* ROUTES */
app.use("/api/auth", authRoutes);
app.use("/api", itemRoutes);

/* DATABASE */
mongoose.connect("mongodb://127.0.0.1:27017/lostfound")
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log("MongoDB connection error:", err);
});

/* TEST ROUTE */
app.get("/", (req, res) => {
    res.send("Lost & Found API running");
});

/* SERVER */
const PORT = 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});