require("dotenv").config()
const express  = require("express");
const cors = require("cors")
const path = require("path")
const app = express()
const {admin} = require("./server/config/seed")
admin()
app.use(cors());
app.use(express.json()); // Add this line to parse JSON request bodies
app.use(express.urlencoded({ extended: true })); // For parsing form data (optional)
const port = process.env.PORT || 3001
const routes = require("./server/routes/route")
const db = require("./server/config/db")
app.use("/uploads", express.static(path.join(__dirname, "server","public","uploads")));

db()
app.use("/api",routes)
app.listen(port,()=>{
    console.log(`server is running on port ${port}`)
})