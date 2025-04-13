import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get('http://localhost:5000/api/forms')
      .then((res) => {
        setForms(res.data); // this will now have title, description
      })
      .catch((err) => {
        console.error('Error fetching forms:', err);
      })
      .finally(() => setLoading(false));
  }, []);
  

  const handleCreateForm = () => {
    navigate('/create-form');
  };

  const handleFormClick = (id) => {
    navigate(`/form/${id}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Forms</h1>

      {/* 🔄 Loading state */}
      {loading ? (
        <p className="text-gray-500">Loading forms...</p>
      ) : forms.length === 0 ? (
        <p className="text-gray-500">No forms created yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {forms.map((form) => (
            <div
              key={form._id}
              onClick={() => handleFormClick(form._id)}
              className="bg-white shadow-md rounded-lg p-4 cursor-pointer hover:shadow-xl transition"
            >
              <h2 className="text-xl font-semibold">{form.title}</h2>
              <p className="text-gray-600 text-sm mt-1">{form.description}</p>
              <p className="text-gray-400 text-xs mt-1">{form.questions.length} Questions</p>
            </div>
          ))}
        </div>
      )}

      {/* ➕ Create New Form Button */}
      <button
        onClick={handleCreateForm}
        className="fixed bottom-6 right-6 bg-blue-600 text-white px-6 py-3 rounded-full shadow-lg hover:bg-blue-700 transition"
      >
        + Create New Form
      </button>
    </div>
  );
};

export default Home;
