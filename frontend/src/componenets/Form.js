import {React,useRef} from 'react';

const Form = () => {

  const formRef = useRef(null);

  const handleClear = () => {
    if (formRef.current) {
      formRef.current.reset();
      document.getElementById('rangeValue').textContent = 5; 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData(formRef.current);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      feedback: formData.get('feedback'),
      gender: formData.get('gender'),
      skills: formData.getAll('skills'),
      country: formData.get('country'),
      dob: formData.get('dob'),
      meetingTime: formData.get('meetingTime'),
      rating: parseInt(formData.get('rating')),
    };

    try {
      const res = await fetch('http://localhost:5000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (res.ok) {
        alert('Form submitted successfully!');
        handleClear(); // Optional: Reset form on success
      } else {
        alert('Submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Error:', err);
      alert('Server error.');
    }
  };
  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-md rounded-xl ">
        <h1 className="text-center text-xl  text-purple-800 font-medium" >Google-form</h1>
      <form ref={formRef} onSubmit={handleSubmit} className="space-y-6">

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        {/* Email */}
            <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email:</label>
            <input
                type="email"
                name="email"
                placeholder="Enter your email"
                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
            />
            </div>


        {/* Feedback */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Feedback:</label>
          <textarea
            name="feedback"
            rows="4"
            placeholder="Enter your feedback here"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          ></textarea>
        </div>

        {/* Gender */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Gender:</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="Male" className="mr-1" /> Male
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="Female" className="mr-1" /> Female
            </label>
            <label className="inline-flex items-center">
              <input type="radio" name="gender" value="Other" className="mr-1" /> Other
            </label>
          </div>
        </div>

        {/* Skills */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Skills:</label>
          <div className="space-x-4">
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="HTML" className="mr-1" /> HTML
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="CSS" className="mr-1" /> CSS
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="JS" className="mr-1" /> JavaScript
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="JS" className="mr-1" /> React
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="JS" className="mr-1" /> Node Js
            </label>
            <label className="inline-flex items-center">
              <input type="checkbox" name="skills" value="JS" className="mr-1" /> Express 
            </label>
          </div>
        </div>

        {/* Country Dropdown */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Country:</label>
          <select
            name="country"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">Select Country</option>
            <option value="India">India</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Australia">Australia</option>
            <option value="Canada">Canada</option>
            <option value="Germany">Germany</option>
          </select>
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Date of Birth:</label>
          <input
            type="date"
            name="dob"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Time */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Meeting Time:</label>
          <input
            type="time"
            name="meetingTime"
            className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
  <label className="block text-sm font-medium text-gray-700 mb-2">
    Rate your experience: <span className="font-semibold" id="rangeValue">5</span>
  </label>
  <input
    type="range"
    name="rating"
    min="1"
    max="10"
    defaultValue="5"
    className="w-full accent-purple-600"
    onInput={(e) => {
      document.getElementById('rangeValue').textContent = e.target.value;
    }}
  />
</div>


<div className="flex justify-between">
  <button
    type="submit"
    className="bg-purple-800 text-white px-6 py-1 text-sm rounded-md hover:bg-purple-700 transition"
  >
    Submit
  </button>

  <button
    type="reset"
    className=" text-purple-800 px-4 py-2 rounded-md hover:bg-gray-300 transition"
    onClick={handleClear}
  >
    Clear Form
  </button>
</div>

      </form>
    </div>
  );
};

export default Form;
