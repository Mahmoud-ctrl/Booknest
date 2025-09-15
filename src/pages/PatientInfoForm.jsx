import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar, Clock, Check, Info, User, Mail, Phone, FileText } from 'lucide-react';

function PatientInfoForm({ appointmentData, updateAppointment }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    notes: ''
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: ''
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (validate()) {
      updateAppointment({
        patientInfo: formData
      });
      navigate('/confirmation');
    }
  };

  // If service or date/time not selected, redirect back
  if (!appointmentData.service || !appointmentData.date || !appointmentData.time) {
    return (
      <div className="text-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 max-w-md mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <Info className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <p className="text-lg mb-6">Please select a service and appointment time first.</p>
          <button
            onClick={() => navigate('/services')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Service Selection
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
          <h1 className="text-4xl font-bold mb-3">Patient Information</h1>
          <p className="text-blue-100 text-lg">
            Please provide your details to complete your booking
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="bg-gray-50 rounded-t-3xl py-12 text-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          {/* Appointment Summary */}
          <div className="bg-white p-6 rounded-xl shadow-sm mb-8">
            <h2 className="text-xl font-semibold mb-4 flex items-center text-blue-800">
              <Info className="w-5 h-5 mr-2 text-blue-500" />
              Appointment Summary
            </h2>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Service
                </div>
                <p className="text-gray-700 font-semibold">{appointmentData.service.name}</p>
                <p className="text-sm text-gray-500">{appointmentData.service.duration} min • {appointmentData.service.price}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Calendar className="w-4 h-4 mr-2" />
                  Date
                </div>
                <p className="text-gray-700 font-semibold">{format(appointmentData.date, 'EEEE, MMMM d')}</p>
                <p className="text-sm text-gray-500">{format(appointmentData.date, 'yyyy')}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Clock className="w-4 h-4 mr-2" />
                  Time
                </div>
                <p className="text-gray-700 font-semibold">
                  {format(new Date().setHours(parseInt(appointmentData.time.split(':')[0]), parseInt(appointmentData.time.split(':')[1])), 'h:mm a')}
                </p>
              </div>
            </div>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-sm">
            <div className="mb-6">
              <label htmlFor="name" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <User className="w-4 h-4 mr-2 text-blue-500" />
                Full Name*
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-100 transition-all 
                  ${errors.name ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="Enter your full name"
              />
              {errors.name && <p className="mt-1 text-sm text-red-500 flex items-center"><Info className="w-3 h-3 mr-1" /> {errors.name}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="email" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Mail className="w-4 h-4 mr-2 text-blue-500" />
                Email Address*
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-100 transition-all 
                  ${errors.email ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="example@email.com"
              />
              {errors.email && <p className="mt-1 text-sm text-red-500 flex items-center"><Info className="w-3 h-3 mr-1" /> {errors.email}</p>}
            </div>
            
            <div className="mb-6">
              <label htmlFor="phone" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <Phone className="w-4 h-4 mr-2 text-blue-500" />
                Phone Number*
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`w-full p-3 border rounded-lg focus:ring focus:ring-blue-100 transition-all 
                  ${errors.phone ? 'border-red-500 focus:ring-red-100' : 'border-gray-300 focus:border-blue-500'}`}
                placeholder="(123) 456-7890"
              />
              {errors.phone && <p className="mt-1 text-sm text-red-500 flex items-center"><Info className="w-3 h-3 mr-1" /> {errors.phone}</p>}
            </div>
            
            <div className="mb-8">
              <label htmlFor="notes" className="flex items-center text-sm font-medium text-gray-700 mb-2">
                <FileText className="w-4 h-4 mr-2 text-blue-500" />
                Special Notes or Concerns (Optional)
              </label>
              <textarea
                id="notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows="4"
                className="w-full p-3 border border-gray-300 rounded-lg focus:ring focus:ring-blue-100 focus:border-blue-500 transition-all"
                placeholder="Any additional information you'd like us to know before your appointment?"
              ></textarea>
            </div>
            
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={() => navigate('/calendar')}
                className="flex items-center justify-center px-6 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Calendar
              </button>
              
              <button
                type="submit"
                className="flex items-center justify-center px-8 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md hover:shadow-lg transition-all"
              >
                Confirm Appointment
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          </form>
          
          {/* Privacy Notice */}
          <div className="mt-6 text-center text-sm text-gray-500">
            <p>Your personal information is securely protected in accordance with our privacy policy.</p>
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
    </div>
  );
}

export default PatientInfoForm;