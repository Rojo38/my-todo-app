const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const Task = require('./models/tasks');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
connectDB();

// CRUD API Endpoints
app.get('/tasks', async (req, res) => {
    const tasks = await Task.find();
    res.json(tasks);
});
  
app.post('/tasks', async (req, res) => {
    const task = new Task(req.body);
    await task.save();
    res.json(task);
});
  
// Exemple de modèle de tâche
const taskSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String }
});
  
const Task = mongoose.model('Task', taskSchema);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur lancé sur le port ${PORT}`));
