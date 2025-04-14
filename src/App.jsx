// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './pages/Home';
import ServiceSelection from './pages/ServiceSelection';
import AppointmentCalendar from './pages/AppointmentCalendar';
import PatientInfoForm from './pages/PatientInfoForm';
import ConfirmationPage from './pages/ConfirmationPage';
import ManageAppointments from './pages/ManageAppointments';
import AppointmentsPage from './pages/admin/Appointments';
import AdminDashboard from './pages/admin/Dashboard';
import Login from './pages/admin/Login';

function AppContent() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith('/admin');

  const [appointmentData, setAppointmentData] = useState({
    service: null,
    date: null,
    time: null,
    patientInfo: {
      name: '',
      email: '',
      phone: '',
      notes: ''
    }
  });

  const updateAppointmentData = (newData) => {
    setAppointmentData({
      ...appointmentData,
      ...newData
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      {!isAdminRoute && <Header />}

      <main className={`flex-grow ${!isAdminRoute ? 'container mx-auto px-4 py-8' : ''}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/services" element={<ServiceSelection updateAppointment={updateAppointmentData} />} />
          <Route path="/calendar" element={<AppointmentCalendar appointmentData={appointmentData} updateAppointment={updateAppointmentData} />} />
          <Route path="/patient-info" element={<PatientInfoForm appointmentData={appointmentData} updateAppointment={updateAppointmentData} />} />
          <Route path="/confirmation" element={<ConfirmationPage appointmentData={appointmentData} />} />
          <Route path="/manage/:appointmentId" element={<ManageAppointments />} />

          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/appointments" element={<AppointmentsPage />} />
        </Routes>
      </main>

      {!isAdminRoute && <Footer />}
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
