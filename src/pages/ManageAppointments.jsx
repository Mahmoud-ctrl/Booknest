// src/pages/ManageAppointments.jsx
import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format, addDays } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar, Clock, Check, Info, User, Mail, Phone, FileText, AlertTriangle, X } from 'lucide-react';

// Dummy appointment data
const getDummyAppointment = (id) => {
  return {
    id,
    service: {
      id: 1,
      name: 'Dental Cleaning',
      duration: 30,
      price: '$85'
    },
    date: new Date(2025, 3, 15), // April 15, 2025
    time: '10:30',
    patientInfo: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '(555) 123-4567',
      notes: 'Sensitive teeth on lower right side.'
    }
  };
};

function ManageAppointments() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const [appointment, setAppointment] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [showRescheduleForm, setShowRescheduleForm] = useState(false);
  const [availableTimes, setAvailableTimes] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);

  useEffect(() => {
    // Simulate API call to fetch appointment
    setTimeout(() => {
      setAppointment(getDummyAppointment(appointmentId));
      setIsLoading(false);
    }, 1000);
  }, [appointmentId]);

  const handleRescheduleClick = () => {
    setShowRescheduleForm(true);
    // Generate dummy available dates (next 5 days)
    const today = new Date();
    const times = [];
    
    for (let i = 1; i <= 5; i++) {
      const date = addDays(today, i);
      // Skip weekends
      if (date.getDay() !== 0 && date.getDay() !== 6) {
        times.push({
          date,
          // Generate 3-5 random time slots per day
          slots: Array.from({ length: Math.floor(Math.random() * 3) + 3 }, () => {
            const hour = Math.floor(Math.random() * 7) + 9; // 9am to 4pm
            const minute = Math.random() > 0.5 ? '00' : '30';
            return `${hour.toString().padStart(2, '0')}:${minute}`;
          }).sort()
        });
      }
    }
    
    setAvailableTimes(times);
  };

  const handleCancelConfirm = () => {
    setIsCancelling(true);
    
    // Simulate API call to cancel appointment
    setTimeout(() => {
      navigate('/');
    }, 1500);
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedTime(null);
  };

  const handleRescheduleSubmit = () => {
    if (!selectedDate || !selectedTime) return;
    
    // Update appointment with new date/time
    setAppointment({
      ...appointment,
      date: selectedDate,
      time: selectedTime
    });
    
    setShowRescheduleForm(false);
  };

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 max-w-md mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Loading appointment details...</p>
        </div>
      </div>
    );
  }

  if (!appointment) {
    return (
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 max-w-md mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <Info className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">Appointment Not Found</h1>
          <p className="text-lg mb-6">We couldn't find the appointment you're looking for.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Book New Appointment
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Manage Your Appointment</h1>
          <p className="text-blue-100 text-lg">
            View, reschedule, or cancel your upcoming dental appointment
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="bg-gray-50 rounded-t-3xl py-12 text-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          {/* Appointment details */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-800">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              Appointment Details
            </h2>
            
            <div className="bg-blue-50 p-4 rounded-lg mb-6">
              <div className="flex items-center text-blue-600 font-medium mb-1">
                <FileText className="w-4 h-4 mr-2" />
                Confirmation Code
              </div>
              <p className="text-lg font-semibold text-gray-700">{appointment.id}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Service
                </div>
                <p className="text-gray-700 font-semibold">{appointment.service.name}</p>
                <p className="text-sm text-gray-500">{appointment.service.duration} min • {appointment.service.price}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </div>
                <p className="text-gray-700 font-semibold">{format(appointment.date, 'EEEE, MMMM d')}</p>
                <p className="text-sm text-gray-500">{format(appointment.date, 'yyyy')}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </div>
                <p className="text-gray-700 font-semibold">
                  {format(new Date().setHours(parseInt(appointment.time.split(':')[0]), parseInt(appointment.time.split(':')[1])), 'h:mm a')}
                </p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </div>
                <p className="text-gray-700 font-semibold">{appointment.patientInfo.name}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </div>
                <p className="text-gray-700">{appointment.patientInfo.email}</p>
                <p className="text-gray-700">{appointment.patientInfo.phone}</p>
              </div>
            </div>
            
            {appointment.patientInfo.notes && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </div>
                <p className="text-gray-700">{appointment.patientInfo.notes}</p>
              </div>
            )}
          </div>
          
          {/* Action buttons */}
          {!showRescheduleForm && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <button
                onClick={handleRescheduleClick}
                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Reschedule Appointment
              </button>
              
              <button
                onClick={() => setShowCancelModal(true)}
                className="px-6 py-3 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all flex items-center justify-center"
              >
                <X className="w-4 h-4 mr-2" />
                Cancel Appointment
              </button>
            </div>
          )}
          
          {/* Reschedule form */}
          {showRescheduleForm && (
            <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
              <h2 className="text-xl font-semibold mb-6 flex items-center text-blue-800">
                <Calendar className="w-5 h-5 mr-2 text-blue-500" />
                Reschedule Your Appointment
              </h2>
              
              <div className="mb-6">
                <h3 className="font-medium mb-2 flex items-center text-gray-700">
                  <Calendar className="w-4 h-4 mr-2 text-blue-500" />
                  Select a new date:
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                  {availableTimes.map((day, index) => (
                    <div 
                      key={index} 
                      className={`text-center p-3 rounded-lg cursor-pointer border transition-all ${
                        selectedDate && day.date.getTime() === selectedDate.getTime()
                          ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                          : 'hover:bg-blue-50 border-gray-200'
                      }`}
                      onClick={() => handleDateSelect(day.date)}
                    >
                      <div className="font-medium">{format(day.date, 'EEE')}</div>
                      <div>{format(day.date, 'MMM d')}</div>
                    </div>
                  ))}
                </div>
              </div>
              
              {selectedDate && (
                <div className="mb-6">
                  <h3 className="font-medium mb-2 flex items-center text-gray-700">
                    <Clock className="w-4 h-4 mr-2 text-blue-500" />
                    Select a new time:
                  </h3>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-2">
                    {availableTimes
                      .find(day => selectedDate && day.date.getTime() === selectedDate.getTime())
                      ?.slots.map((time, index) => (
                        <button
                          key={index}
                          className={`py-2 border rounded-lg transition-all ${
                            selectedTime === time
                              ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                              : 'hover:bg-blue-50 border-gray-200'
                          }`}
                          onClick={() => setSelectedTime(time)}
                        >
                          {time}
                        </button>
                      ))}
                  </div>
                </div>
              )}
              
              <div className="flex justify-end gap-4 mt-8">
                <button
                  onClick={() => setShowRescheduleForm(false)}
                  className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center"
                >
                  <X className="w-4 h-4 mr-2" />
                  Cancel
                </button>
                
                <button
                  onClick={handleRescheduleSubmit}
                  disabled={!selectedDate || !selectedTime}
                  className={`px-6 py-3 rounded-lg transition-all flex items-center justify-center ${
                    selectedDate && selectedTime
                      ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-md hover:shadow-lg'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <Check className="w-4 h-4 mr-2" />
                  Confirm Reschedule
                </button>
              </div>
            </div>
          )}
          
          <div className="text-center">
            <button
              onClick={() => navigate('/')}
              className="text-blue-600 hover:text-blue-700 transition-colors flex items-center justify-center mx-auto"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Return to Home
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Cancel confirmation modal */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-xl p-6 max-w-md w-full shadow-xl">
            <div className="flex items-center text-red-500 mb-4">
              <AlertTriangle className="w-6 h-6 mr-2" />
              <h3 className="text-xl font-bold">Cancel Appointment</h3>
            </div>
            
            <p className="mb-6 text-gray-700">
              Are you sure you want to cancel your appointment for {format(appointment.date, 'MMMM d')} at {appointment.time}?
            </p>
            
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowCancelModal(false)}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center"
                disabled={isCancelling}
              >
                <Check className="w-4 h-4 mr-2" />
                Keep Appointment
              </button>
              
              <button
                onClick={handleCancelConfirm}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all flex items-center justify-center"
                disabled={isCancelling}
              >
                {isCancelling && (
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                )}
                <X className={`w-4 h-4 ${isCancelling ? 'ml-0' : 'mr-2'}`} />
                {isCancelling ? 'Cancelling...' : 'Yes, Cancel'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManageAppointments;