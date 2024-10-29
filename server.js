const express = require('express');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors()); // Enable CORS for all routes

// Endpoint to serve vehicle route data
app.get('/api/route', (req, res) => {
    const filePath = path.join(__dirname, 'public', 'data', 'data.json');

    // Check if the data file exists
    if (!fs.existsSync(filePath)) {
        console.error('Data file not found:', filePath);
        return res.status(404).send({ message: 'Data file not found' });
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading data:', err);
            return res.status(500).send({ message: 'Error reading data', error: err });
        }
        
        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData); // Send the data as JSON response
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).send({ message: 'Error parsing JSON', error: parseError });
        }
    });
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
