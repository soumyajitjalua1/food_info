import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { api } from '../Api';
import './CuisineDetail.css';

function CuisineDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [cuisine, setCuisine] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeSection, setActiveSection] = useState('description');

  useEffect(() => {
    const fetchCuisine = async () => {
      try {
        const data = await api.getCuisineById(id);
        setCuisine(data);
        setLoading(false);
      } catch (err) {
        setError('Cuisine not found');
        setLoading(false);
      }
    };

    fetchCuisine();
  }, [id]);

  const scrollToSection = (sectionId) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  if (loading) {
    return <div className="loading-spinner">Loading...</div>;
  }

  if (error || !cuisine) {
    return (
      <div className="error-container">
        <h2>Error</h2>
        <p>{error || 'The requested cuisine could not be found.'}</p>
        <button onClick={() => navigate('/')} className="back-button">
          Back to Home
        </button>
      </div>
    );
  }

  const sections = [
    { id: 'description', label: 'Description' },
    { id: 'details', label: 'Quick Details' },
    { id: 'nutrition', label: 'Nutrition' },
    { id: 'ingredients', label: 'Ingredients' },
    { id: 'instructions', label: 'Instructions' }
  ];

  return (
    <div className="cuisine-detail">
      {/* Sidebar Navigation */}
      <nav className="sidebar">
        <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button>
        
        <div className="nav-links">
          {sections.map((section) => (
            <button
              key={section.id}
              className={`nav-link ${activeSection === section.id ? 'active' : ''}`}
              onClick={() => scrollToSection(section.id)}
            >
              {section.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        <div className="content-grid">
          {/* Left Column - Content */}
          <div className="content-section">
            <div className="cuisine-header">
              <h1>{cuisine.name}</h1>
              {cuisine.cuisineType && (
                <span className="cuisine-type">{cuisine.cuisineType}</span>
              )}
            </div>

            <section id="description" className="detail-card">
              <h2>Description</h2>
              <p>{cuisine.description}</p>
            </section>

            <section id="details" className="detail-card">
              <h2>Quick Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <span className="detail-label">Preparation Time</span>
                  <span className="detail-value">{cuisine.preparationTime} minutes</span>
                </div>
                <div className="detail-item">
                  <span className="detail-label">Servings</span>
                  <span className="detail-value">{cuisine.numberOfServings}</span>
                </div>
              </div>
            </section>

            {cuisine.nutritionValue && (
              <section id="nutrition" className="detail-card">
                <h2>Nutrition Information</h2>
                <p>{cuisine.nutritionValue}</p>
              </section>
            )}

            {cuisine.ingredients && (
              <section id="ingredients" className="detail-card">
                <h2>Ingredients</h2>
                <p>{cuisine.ingredients}</p>
              </section>
            )}

            {cuisine.instructions && (
              <section id="instructions" className="detail-card">
                <h2>Instructions</h2>
                <p>{cuisine.instructions}</p>
              </section>
            )}
          </div>

          {/* Right Column - Image */}
          <div className="image-section">
            {cuisine.image && (
              <div className="cuisine-image-container">
                <img src={cuisine.image} alt={cuisine.name} />
              </div>
            )}

            {cuisine.foodTag && cuisine.foodTag.length > 0 && (
              <div className="tags-container">
                {cuisine.foodTag.map((tag, index) => (
                  <span key={index} className="tag">{tag}</span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CuisineDetail;