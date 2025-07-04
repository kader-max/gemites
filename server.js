const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(express.static(__dirname)); // Serve static files from the current directory

app.post('/save-data', (req, res) => {
    const { name, age, number } = req.body;
    const newData = { name, age, number, timestamp: new Date().toISOString() };
    const filePath = path.join(__dirname, 'data.txt');

    fs.readFile(filePath, 'utf8', (err, data) => {
        let existingData = [];
        if (!err && data) {
            try {
                existingData = JSON.parse(data);
            } catch (parseErr) {
                console.error('Error parsing existing data. Starting with empty array.', parseErr);
            }
        }

        existingData.push(newData);

        fs.writeFile(filePath, JSON.stringify(existingData, null, 2), (writeErr) => {
            if (writeErr) {
                console.error('Error writing to file:', writeErr);
                return res.status(500).send('Error saving data.');
            }
            res.status(200).send('Data saved successfully!');
        });
    });
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});