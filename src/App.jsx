import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Diagnosis from './pages/Diagnosis';
import Results from './pages/Results';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './index.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950">
        <Routes>
          {/* Routes with Layout (Navbar + Footer) */}
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/diagnosis" element={<Diagnosis />} />
            <Route path="/results" element={<Results />} />
          </Route>

          {/* Auth routes without Layout (full-screen pages) */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;