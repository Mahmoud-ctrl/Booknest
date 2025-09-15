import { useState, useEffect } from 'react';
import { Bell, Save, Calendar, Phone, Clock, Download, Settings, Menu, Mail, X, Home, AlertCircle, LogOut, ChevronRight, ChevronDown, ChevronUp, User, Check, X as XIcon, Edit, Trash2, Plus } from 'lucide-react';
import AvailabilityPage from './Availability';
import SettingsPage from './Settings';
import ExportPage from './Export';
import Appointments from './Appointments';

export default function AdminDashboard() {
  const [activePage, setActivePage] = useState('appointments');
  
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return true;
  });

  const mockAppointments = [
    { id: 1, patient: 'Sarah Johnson', date: '2025-04-15', time: '09:00 AM', service: 'Dental Cleaning', status: 'confirmed' },
    { id: 2, patient: 'Michael Chen', date: '2025-04-15', time: '10:30 AM', service: 'Teeth Whitening', status: 'confirmed' },
    { id: 3, patient: 'Emily Rodriguez', date: '2025-04-15', time: '01:00 PM', service: 'Dental Check-up', status: 'pending' },
    { id: 4, patient: 'David Williams', date: '2025-04-16', time: '11:00 AM', service: 'Dental Filling', status: 'confirmed' },
    { id: 5, patient: 'Jessica Brown', date: '2025-04-16', time: '02:30 PM', service: 'Braces', status: 'canceled' },
    { id: 6, patient: 'Robert Taylor', date: '2025-04-17', time: '09:30 AM', service: 'Root Canal', status: 'pending' },
  ];

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [timeFilter, setTimeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setSidebarOpen(true);
      } else {
        setSidebarOpen(false);
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    let results = mockAppointments;
   
    if (searchTerm) {
      results = results.filter(appointment =>
        appointment.patient.toLowerCase().includes(searchTerm.toLowerCase()) ||
        appointment.service.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
   
    if (timeFilter !== 'all') {
      results = results.filter(appointment => appointment.date === timeFilter);
    }
   
    if (statusFilter !== 'all') {
      results = results.filter(appointment => appointment.status === statusFilter);
    }
   
    setFilteredAppointments(results);
  }, [searchTerm, timeFilter, statusFilter]);

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    setIsAuthenticated(false);
    window.location.href = '/';
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handlePageChange = (page) => {
    setActivePage(page);
    
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderActivePage = () => {
    switch(activePage) {
      case 'appointments':
        return <Appointments
          appointments={filteredAppointments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />;
      case 'availability':
        return <AvailabilityPage />;
      case 'export':
        return <ExportPage />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <AppointmentsPage
          appointments={filteredAppointments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />;
    }
  };

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 z-30">
        <div className="px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <button
              onClick={toggleSidebar}
              className="p-2 rounded-md text-gray-500 hover:text-gray-600 hover:bg-gray-100 focus:outline-none"
            >
              {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
              <div className="ml-4 flex items-center">
              <svg
                className="h-8 w-8 text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446 9 9 0 1 1 -8.313-12.454z" />
                <path d="M17.7 9a3 3 0 0 0 -2.7 -2h-1a3 3 0 0 0 0 6h1a3 3 0 0 1 0 6h-1a3 3 0 0 1 -2.7 -2" />
                <path d="M12 3v3m0 15v-3" />
              </svg>
              <span className="text-xl font-bold text-gray-800">BookNest</span>
            </div>
          </div>
         
          <div className="flex items-center gap-3">
            {/* Search */}
            <div className="hidden md:block relative">
              <input
                type="text"
                placeholder="Search..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
           
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={() => {
                  setNotificationOpen(!notificationOpen);
                  setProfileOpen(false);
                }}
                className="p-2 rounded-full text-gray-600 hover:bg-gray-100 focus:outline-none relative"
              >
                <Bell size={20} />
                <span className="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500"></span>
              </button>
             
              {notificationOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <h3 className="text-sm font-semibold text-gray-700">Notifications</h3>
                  </div>
                  <div className="max-h-64 overflow-y-auto">
                    <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">New appointment request</p>
                      <p className="text-xs text-gray-500">Sarah Johnson - Today at 9:42 AM</p>
                    </div>
                    <div className="px-4 py-3 border-b border-gray-100 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">Appointment canceled</p>
                      <p className="text-xs text-gray-500">Michael Chen - Yesterday at 2:30 PM</p>
                    </div>
                    <div className="px-4 py-3 hover:bg-gray-50">
                      <p className="text-sm font-medium text-gray-900">New patient registered</p>
                      <p className="text-xs text-gray-500">Emily Rodriguez - Apr 12, 2025</p>
                    </div>
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <button className="text-sm text-blue-600 hover:text-blue-700">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
           
            {/* Profile */}
            <div className="relative">
              <button
                onClick={() => {
                  setProfileOpen(!profileOpen);
                  setNotificationOpen(false);
                }}
                className="flex items-center space-x-2 focus:outline-none"
              >
                <img
                  src="https://img.freepik.com/free-vector/flat-dental-care-concept-illustration_23-2148990313.jpg?t=st=1744658078~exp=1744661678~hmac=08d07d88b82ef95a5863af75b7e9e469e802045b982bb52db284290534d6e8a3&w=740"
                  alt="Dr. Smith"
                  className="h-8 w-8 rounded-full ring-2 ring-blue-600"
                />
                <span className="hidden md:block text-sm font-medium text-gray-700">Dr. Smith</span>
              </button>
             
              {profileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-2 z-50 border border-gray-200">
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Profile
                  </a>
                  <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                    Account settings
                  </a>
                  <div className="border-t border-gray-100 my-1"></div>
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                  >
                    Sign out
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>
     
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <aside
          className={`bg-white border-r border-gray-200 flex-shrink-0 w-64 fixed md:static h-full md:h-auto z-20 transition-all duration-300 transform ${
            sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0 md:w-16'
          }`}
        >
          <nav className="p-4 h-full flex flex-col">
            <div className="flex-1">
              <ul className="space-y-1">
                <li>
                  <button
                    onClick={() => handlePageChange('appointments')}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
                      activePage === 'appointments'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Calendar className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                    {sidebarOpen && <span>Appointments</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('availability')}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
                      activePage === 'availability'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Clock className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                    {sidebarOpen && <span>Availability</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('export')}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
                      activePage === 'export'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Download className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                    {sidebarOpen && <span>Export Data</span>}
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => handlePageChange('settings')}
                    className={`w-full flex items-center px-3 py-2.5 rounded-lg ${
                      activePage === 'settings'
                        ? 'bg-blue-50 text-blue-700'
                        : 'text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    <Settings className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                    {sidebarOpen && <span>Settings</span>}
                  </button>
                </li>
              </ul>
            </div>
           
            <div className="pt-4 border-t border-gray-200">
              <a
                href="/"
                className="flex items-center px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
                target="_blank"
              >
                <Home className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                {sidebarOpen && <span>View Patient Site</span>}
              </a>
              <button
                onClick={handleLogout}
                className="mt-2 flex w-full items-center px-3 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg"
              >
                <LogOut className={`${!sidebarOpen ? 'mx-auto' : 'mr-3'}`} size={20} />
                {sidebarOpen && <span>Logout</span>}
              </button>
            </div>
          </nav>
        </aside>
       
        {/* Main content */}
        <main className={`flex-1 overflow-auto p-4 sm:p-6 lg:p-8 transition-all duration-300 ${!sidebarOpen ? 'md:ml-16' : ''}`}>
          {renderActivePage()}
        </main>
      </div>
    </div>
  );
}
