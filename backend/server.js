const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

// Middleware
app.use(cors());
app.use(express.json({ limit: '50mb' }));

// MongoDB Connection
mongoose.connect('mongodb+srv://zeeshanunique2619:RWt5xLFezN8Ggkhm@cluster0.a1ovg.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0/Food', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully');
}).catch((error) => {
  console.error('MongoDB connection error:', error);
  process.exit(1);
});

// Add mongoose debug logging
mongoose.set('debug', true);

const cuisineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String },
  mealTiming: { type: String, required: true },
  servingSize: { type: Number, required: true },
  numberOfServings: { type: Number, required: true },
  cuisineType: { type: String, required: true },
  foodHabit: [{ type: String }],
  preparationTime: { type: Number, required: true },
  nutritionValue: { type: String },
  foodTag: [{ type: String }],
  ingredients: { type: String, required: true },
  instructions: { type: String, required: true },
}, { 
  collection: 'Information_of_food',
  timestamps: true,
});

const Cuisine = mongoose.model('Cuisine', cuisineSchema);

// Routes
app.post('/api/cuisines', async (req, res) => {
  try {
    console.log('Received cuisine data:', req.body);
    const cuisine = new Cuisine(req.body);
    const savedCuisine = await cuisine.save();
    console.log('Saved cuisine:', savedCuisine);
    res.status(201).json(savedCuisine);
  } catch (error) {
    console.error('Error saving cuisine:', error);
    res.status(400).json({ error: error.message });
  }
});

app.get('/api/cuisines', async (req, res) => {
  try {
    const cuisines = await Cuisine.find();
    console.log(`Found ${cuisines.length} cuisines`);
    res.json(cuisines);
  } catch (error) {
    console.error('Error fetching cuisines:', error);
    res.status(500).json({ error: error.message });
  }
});

app.get('/api/cuisines/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Fetching cuisine with ID: ${id}`);
    
    const cuisine = await Cuisine.findById(id);
    if (!cuisine) {
      return res.status(404).json({ message: 'Cuisine not found' });
    }

    console.log('Found cuisine:', cuisine);
    res.json(cuisine);
  } catch (error) {
    console.error(`Error fetching cuisine with ID ${req.params.id}:`, error);
    res.status(500).json({ error: error.message });
  }
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
