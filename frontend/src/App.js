import './App.css';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Form from './componenets/Form';
import Createform from './componenets/Createform';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className='bg-purple-50 pt-10 flex flex-col items-center gap-4'>
      <Form />
      <button
        onClick={() => navigate('/create')}
        className="mt-4 bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        + Create Form
      </button>
    </div>
  );
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<Createform />} />
      </Routes>
    </Router>
  );
}

export default App;
