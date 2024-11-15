const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://shashankrajnagar1999:b0bFpWDHF9sIKMb5@user-video-streams.xsuzk.mongodb.net/?retryWrites=true&w=majority&appName=user-video-streams', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB:', error);
});

// Define the player schema
const playerSchema = new mongoose.Schema({
  name: String,
  time: Number,
  stars: Number,
});

// Define the Player model
const Player = mongoose.model('Player', playerSchema);

// Initialize Express app
const app = express();
// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());

// Create a POST route to register game data
app.post('/register', async (req, res) => {
  const { name, time, stars } = req.body;
  try {
    // Save player data to the database
    const player = new Player({ name, time, stars });
    await player.save();

    // Fetch all players and order by stars and time in descending order
    const players = await Player.find().sort({ stars: -1, time: -1 });

    res.json(players);
  } catch (error) {
    console.error('Error saving player data:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Start the server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on :${PORT}`);
});
