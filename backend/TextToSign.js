const express = require('express');
const { spawn } = require('child_process');
const path = require('path');
const cors = require('cors');
const fs = require('fs');

const app = express();
const port = 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use('/outputs', express.static('outputs'));

// Root route
app.get('/', (req, res) => {
    res.send('Running');
});

// Creating outputs directory, if it is not created
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir);
}

// Endpoint for text-to-ASL conversion
app.post('/convert', async (req, res) => {
    try {
        const { text, speed = 'Normal' } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' });
        }

        // Generate a unique filename for the gif
        const timestamp = Date.now();
        const outputFileName = `ASL_output_${timestamp}.gif`;
        const outputPath = path.join(outputsDir, outputFileName);

        // First, Running the text preprocessing script
        const preprocessedText = await runPythonScript('preprocess.py', [text]);

        // Assigning the frame duration to go with the speed
        let frameDuration = 1500; // Normal Speed
        if (speed === 'Slow') frameDuration = 2000;
        if (speed === 'Fast') frameDuration = 1000;

        // Second, Running the GIF generation script
        await runPythonScript('text_to_asl.py', [
            preprocessedText,
            path.join(__dirname, 'ASLimages'),
            outputPath,
            frameDuration.toString()
        ]);

        // Return
        res.json({
            success: true,
            name: `/outputs/${outputFileName}`,
            processedText: preprocessedText,
        });

    } catch (error) {
        console.error('Conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Function to run python scripts
function runPythonScript(scriptName, args) {
    return new Promise((resolve, reject) => {
        // Option 1: Use system's Python directly
        const pythonExecutable = 'python'; // or 'python3' depending on your system
       
        // Option 2: If you still want to use virtual environment
        // but with more robust path handling
        /*
        const pythonExecutable = process.platform === 'win32'
            ? path.join(__dirname, 'venv', 'Scripts', 'python.exe')
            : path.join(__dirname, 'venv', 'bin', 'python');
       
        // Check if the virtual environment Python exists
        if (!fs.existsSync(pythonExecutable)) {
            console.warn(`Python executable not found at ${pythonExecutable}, falling back to system Python`);
            pythonExecutable = 'python'; // or 'python3'
        }
        */

        const pythonProcess = spawn(pythonExecutable, [
            path.join(__dirname, 'python', scriptName),
            ...args
        ]);

        let outputData = '';
        let errorData = '';

        pythonProcess.stdout.setEncoding('utf8');
        pythonProcess.stderr.setEncoding('utf8');

        pythonProcess.stdout.on('data', (data) => {
            outputData += data.toString();
        });

        pythonProcess.stderr.on('data', (data) => {
            errorData += data.toString();
        });

        pythonProcess.on('close', (code) => {
            if (code !== 0) {
                reject(new Error(`Python script failed: ${errorData}`));
            } else {
                resolve(outputData.trim());
            }
        });
    });
}
// Start server
app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
