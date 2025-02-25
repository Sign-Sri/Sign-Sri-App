const express = require('express');
const { spawn } = require('child_process');

const app = express();

// Middleware
app.use(express.json());

// Creating outputs directory, if it is not created
const outputsDir = path.join(__dirname, 'outputs');
if (!fs.existsSync(outputsDir)) {
    fs.mkdirSync(outputsDir);
}

// Endpoint for text-to-ASL conversion
app.post('/convert', async (req, res) => {
    try{
        const { text, speed = 'Normal' } = req.body;
        if (!text) {
            return res.status(400).json({ error: 'Text is required' }); 
        }

        // Generate a unique filename for the gif
        const timestamp = Date.now();
        const outputFileName = `ASL_output_${timestamp}.gif`;
        const outputPath = path.join(outputsDir, outputFileName);

        // First, Running the text preprocessing script
        const preprocessedText = await runPythonScript('preprocess.py',[text]);

        // Assigning the frame duration to go with the speed
        let frameDuration = 1500; // Normal Speed
        if (speed == 'Slow') frameDuration = 2000;
        if (speed == 'Fast') frameDuration = 1000;

        // Second, Running the GIF generation script
        await runPythonScript('text_to_asl.py', [
            preprocessedText,
            path.join(__dirname, 'ASLimages'), // add loction
            outputPath,
            frameDuration.toString()
        ]);

    }catch (error){
        console.error('Conversion error:', error);
        res.status(500).json({ error: 'Conversion failed', details: error.message });
    }
});

// Function to run python scripts
function runPythonScript(scriptName, args){
    return new Promise((resolve, reject) => {
        
        let outputData = '';
        let errorData = '';

        pythonProcess.stdout.on('data', (data) => {
            outputData = outputData + data.toString();
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