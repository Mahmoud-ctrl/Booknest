import { useState, useEffect } from 'react';
import { Bell, Save, Calendar, Phone, Clock, Download, Settings, Menu, Mail, X, Home, AlertCircle, LogOut, ChevronRight, ChevronDown, ChevronUp, User, Check, X as XIcon, Edit, Trash2, Plus } from 'lucide-react';
import AvailabilityPage from '../../components/Availability';
import SettingsPage from '../../components/Settings';

// Mock data for appointments
const mockAppointments = [
  { id: 1, patient: 'Sarah Johnson', date: '2025-04-15', time: '09:00 AM', service: 'Dental Cleaning', status: 'confirmed' },
  { id: 2, patient: 'Michael Chen', date: '2025-04-15', time: '10:30 AM', service: 'Teeth Whitening', status: 'confirmed' },
  { id: 3, patient: 'Emily Rodriguez', date: '2025-04-15', time: '01:00 PM', service: 'Dental Check-up', status: 'pending' },
  { id: 4, patient: 'David Williams', date: '2025-04-16', time: '11:00 AM', service: 'Dental Filling', status: 'confirmed' },
  { id: 5, patient: 'Jessica Brown', date: '2025-04-16', time: '02:30 PM', service: 'Braces', status: 'canceled' },
  { id: 6, patient: 'Robert Taylor', date: '2025-04-17', time: '09:30 AM', service: 'Root Canal', status: 'pending' },
];

// Mock data for availability
const mockAvailability = [
  { id: 1, day: 'Monday', slots: ['9:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
  { id: 2, day: 'Tuesday', slots: ['9:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
  { id: 3, day: 'Wednesday', slots: ['9:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
  { id: 4, day: 'Thursday', slots: ['9:00 AM - 12:00 PM', '1:00 PM - 5:00 PM'] },
  { id: 5, day: 'Friday', slots: ['9:00 AM - 12:00 PM', '1:00 PM - 3:00 PM'] },
  { id: 6, day: 'Saturday', slots: ['10:00 AM - 2:00 PM'] },
  { id: 7, day: 'Sunday', slots: [] },
];

// Recent statistics for the dashboard
const stats = [
  { id: 1, title: 'Total Appointments', value: '142', trend: '+12%', icon: <Calendar size={20} />, color: 'bg-blue-100 text-blue-600' },
  { id: 2, title: 'Completion Rate', value: '94%', trend: '+2%', icon: <Check size={20} />, color: 'bg-green-100 text-green-600' },
  { id: 3, title: 'New Patients', value: '28', trend: '+8%', icon: <User size={20} />, color: 'bg-purple-100 text-purple-600' },
  { id: 4, title: 'Total Revenue', value: '$9,482', trend: '+15%', icon: <Download size={20} />, color: 'bg-amber-100 text-amber-600' },
];

export default function AdminDashboard() {
  // Use window.innerWidth to determine initial sidebar state based on screen size
  const [activePage, setActivePage] = useState('appointments');
  
  // Initialize sidebarOpen based on screen width (mobile vs desktop)
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Check if window is available (for SSR compatibility)
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768; // 768px is the standard md breakpoint in Tailwind
    }
    return true; // Default to open if window is not available
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filteredAppointments, setFilteredAppointments] = useState(mockAppointments);
  const [timeFilter, setTimeFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Add resize event listener to handle screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        // Keep sidebar open on desktop
        setSidebarOpen(true);
      } else {
        // Close sidebar on mobile
        setSidebarOpen(false);
      }
    };

    // Set initial state and add listener
    handleResize();
    window.addEventListener('resize', handleResize);

    // Clean up event listener
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter appointments based on search term and filters
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

  // Notification and profile dropdowns
  const [notificationOpen, setNotificationOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleLogout = () => {
    // Handle logout logic
    setIsAuthenticated(false);
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Handle page navigation and auto-close sidebar on mobile
  const handlePageChange = (page) => {
    setActivePage(page);
    
    // Auto close sidebar on mobile when navigating
    if (typeof window !== 'undefined' && window.innerWidth < 768) {
      setSidebarOpen(false);
    }
  };

  const renderActivePage = () => {
    switch(activePage) {
      case 'appointments':
        return <AppointmentsPage
          appointments={filteredAppointments}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          timeFilter={timeFilter}
          setTimeFilter={setTimeFilter}
          statusFilter={statusFilter}
          setStatusFilter={setStatusFilter}
        />;
      case 'availability':
        return <AvailabilityPage availability={mockAvailability} />;
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

  // If not authenticated, don't render anything
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

// Appointments Page Component
function AppointmentsPage({ appointments, searchTerm, setSearchTerm, timeFilter, setTimeFilter, statusFilter, setStatusFilter }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  
  const statusColors = {
    confirmed: "bg-green-100 text-green-800",
    pending: "bg-amber-100 text-amber-800",
    canceled: "bg-red-100 text-red-800"
  };

  const handleAppointmentClick = (appointment) => {
    setSelectedAppointment(appointment);
    setIsDrawerOpen(true);
  };

  const getUniqueFilterDates = () => {
    const dates = [...new Set(mockAppointments.map(app => app.date))];
    return dates.sort();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <div className="p-2 bg-blue-100 rounded-full text-blue-600">
              <Calendar size={24} />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Appointments</h1>
          </div>
          <div className="h-1 w-20 bg-blue-600 rounded-full mb-3"></div>
          <p className="text-sm sm:text-base text-gray-600">Manage your appointments and schedule</p>
        </div>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          <span>New Appointment</span>
        </button>
      </div>
      
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {stats.map(stat => (
          <div key={stat.id} className="bg-white rounded-xl shadow-sm border border-gray-200 p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">{stat.title}</p>
                <h3 className="text-xl font-bold text-gray-900 mt-1">{stat.value}</h3>
                <p className="text-xs text-green-600 mt-1">{stat.trend} from last month</p>
              </div>
              <div className={`p-2 rounded-lg ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Search and filters */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-medium text-gray-500 mb-1">Search</label>
            <div className="relative">
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search patients or services..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-medium text-gray-500 mb-1">Date</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={timeFilter}
              onChange={(e) => setTimeFilter(e.target.value)}
            >
              <option value="all">All Dates</option>
              {getUniqueFilterDates().map(date => (
                <option key={date} value={date}>{new Date(date).toLocaleDateString()}</option>
              ))}
            </select>
          </div>
          
          <div className="w-full md:w-1/3">
            <label className="block text-xs font-medium text-gray-500 mb-1">Status</label>
            <select
              className="w-full px-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="confirmed">Confirmed</option>
              <option value="pending">Pending</option>
              <option value="canceled">Canceled</option>
            </select>
          </div>
        </div>
      </div>
      
      {/* Appointments Table */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Patient</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date & Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {appointments.length > 0 ? (
                appointments.map((appointment) => (
                  <tr 
                    key={appointment.id}
                    className="hover:bg-gray-50 cursor-pointer"
                    onClick={() => handleAppointmentClick(appointment)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                          <User size={14} className="text-gray-500" />
                        </div>
                        <div className="ml-3">
                          <div className="text-sm font-medium text-gray-900">{appointment.patient}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{new Date(appointment.date).toLocaleDateString()}</div>
                      <div className="text-xs text-gray-500">{appointment.time}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{appointment.service}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[appointment.status]}`}>
                        {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button className="text-blue-600 hover:text-blue-900 mr-3" onClick={(e) => {
                        e.stopPropagation();
                        handleAppointmentClick(appointment);
                      }}>
                        View
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    No appointments found with the current filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Appointment Detail Drawer */}
      {isDrawerOpen && selectedAppointment && (
        <div className="fixed inset-0 overflow-hidden z-50">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={() => setIsDrawerOpen(false)}></div>
            <div className="fixed inset-y-0 right-0 pl-10 max-w-full flex">
              <div className="w-screen max-w-md">
                <div className="h-full flex flex-col bg-white shadow-xl">
                  <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                    <div className="flex items-start justify-between">
                      <h2 className="text-lg font-medium text-gray-900">Appointment Details</h2>
                      <button
                        type="button"
                        className="text-gray-400 hover:text-gray-500"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        <span className="sr-only">Close panel</span>
                        <X size={20} />
                      </button>
                    </div>
                    
                    <div className="mt-6">
                      {/* Patient Info */}
                      <div className="bg-blue-50 rounded-lg p-4 mb-6">
                        <div className="flex items-center">
                          <div className="h-12 w-12 rounded-full bg-blue-200 flex items-center justify-center">
                            <User size={24} className="text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <h3 className="text-lg font-medium text-gray-900">{selectedAppointment.patient}</h3>
                            <p className="text-sm text-gray-500">Patient ID: #10{selectedAppointment.id}452</p>
                          </div>
                        </div>
                      </div>
                      
                      {/* Appointment Details */}
                      <div className="space-y-6">
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Appointment Info</h4>
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <div className="grid grid-cols-2 gap-4">
                              <div>
                                <p className="text-xs text-gray-500">Date</p>
                                <p className="text-sm font-medium text-gray-900">{new Date(selectedAppointment.date).toLocaleDateString()}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Time</p>
                                <p className="text-sm font-medium text-gray-900">{selectedAppointment.time}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Service</p>
                                <p className="text-sm font-medium text-gray-900">{selectedAppointment.service}</p>
                              </div>
                              <div>
                                <p className="text-xs text-gray-500">Status</p>
                                <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[selectedAppointment.status]}`}>
                                  {selectedAppointment.status.charAt(0).toUpperCase() + selectedAppointment.status.slice(1)}
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium text-gray-500 mb-2">Patient Notes</h4>
                          <div className="bg-white rounded-lg border border-gray-200 p-4">
                            <p className="text-sm text-gray-700">
                              {selectedAppointment.id % 2 === 0 ? 
                                "Patient has mentioned sensitivity in upper right molar. Previous appointment showed early signs of decay." :
                                "Regular checkup and cleaning. No specific concerns mentioned by the patient."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t border-gray-200 py-4 px-4 sm:px-6">
                    <div className="flex space-x-3">
                      <button
                        type="button"
                        className="flex-1 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none"
                        onClick={() => setIsDrawerOpen(false)}
                      >
                        Close
                      </button>
                      <button
                        type="button"
                        className="flex-1 bg-blue-600 py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white hover:bg-blue-700 focus:outline-none"
                        onClick={() => alert('Appointment Rescheduled!')}
                      >
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}


// Export Page Component
function ExportPage() {
  const [dateRange, setDateRange] = useState({
    start: '2025-04-01',
    end: '2025-04-30',
  });
  const [exportFormat, setExportFormat] = useState('csv');
  const [isExporting, setIsExporting] = useState(false);
  const [exportSuccess, setExportSuccess] = useState(false);

  const handleExport = () => {
    setIsExporting(true);
    setTimeout(() => {
      setIsExporting(false);
      setExportSuccess(true);
      setTimeout(() => setExportSuccess(false), 3000);
    }, 1500);
  };

  return (
    <div>
       {/* Header */}
       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Download size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Export Data</h1>
            </div>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-gray-600">Export appointment data in various formats</p>
          </div>
        </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="max-w-xl space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="date"
                value={dateRange.start}
                onChange={(e) => setDateRange({ ...dateRange, start: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
              <input
                type="date"
                value={dateRange.end}
                onChange={(e) => setDateRange({ ...dateRange, end: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Export Format</label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            >
              <option value="csv">CSV</option>
              <option value="excel">Excel</option>
              <option value="pdf">PDF</option>
            </select>
          </div>

          <button
            onClick={handleExport}
            disabled={isExporting}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center"
          >
            {isExporting ? 'Exporting...' : 'Export Data'}
          </button>

          {exportSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg">
              Export completed successfully! Your download should start shortly.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
