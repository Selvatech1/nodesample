// Import required modules
const express = require('express');
const fs = require('fs');
const path = require('path');

// Create an Express application
const app = express();

// Define the path to the folder where text files will be created
const folderPath = path.join(__dirname, 'files');

// Middleware to parse incoming JSON requests
app.use(express.json());

// Route to display a welcome message
app.get('/', (req, res) => {
  res.send('Welcome to the File System API');
});

// Route to create a new text file with current timestamp as content
app.post('/createFile', (req, res) => {
  const currentDate = new Date();
  const fileName = `${currentDate.toISOString().replace(/:/g, '-')}.txt`;
  const filePath = path.join(folderPath, fileName);
  const fileContent = currentDate.toString();

  // Write content to the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error('Error creating file:', err);
      res.status(500).send('Error creating file');
      return;
    }
    console.log('File created successfully:', fileName);
    res.status(201).send('File created successfully');
  });
});

// Route to retrieve all text files in the sampleFolder
app.get('/getFiles', (req, res) => {
  // Read the list of files in the folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error('Error reading folder:', err);
      res.status(500).send('Error reading folder');
      return;
    }
    // Filter text files from the list
    const textFiles = files.filter(file => file.endsWith('.txt'));
    res.json(textFiles);
  });
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
