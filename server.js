const express = require("express");
const fs = require("fs"); // For reading data from the filesystem
const app = express();
const cors = require("cors"); // To allow cross-origin requests

app.use(cors()); // Enable CORS for all routes

// Route to get the vehicle location data
app.get("/api/vehicle", (req, res) => {
  // Read vehicle location data from dummy.json in the Data folder
  fs.readFile(__dirname + "./public/data/data.json", "utf8", (err, data) => {
    if (err) throw err; // Handle any read errors
    res.send(JSON.parse(data)); // Send JSON-parsed data as the response
  });
});

const PORT = process.env.PORT || 3000; // Define the server's port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server status
});