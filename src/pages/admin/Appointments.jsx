import { useState } from 'react';
import { Calendar, Plus, User, X, Check, DownloadCloud } from 'lucide-react';

function Appointments({ appointments, searchTerm, setSearchTerm, timeFilter, setTimeFilter, statusFilter, setStatusFilter }) {
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const stats = [
    { id: 1, title: 'Total Appointments', value: '142', trend: '+12%', icon: <Calendar size={20} />, color: 'bg-blue-100 text-blue-600' },
    { id: 2, title: 'Completion Rate', value: '94%', trend: '+2%', icon: <Check size={20} />, color: 'bg-green-100 text-green-600' },
    { id: 3, title: 'New Patients', value: '28', trend: '+8%', icon: <User size={20} />, color: 'bg-purple-100 text-purple-600' },
    { id: 4, title: 'Total Revenue', value: '$9,482', trend: '+15%', icon: <DownloadCloud size={20} />, color: 'bg-amber-100 text-amber-600' },
  ];

  const mockAppointments = [
    { id: 1, patient: 'Sarah Johnson', date: '2025-04-15', time: '09:00 AM', service: 'Dental Cleaning', status: 'confirmed' },
    { id: 2, patient: 'Michael Chen', date: '2025-04-15', time: '10:30 AM', service: 'Teeth Whitening', status: 'confirmed' },
    { id: 3, patient: 'Emily Rodriguez', date: '2025-04-15', time: '01:00 PM', service: 'Dental Check-up', status: 'pending' },
    { id: 4, patient: 'David Williams', date: '2025-04-16', time: '11:00 AM', service: 'Dental Filling', status: 'confirmed' },
    { id: 5, patient: 'Jessica Brown', date: '2025-04-16', time: '02:30 PM', service: 'Braces', status: 'canceled' },
    { id: 6, patient: 'Robert Taylor', date: '2025-04-17', time: '09:30 AM', service: 'Root Canal', status: 'pending' },
  ];

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

export default Appointments;