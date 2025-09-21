import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer'; // Import the new Footer
import HomePage from './pages/HomePage';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import RegisterWorker from './pages/RegisterWorker';
import AccessPage from './pages/AccessPage';
import HealthCard from './pages/HealthCard';
import GovtDashboard from './pages/GovtDashboard';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<DoctorLogin />} />
          <Route path="/dashboard" element={<DoctorDashboard />} />
          <Route path="/register-worker" element={<RegisterWorker />} />
          <Route path="/access/:workerId" element={<AccessPage />} />
          <Route path="/health-card/:workerId" element={<HealthCard />} />
          <Route path="/gov-dashboard" element={<GovtDashboard />} />
          {/* Define other routes for footer links as needed */}
        </Routes>
      </main>
      <Footer /> {/* Add the Footer component here */}
    </div>
  );
}

export default App;
