import React, { useState } from 'react';

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
  const [questions, setQuestions] = useState([
    { questionText: '', questionType: 'Short Para' }
  ]);

  const addQuestion = () => {
    setQuestions([...questions, { questionText: '', questionType: 'Short Para' }]);
  };

  const handleChange = (index, key, value) => {
    const newQuestions = [...questions];
    newQuestions[index][key] = value;
    setQuestions(newQuestions);
  };

  return (
    <div className="p-4 max-w-3xl mx-auto">
      <input
        type="text"
        placeholder="Untitled Form"
        className="w-full text-2xl font-semibold mb-2 border-b-2 p-2 outline-none"
      />
      <textarea
        placeholder="Form description..."
        className="w-full mb-4 border-b-2 p-2 outline-none"
      />

      {questions.map((q, index) => (
        <div key={index} className="mb-6 border p-4 rounded shadow">
          <div className="flex justify-between items-center">
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
        </div>
      ))}

      <button
        onClick={addQuestion}
        className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        + Add Question
      </button>
    </div>
  );
};

export default Createform;
