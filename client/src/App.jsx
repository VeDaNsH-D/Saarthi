import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage'; // Import the new Homepage
import DoctorLogin from './pages/DoctorLogin'; // Keep the login page
import DoctorDashboard from './pages/DoctorDashboard';
import RegisterWorker from './pages/RegisterWorker';
import AccessPage from './pages/AccessPage';
import HealthCard from './pages/HealthCard';
import GovtDashboard from './pages/GovtDashboard';

function App() {
  return (
    <>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/dashboard" element={<DoctorDashboard />} />
          <Route path="/register-worker" element={<RegisterWorker />} />
          <Route path="/access/:workerId" element={<AccessPage />} />
          <Route path="/health-card/:workerId" element={<HealthCard />} />
          <Route path="/gov-dashboard" element={<GovtDashboard />} />
          {/* We will add other routes like /features and /about later */}
        </Routes>
      </main>
    </>
  );
}

export default App;
