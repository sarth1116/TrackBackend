const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(cors()); // Enable CORS for all routes

// Route to get the vehicle location data
app.get("/api/vehicle", (req, res) => {
  // Construct the correct file path
  const filePath = path.join(__dirname, "data.json");

  // Read vehicle location data from data.json
  fs.readFile(filePath, "utf8", (err, data) => {
    if (err) {
      console.error('Error reading data:', err);
      return res.status(500).send({ message: 'Error reading data', error: err });
    }
    try {
      const jsonData = JSON.parse(data);
      res.status(200).json(jsonData); // Send JSON-parsed data as the response
    } catch (parseError) {
      console.error('Error parsing JSON:', parseError);
      return res.status(500).send({ message: 'Error parsing JSON', error: parseError });
    }
  });
});

const PORT = process.env.PORT || 4000; // Define the server's port
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`); // Log server status
});
