const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const port = 3001; // Change the port to 3001

// Enable Cross-Origin Resource Sharing (CORS) to allow requests from the frontend
app.use(cors());
app.use(express.json());

// Endpoint to handle PGN analysis
app.post('/api/analyze', async (req, res) => {
  try {
    const { pgn } = req.body;

    // Replace 'YOUR_LICHESS_API_TOKEN' with your actual Lichess API token
    const apiToken = 'lip_8RvzndAUuhn8AejQ3osV';

    const response = await axios.post(
      'https://lichess.org/api/import',
      { pgn },
      { headers: { Authorization: `Bearer ${apiToken}` } }
    );

    // Extract game ID from the Lichess API response
    const gameId = response.data.id;

    // Get game analysis using the game ID
    const gameInfoResponse = await axios.get(
      `https://lichess.org/api/game/${gameId}`
    );

    const analysis = gameInfoResponse.data.analysis;
    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing PGN:', error.message);
    res.status(500).json({ error: 'Error analyzing PGN' });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
