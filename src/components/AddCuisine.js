// AddCuisine.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Api';
import './AddCuisine.css';

function AddCuisine() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null,
    mealTiming: '',
    servingSize: '',
    numberOfServings: '',
    cuisineType: '',
    foodHabit: [],
    preparationTime: '',
    nutritionValue: '',
    foodTag: [],
    ingredients: '',
    instructions: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const mealTimings = [
    'Wake Up', 'Supplements', 'Breakfast', 'Snacking',
    'Lunch', 'Tea', 'Dinner', 'Sleep'
  ];

  const cuisineTypes = [
    'Asian', 'Assamese', 'Bengali', 'Chinese', 'Continental',
    'Gujarati', 'Indian', 'Italian', 'Kannad', 'Lebanese',
    'Maharashtrian', 'Malayalam', 'Marwadi', 'Parsi',
    'Punjabi', 'Tamil', 'Telegu', 'Thai', 'Western'
  ];

  const foodHabits = [
    'Vegetable', 'Diary', 'Chicken', 'Nuts and seeds', 'Egg', 'Fish'
  ];

  const foodTags = [
    'Beverages', 'Breakfast', 'Buttermilk', 'Bowls', 'Coconut water',
    'Coffee', 'Curd', 'Dessert', 'Dips', 'Drink', 'Keto',
    'Kid friendly', 'Main course', 'Muesli', 'Naturopathy',
    'Oats', 'Probiotic', 'Rice', 'Roti', 'Salad', 'Sandwich',
    'Sides', 'Smoothie', 'Snacks', 'Soup', 'Speciality',
    'Starter', 'Tea', 'Vegetable', 'Whey protein', 'Wrap & rolls',
    'Navaraitri special/Fasting', 'Uncooked Foods', 'High protein-Low carb'
  ];

  const handleChange = (e) => {
    const { name, value, type, options, files } = e.target;
    
    if (type === 'file') {
      const file = files[0];
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({ ...prev, image: reader.result }));
      };
      if (file) {
        reader.readAsDataURL(file);
      }
    } else if (type === 'select-multiple') {
      const values = Array.from(options)
        .filter(option => option.selected)
        .map(option => option.value);
      setFormData(prev => ({ ...prev, [name]: values }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const dataToSend = {
        ...formData,
        servingSize: Number(formData.servingSize),
        numberOfServings: Number(formData.numberOfServings),
        preparationTime: Number(formData.preparationTime)
      };
      
      await api.createCuisine(dataToSend);
      navigate('/');
    } catch (err) {
      setError(err.message);
      alert('Failed to save cuisine: ' + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <h2 className="form-title">Add New Recipe</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            {/* Basic Information */}
            <div className="form-section">
              <h3 className="section-title">Basic Information</h3>
              <div className="form-group">
                <label>Name of Recipe:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Image:</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="file-input"
                />
              </div>
            </div>

            {/* Serving Details */}
            <div className="form-section">
              <h3 className="section-title">Serving Details</h3>
              <div className="form-group">
                <label>Meal Timing:</label>
                <select
                  name="mealTiming"
                  value={formData.mealTiming}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Timing</option>
                  {mealTimings.map(timing => (
                    <option key={timing} value={timing}>{timing}</option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label>Serving Size (max 1000):</label>
                <input
                  type="number"
                  name="servingSize"
                  max="1000"
                  value={formData.servingSize}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label>Number of Servings (max 10):</label>
                <input
                  type="number"
                  name="numberOfServings"
                  max="10"
                  value={formData.numberOfServings}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
          </div>

          {/* Full Width Sections */}
          <div className="form-section full-width">
            <h3 className="section-title">Additional Details</h3>
            <div className="form-group">
              <label>Cuisine Type:</label>
              <select
                name="cuisineType"
                value={formData.cuisineType}
                onChange={handleChange}
                required
              >
                <option value="">Select Type</option>
                {cuisineTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Food Habit:</label>
              <select
                name="foodHabit"
                multiple
                value={formData.foodHabit}
                onChange={handleChange}
                className="multi-select"
                required
              >
                {foodHabits.map(habit => (
                  <option key={habit} value={habit}>{habit}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Food Tag:</label>
              <select
                name="foodTag"
                multiple
                value={formData.foodTag}
                onChange={handleChange}
                className="multi-select"
                required
              >
                {foodTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label>Preparation Time (minutes):</label>
              <input
                type="number"
                name="preparationTime"
                value={formData.preparationTime}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Nutrition Value:</label>
              <textarea
                name="nutritionValue"
                value={formData.nutritionValue}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Ingredients:</label>
              <textarea
                name="ingredients"
                value={formData.ingredients}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Instructions:</label>
              <textarea
                name="instructions"
                value={formData.instructions}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="form-actions">
            <button type="submit" className="submit-button" disabled={loading}>
              {loading ? 'Adding Cuisine...' : 'Add Cuisine'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default AddCuisine;