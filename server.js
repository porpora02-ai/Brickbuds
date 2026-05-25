const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const authRoutes = require("./auth");

const app = express();

app.use(express.json());
app.use(cors());

// MongoDB
mongoose.connect("YOUR_MONGODB_LINK")
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

// API routes
app.use("/api/auth", authRoutes);

// serve frontend
app.use(express.static(__dirname));

app.get("/", (req,res)=>{
    res.sendFile(path.join(__dirname, "index.html"));
});

app.get("/games", (req,res)=>{
    res.sendFile(path.join(__dirname, "games.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=>{
    console.log("Server running on port " + PORT);
});
