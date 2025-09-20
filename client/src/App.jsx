import { Routes, Route } from 'react-router-dom';
import DoctorLogin from './pages/DoctorLogin';
import DoctorDashboard from './pages/DoctorDashboard';
import RegisterWorker from './pages/RegisterWorker';
import WorkerProfile from './pages/WorkerProfile';
import GovtDashboard from './pages/GovtDashboard';
import HealthCard from './pages/HealthCard';
import Navbar from './components/Navbar';
import AccessPage from './pages/AccessPage'; // Import the new page

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<DoctorLogin />} />
        <Route path="/dashboard" element={<DoctorDashboard />} />
        <Route path="/register-worker" element={<RegisterWorker />} />
        <Route path="/worker/:workerId" element={<WorkerProfile />} />
        <Route path="/health-card/:workerId" element={<HealthCard />} />
        <Route path="/gov-dashboard" element={<GovtDashboard />} />

        {/* --- ADD THIS NEW ROUTE --- */}
        <Route path="/access/:workerId" element={<AccessPage />} />
      </Routes>
    </>
  );
}

export default App;
