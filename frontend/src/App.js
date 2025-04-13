import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './componenets/Home';
import CreateForm from './componenets/Createform';
import FormViewer from './componenets/UserForm'; // For viewing each form

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-form" element={<CreateForm />} />
        <Route path="/form/:id" element={<FormViewer />} />
      </Routes>
    </Router>
  );
}

export default App;
