
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard, {} from './components/mainPages/dashboard'
import { IntroPage } from './components/mainPages/introPage';
function App() {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/Dashboard" element={< Dashboard/>} />
    </Routes>
  </Router>

  );
}

export default App;
