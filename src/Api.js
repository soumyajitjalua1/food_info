// Api.js
const API_BASE_URL = 'http://localhost:5000/api';

export const api = {
  async getAllCuisines() {
    try {
      const response = await fetch(`${API_BASE_URL}/cuisines`);
      const data = await response.json();
      console.log('Fetched cuisines:', data);
      return data;
    } catch (error) {
      console.error('Error fetching all cuisines:', error);
      throw new Error(error.message || 'Failed to fetch cuisines');
    }
  },

  async getCuisineById(id) {
    try {
      if (!id) throw new Error('Cuisine ID is required');
      
      const response = await fetch(`${API_BASE_URL}/cuisines/${id}`);
      if (response.status === 404) {
        throw new Error('Cuisine not found');
      }
      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to fetch cuisine');
      }
      return response.json();
    } catch (error) {
      console.error(`Error fetching cuisine with ID ${id}:`, error);
      throw new Error(error.message || 'Failed to fetch cuisine');
    }
  },

  async createCuisine(cuisineData) {
    try {
      if (!cuisineData) throw new Error('Cuisine data is required');

      // Handle the image file if present
      let formData;
      if (cuisineData.image instanceof File) {
        formData = new FormData();
        Object.keys(cuisineData).forEach(key => {
          if (key === 'image') {
            formData.append('image', cuisineData.image);
          } else if (Array.isArray(cuisineData[key])) {
            // Handle arrays (like foodHabit and foodTag)
            cuisineData[key].forEach(value => {
              formData.append(`${key}[]`, value);
            });
          } else {
            formData.append(key, cuisineData[key]);
          }
        });
      }

      const response = await fetch(`${API_BASE_URL}/cuisines`, {
        method: 'POST',
        headers: formData ? undefined : {
          'Content-Type': 'application/json',
        },
        body: formData || JSON.stringify(cuisineData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to create cuisine');
      }
      return response.json();
    } catch (error) {
      console.error('Error creating cuisine:', error);
      throw new Error(error.message || 'Failed to create cuisine');
    }
  },

  async updateCuisine(id, cuisineData) {
    try {
      if (!id) throw new Error('Cuisine ID is required');
      if (!cuisineData) throw new Error('Cuisine data is required');

      const response = await fetch(`${API_BASE_URL}/cuisines/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(cuisineData),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to update cuisine');
      }
      return response.json();
    } catch (error) {
      console.error(`Error updating cuisine with ID ${id}:`, error);
      throw new Error(error.message || 'Failed to update cuisine');
    }
  },

  async deleteCuisine(id) {
    try {
      if (!id) throw new Error('Cuisine ID is required');

      const response = await fetch(`${API_BASE_URL}/cuisines/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => null);
        throw new Error(errorData?.message || 'Failed to delete cuisine');
      }
      return true;
    } catch (error) {
      console.error(`Error deleting cuisine with ID ${id}:`, error);
      throw new Error(error.message || 'Failed to delete cuisine');
    }
  }
};