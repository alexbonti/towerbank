import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Building from './components/Building';
import Header from './components/Header';
import Auth from './components/Auth';
import FloorDetail from './components/Floor/FloorDetail';
import ProfileForm from './components/Profile/ProfileForm';
import { useAuth } from './hooks/useAuth';

function App() {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-b from-sky-100 to-sky-200 p-6">
        <Header />
        <main className="container mx-auto mt-8">
          <Routes>
            <Route path="/" element={<Building />} />
            <Route 
              path="/auth" 
              element={user ? <Navigate to="/" replace /> : <Auth />} 
            />
            <Route path="/floor/:id" element={<FloorDetail />} />
            <Route 
              path="/profile" 
              element={user ? <ProfileForm /> : <Navigate to="/auth" replace />} 
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;