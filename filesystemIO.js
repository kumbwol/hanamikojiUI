// server.js
const express = require('express');
const fs = require('fs/promises');
const cors = require('cors');
const fsSync = require('fs');

const app = express();
const PORT = 5000; // Choose a port different from the frontend

app.use(cors());
app.use(express.json());

app.post('/write', async (req, res) => {
    const { filename, content } = req.body;

    if (!filename || !content) {
        return res.status(400).send('Missing filename or content');
    }

    try {
        await fs.writeFile(`./engine/hanamikoji/${filename}`, content, 'utf8');
        res.send('File written successfully!');
    } catch (err) {
        console.error('Error writing file:', err);
        res.status(500).send('Failed to write file');
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running at http://localhost:${PORT}`);
});

let lastModified = Date.now();

// Update it when the file changes
const watchDir = './engine/hanamikoji/agent_out.json';
fsSync.watch(watchDir, (eventType, filename) => {
    if (filename && eventType === 'change') {
        console.log(`File changed: ${filename}`);
        lastModified = Date.now();
    }
});

app.get('/file-content', async (req, res) => {
    const fileToRead = './engine/hanamikoji/agent_out.json';

    try {
        const content = await fs.readFile(fileToRead, 'utf8');
        res.json({ content });
    } catch (err) {
        console.error('Error reading file:', err);
        res.status(500).send('Failed to read file');
    }
});
