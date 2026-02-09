import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Diagnosis from './pages/Diagnosis';
import Results from './pages/Results';
import Login from './auth/Login';
import Signup from './auth/Signup';

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-gradient-to-br from-blue-950 via-slate-900 to-emerald-950">
          <Routes>
            {/* Public routes with Layout (Navbar + Footer) */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
            </Route>

            {/* Protected routes with Layout */}
            <Route element={<Layout />}>
              <Route
                path="/diagnosis"
                element={
                  <ProtectedRoute>
                    <Diagnosis />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/results"
                element={
                  <ProtectedRoute>
                    <Results />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Auth pages without Layout (full-screen) */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Routes>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;