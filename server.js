const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./auth");

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(
    "YOUR_MONGODB_LINK"
)
.then(() => {
    console.log("MongoDB Connected");
})
.catch((err) => {
    console.log(err);
});

app.use("/api/auth", authRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});