const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(express.json());

// FIXED CONNECTION LINE:
mongoose.connect('mongodb+srv://admin:admin2026@cluster0.p7vhjao.mongodb.net/?appName=Cluster0')
    .then(() => console.log('Connected to MongoDB!'))
    .catch((err) => console.error('Failed to connect to MongoDB', err));

// Schema
const goalSchema = new mongoose.Schema({
    text: String
});
const Goal = mongoose.model('Goal', goalSchema);

// Routes
app.get('/goals', async (req, res) => {
    const goals = await Goal.find();
    res.json(goals);
});

app.post('/goals', async (req, res) => {
    const newGoal = new Goal({ text: req.body.text });
    await newGoal.save();
    res.json(newGoal);
});

app.delete('/goals/:id', async (req, res) => {
    await Goal.findByIdAndDelete(req.params.id);
    res.json({ message: "Goal deleted" });
});

app.listen(5000, () => {
    console.log('Server is running on port 5000');
});