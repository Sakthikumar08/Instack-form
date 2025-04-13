import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const questionTypes = [
  'Short Para',
  'Long Para',
  'Multiple Choice',
  'Checkbox',
  'Dropdown',
  'Rating',
  'Date',
  'Time',
];

const Createform = () => {
  const [formTitle, setFormTitle] = useState('');
  const [formDesc, setFormDesc] = useState('');
  const [questions, setQuestions] = useState([
    { questionText: '', questionType: 'Short Para', options: [''] },
  ]);

  const navigate = useNavigate();

  const addQuestion = () => {
    setQuestions([
      ...questions,
      { questionText: '', questionType: 'Short Para', options: [''] },
    ]);
  };

  const handleChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;

    if (key === 'questionType' && ['Multiple Choice', 'Checkbox', 'Dropdown'].includes(value)) {
      newQuestions[index].options = [''];
    } else if (key === 'questionType') {
      delete newQuestions[index].options;
    }

    setQuestions(newQuestions);
  };

  const handleOptionChange = (qIndex, optIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options[optIndex] = value;
    setQuestions(newQuestions);
  };

  const addOption = (qIndex) => {
    const newQuestions = [...questions];
    newQuestions[qIndex].options.push('');
    setQuestions(newQuestions);
  };

  // Handle form submission and send to backend
  const handleFinishForm = async () => {
    const formData = {
      title: formTitle,
      description: formDesc,
      questions,
    };

    try {
      const response = await fetch('http://localhost:5000/api/forms', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log('Form saved successfully');
        navigate('/'); // Go back to dashboard
      } else {
        console.error('Error saving form');
      }
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Untitled Form"
        value={formTitle}
        onChange={(e) => setFormTitle(e.target.value)}
        className="w-full text-2xl font-semibold mb-2 border-b-2 p-2 outline-none"
      />
      <textarea
        placeholder="Form description..."
        value={formDesc}
        onChange={(e) => setFormDesc(e.target.value)}
        className="w-full mb-4 border-b-2 p-2 outline-none"
      />

      {questions.map((q, index) => (
        <div key={index} className="mb-6 border p-4 rounded shadow">
          <div className="flex justify-between items-center mb-2">
            <input
              type="text"
              placeholder={`Question ${index + 1}`}
              value={q.questionText}
              onChange={(e) => handleChange(index, 'questionText', e.target.value)}
              className="flex-1 p-2 border-b outline-none text-lg"
            />
            <select
              value={q.questionType}
              onChange={(e) => handleChange(index, 'questionType', e.target.value)}
              className="ml-4 p-2 border rounded"
            >
              {questionTypes.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>

          {/* Dynamic Input UI for Question Types */}
          {['Multiple Choice', 'Checkbox', 'Dropdown'].includes(q.questionType) && (
            <div className="pl-2">
              {q.options.map((opt, optIndex) => (
                <input
                  key={optIndex}
                  type="text"
                  placeholder={`Option ${optIndex + 1}`}
                  value={opt}
                  onChange={(e) => handleOptionChange(index, optIndex, e.target.value)}
                  className="block w-full mb-2 p-2 border rounded"
                />
              ))}
              <button
                onClick={() => addOption(index)}
                className="text-sm text-blue-600 hover:underline"
              >
                + Add Option
              </button>
            </div>
          )}

          {q.questionType === 'Rating' && (
            <p className="text-gray-500">This will show a star-based rating input.</p>
          )}

          {q.questionType === 'Date' && (
            <input type="date" className="p-2 mt-2 border rounded" disabled />
          )}

          {q.questionType === 'Time' && (
            <input type="time" className="p-2 mt-2 border rounded" disabled />
          )}
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="mt-4 bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-800"
      >
        + Add Question
      </button>

      <button
        onClick={handleFinishForm}
        className="mt-4 ml-4 bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Finish Form
      </button>
    </div>
  );
};

export default Createform;
