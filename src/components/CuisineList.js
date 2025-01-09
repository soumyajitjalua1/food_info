// CuisineList.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../Api';

function CuisineList() {
  const [cuisines, setCuisines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCuisines = async () => {
      try {
        const data = await api.getAllCuisines();
        setCuisines(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCuisines();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="cuisine-list">
      <header className="header">
        <h1>Cuisine Collection</h1>
        <button className="add-btn" onClick={() => navigate('/add')}>
          Add Cuisine
        </button>
      </header>
      <div className="cuisine-grid">
        {cuisines.map((cuisine) => (
          <div
          key={cuisine._id}
          className="cuisine-card"
          onClick={() => navigate(`/cuisine/${cuisine._id}`)}
        >
            <div className="cuisine-image">
              {cuisine.image ? (
                <img src={cuisine.image} alt={cuisine.name} />
              ) : (
                <div className="placeholder-image">No Image</div>
              )}
            </div>
            <div className="cuisine-info">
              <h2>{cuisine.name}</h2>
              <p>{cuisine.description?.substring(0, 150)}...</p>
              <div className="cuisine-tags">
                {cuisine.foodTag?.slice(0, 3).map((tag, i) => (
                  <span key={i} className="tag">{tag}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CuisineList;