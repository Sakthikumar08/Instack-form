import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const UserForm = () => {
  const { id } = useParams();
  const [formData, setFormData] = useState(null);
  const [responses, setResponses] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:5000/api/forms/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setFormData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error('Error loading form:', err);
        setLoading(false);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;

    if (type === 'checkbox') {
      setResponses((prev) => {
        const currentArr = prev[name] || [];
        return {
          ...prev,
          [name]: checked
            ? [...currentArr, value]
            : currentArr.filter((item) => item !== value),
        };
      });
    } else if (type === 'radio') {
      setResponses((prev) => ({ ...prev, [name]: value }));
    } else {
      setResponses((prev) => ({ ...prev, [name]: value }));
    }
  };

  
  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:5000/api/submit', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        formId: id,  // Send formId from URL
        responses: responses, // Send collected responses
      }),
    });

    if (res.ok) {
      alert('Form submitted successfully!');
      setResponses({});  // Clear the responses
    } else {
      alert('Failed to submit form.');
    }
  };

  if (loading) return <p className="text-center mt-6">Loading form...</p>;
  if (!formData) return <p className="text-center mt-6 text-red-500">Form not found</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-purple-700 mb-2 text-center">{formData.title}</h2>
      <p className="mb-6 text-center text-gray-600">{formData.description}</p>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData?.questions && formData.questions.length > 0 ? (
          formData.questions.map((question, index) => {
            const { questionText, questionType, options } = question;
            const questionName = `question-${index}`;

            return (
              <div key={index}>
                <label className="block font-medium mb-1">{questionText}</label>

                {questionType === 'Rating' ? (
                  <>
                    <input
                      type="range"
                      name={questionName}
                      min="1"
                      max="5"
                      value={responses[questionName] || 3}
                      onChange={handleChange}
                      className="w-full"
                    />
                    <p className="text-sm text-gray-600">Rating: {responses[questionName] || 3}</p>
                  </>
                ) : questionType === 'Checkbox' && options ? (
                  <div className="flex flex-wrap gap-4">
                    {options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center w-1/3">
                        <input
                          type="radio"
                          name={questionName}
                          value={opt}
                          checked={responses[questionName] === opt}
                          onChange={handleChange}
                          className="mr-1"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                )
                 : questionType === 'Long Para' ? (
                  <textarea
                    name={questionName}
                    value={responses[questionName] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Please share your suggestions"
                  />
                ) : questionType === 'Short Para' ? (
                  <input
                    type="text"
                    name={questionName}
                    value={responses[questionName] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                    placeholder="Provide a short answer"
                  />
                ) : questionType === 'Time' ? (
                  <input
                    type="time"
                    name={questionName}
                    value={responses[questionName] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                ) : questionType === 'Date' ? (
                  <input
                    type="date"
                    name={questionName}
                    value={responses[questionName] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  />
                ) : questionType === 'Dropdown' && options ? (
                  <select
                    name={questionName}
                    value={responses[questionName] || ''}
                    onChange={handleChange}
                    className="w-full border border-gray-300 p-2 rounded-md"
                  >
                    <option value="">Select an option</option>
                    {options.map((opt, i) => (
                      <option key={i} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                ) : questionType === 'Multiple Choice' && options ? (
                  <div className="flex flex-wrap gap-4">
                    {options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center w-1/3">
                        <input
                          type="checkbox"
                          name={questionName}
                          value={opt}
                          checked={responses[questionName]?.includes(opt) || false}
                          onChange={handleChange}
                          className="mr-1"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : questionType === 'Mean' && options ? (
                  <div className="flex flex-col gap-2">
                    {options.map((opt, i) => (
                      <label key={i} className="inline-flex items-center">
                        <input
                          type="radio"
                          name={questionName}
                          value={opt}
                          checked={responses[questionName] === opt}
                          onChange={handleChange}
                          className="mr-2"
                        />
                        {opt}
                      </label>
                    ))}
                  </div>
                ) : null}
              </div>
            );
          })
        ) : (
          <p>No questions to display</p>
        )}

        <button type="submit" className="w-full bg-purple-600 text-white p-2 rounded-md">
          Submit
        </button>
      </form>
    </div>
  );
};

export default UserForm;
