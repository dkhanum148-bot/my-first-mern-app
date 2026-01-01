const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Import Mongoose

const app = express();
app.use(cors());
app.use(express.json()); // Allow server to read JSON data sent from frontend

// 1. Connect to MongoDB (It will create a database named 'goal-tracker')
mongoose.connect('mongodb://localhost:27017/goal-tracker')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// 2. Define the "Schema" (What a Goal looks like)
const goalSchema = new mongoose.Schema({
    text: String
});

const Goal = mongoose.model('Goal', goalSchema);

// 3. Route to GET all goals from the database
app.get('/goals', async (req, res) => {
    const goals = await Goal.find(); // Ask database for all goals
    res.json(goals);
});

// 4. Route to CREATE a new goal
app.post('/goals', async (req, res) => {
    const newGoal = new Goal({ text: req.body.text });
    await newGoal.save(); // Save to database
    res.json(newGoal);
});

// 5. Route to DELETE a goal
app.delete('/goals/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id); // Find the specific ID and delete it
    res.json({ message: "Goal deleted" });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});