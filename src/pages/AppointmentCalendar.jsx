// src/pages/AppointmentCalendar.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format, addDays, startOfWeek, addWeeks, isSameDay } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar, Clock, CheckCircle } from 'lucide-react';

// Generate dummy available time slots
const generateTimeSlots = (date) => {
  // Simulate available time slots (9am to 5pm with some randomly unavailable)
  const slots = [];
  const startHour = 9;
  const endHour = 17;
  
  for (let hour = startHour; hour < endHour; hour++) {
    // Add half-hour slots
    [0, 30].forEach(minutes => {
      // Randomly make some slots unavailable (about 30%)
      const available = Math.random() > 0.3;
      
      if (available) {
        slots.push({
          time: `${hour.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`,
          available: true
        });
      }
    });
  }
  
  return slots;
};

// Generate dummy data for a week of appointments
const generateWeekAvailability = (startDate) => {
  const weekDays = [];
  
  for (let i = 0; i < 7; i++) {
    const currentDate = addDays(startDate, i);
    // No appointments on weekends
    const isWeekend = [0, 6].includes(currentDate.getDay());
    
    weekDays.push({
      date: currentDate,
      timeSlots: isWeekend ? [] : generateTimeSlots(currentDate)
    });
  }
  
  return weekDays;
};

function AppointmentCalendar({ appointmentData, updateAppointment }) {
  const navigate = useNavigate();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [currentWeekStart, setCurrentWeekStart] = useState(startOfWeek(currentDate, { weekStartsOn: 1 }));
  const [weekAvailability, setWeekAvailability] = useState(generateWeekAvailability(currentWeekStart));

  // Move to next week
  const nextWeek = () => {
    const nextWeekStart = addWeeks(currentWeekStart, 1);
    setCurrentWeekStart(nextWeekStart);
    setWeekAvailability(generateWeekAvailability(nextWeekStart));
  };

  // Move to previous week (don't allow past weeks)
  const prevWeek = () => {
    const today = new Date();
    const prevWeekStart = addWeeks(currentWeekStart, -1);
    
    if (prevWeekStart >= today) {
      setCurrentWeekStart(prevWeekStart);
      setWeekAvailability(generateWeekAvailability(prevWeekStart));
    }
  };

  const handleDateSelect = (day) => {
    if (day.timeSlots.length > 0) {
      setSelectedDate(day.date);
      setSelectedTime(null);
    }
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handleContinue = () => {
    if (selectedDate && selectedTime) {
      updateAppointment({
        date: selectedDate,
        time: selectedTime
      });
      navigate('/patient-info');
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-6">
          <h1 className="text-4xl font-bold mb-3">Choose Your Appointment Time</h1>
          {appointmentData.service && (
            <p className="text-blue-100 text-lg">
              Scheduling for: <span className="font-medium">{appointmentData.service.name}</span> 
              {" • "}<span>{appointmentData.service.duration} minutes</span>
              {" • "}<span>{appointmentData.service.price}</span>
            </p>
          )}
        </div>
      </div>
      
      {/* Calendar Section */}
      <div className="bg-gray-50 rounded-t-3xl py-12 text-gray-800">
        <div className="max-w-4xl mx-auto px-4">
          {/* Calendar navigation */}
          <div className="flex justify-between items-center mb-8 bg-white p-4 rounded-xl shadow-sm">
            <button 
              onClick={prevWeek}
              className="px-4 py-2 flex items-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Previous Week
            </button>
            
            <div className="flex items-center">
              <Calendar className="w-5 h-5 text-blue-500 mr-2" />
              <span className="font-medium text-gray-700">
                {format(currentWeekStart, 'MMMM d')} - {format(addDays(currentWeekStart, 6), 'MMMM d, yyyy')}
              </span>
            </div>
            
            <button 
              onClick={nextWeek}
              className="px-4 py-2 flex items-center bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors font-medium"
            >
              Next Week
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>

          {/* Days of the week */}
          <div className="grid grid-cols-7 gap-3 mb-8">
            {weekAvailability.map((day, index) => (
              <div 
                key={index} 
                className={`text-center p-4 rounded-xl cursor-pointer transition-all duration-200 ${
                  day.timeSlots.length === 0 
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
                    : isSameDay(day.date, selectedDate)
                      ? 'bg-blue-500 text-white shadow-md transform scale-105'
                      : 'bg-white shadow-sm hover:shadow hover:bg-blue-50'
                }`}
                onClick={() => handleDateSelect(day)}
              >
                <div className={`font-medium text-sm mb-1 ${
                  isSameDay(day.date, selectedDate) ? 'text-blue-100' : 'text-blue-500'
                }`}>
                  {format(day.date, 'EEE')}
                </div>
                <div className="text-2xl font-bold">
                  {format(day.date, 'd')}
                </div>
                {day.timeSlots.length > 0 && (
                  <div className={`text-xs mt-1 ${
                    isSameDay(day.date, selectedDate) ? 'text-blue-100' : 'text-gray-500'
                  }`}>
                    {day.timeSlots.length} slots
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Time slots */}
          {selectedDate ? (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-xl font-semibold mb-4 flex items-center">
                <Clock className="w-5 h-5 text-blue-500 mr-2" />
                Available times for {format(selectedDate, 'EEEE, MMMM d')}:
              </h2>
              
              <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                {weekAvailability
                  .find(day => isSameDay(day.date, selectedDate))
                  ?.timeSlots.map((slot, index) => (
                    <button
                      key={index}
                      className={`py-3 px-2 border rounded-lg text-center transition-all duration-200 relative ${
                        selectedTime === slot.time
                          ? 'bg-blue-500 text-white border-blue-500 shadow-md'
                          : 'hover:bg-blue-50 border-gray-200'
                      }`}
                      onClick={() => handleTimeSelect(slot.time)}
                    >
                      {selectedTime === slot.time && (
                        <span className="absolute top-1 right-1">
                          <CheckCircle className="w-4 h-4 text-blue-100" />
                        </span>
                      )}
                      <span className="text-lg">
                        {format(new Date().setHours(parseInt(slot.time.split(':')[0]), parseInt(slot.time.split(':')[1])), 'h:mm a')}
                      </span>
                    </button>
                  ))}
              </div>
              
              {weekAvailability
                .find(day => isSameDay(day.date, selectedDate))
                ?.timeSlots.length === 0 && (
                <p className="text-center text-gray-500 py-4">
                  No available time slots for this day. Please select another day.
                </p>
              )}
            </div>
          ) : (
            <div className="bg-white rounded-xl p-6 shadow-sm text-center">
              <p className="text-gray-500">Please select a day to view available appointment times.</p>
            </div>
          )}

          {/* Continue button */}
          <div className="mt-8 flex justify-center">
            <button
              className={`flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 
                ${selectedDate && selectedTime 
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-100 hover:shadow-xl transform hover:-translate-y-1' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleContinue}
              disabled={!(selectedDate && selectedTime)}
            >
              Continue to Patient Information
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
              <div className="h-2 w-10 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AppointmentCalendar;