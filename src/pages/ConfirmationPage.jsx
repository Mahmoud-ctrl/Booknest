import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import { ArrowRight, ArrowLeft, Calendar, Clock, Check, Info, User, Mail, Phone, FileText } from 'lucide-react';

function ConfirmationPage({ appointmentData }) {
  const navigate = useNavigate();
  const [appointmentId, setAppointmentId] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API call to create appointment
    setTimeout(() => {
      // Generate a random appointment ID
      const randomId = Math.random().toString(36).substring(2, 10).toUpperCase();
      setAppointmentId(randomId);
      setIsLoading(false);
    }, 1500);
  }, []);

  // If essential data is missing, redirect to home
  if (!appointmentData.service || !appointmentData.date || !appointmentData.time || 
      !appointmentData.patientInfo?.name) {
    return (
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 max-w-md mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <Info className="w-16 h-16 text-blue-500 mx-auto mb-4" />
          <p className="text-lg mb-6">Missing appointment information. Please start over.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium flex items-center justify-center mx-auto"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Return to Service Selection
          </button>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white min-h-screen flex items-center justify-center">
        <div className="text-center py-10 max-w-md mx-auto bg-white text-gray-800 rounded-xl shadow-lg p-8">
          <div className="inline-block h-12 w-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-lg">Confirming your appointment...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Appointment Confirmed!</h1>
          <p className="text-blue-100 text-lg">
            You will receive a confirmation email and text reminder soon
          </p>
        </div>
      </div>
      
      {/* Content Section */}
      <div className="bg-gray-50 rounded-t-3xl py-12 text-gray-800">
        <div className="max-w-3xl mx-auto px-4">
          {/* Success Message */}
          <div className="text-center mb-8">
            <div className="bg-green-50 p-4 rounded-full inline-flex mb-6">
              <Check className="h-12 w-12 text-green-600" />
            </div>
          </div>
          
          {/* Appointment Details */}
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
              <p className="text-lg font-semibold text-gray-700">{appointmentId}</p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 mb-6">
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
            
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <User className="w-4 h-4 mr-2" />
                  Patient
                </div>
                <p className="text-gray-700 font-semibold">{appointmentData.patientInfo.name}</p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <Phone className="w-4 h-4 mr-2" />
                  Contact
                </div>
                <p className="text-gray-700">{appointmentData.patientInfo.email}</p>
                <p className="text-gray-700">{appointmentData.patientInfo.phone}</p>
              </div>
            </div>
            
            {appointmentData.patientInfo.notes && (
              <div className="bg-blue-50 p-4 rounded-lg mt-4">
                <div className="flex items-center text-blue-600 font-medium mb-1">
                  <FileText className="w-4 h-4 mr-2" />
                  Notes
                </div>
                <p className="text-gray-700">{appointmentData.patientInfo.notes}</p>
              </div>
            )}
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate(`/manage/${appointmentId}`)}
              className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 shadow-md hover:shadow-lg transition-all flex items-center justify-center"
            >
              <Calendar className="w-4 h-4 mr-2" />
              Manage Appointment
            </button>
            
            <button
              onClick={() => navigate('/')}
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-all flex items-center justify-center"
            >
              <ArrowRight className="w-4 h-4 mr-2" />
              Book Another Appointment
            </button>
          </div>
          
          {/* Help Information */}
          <div className="mt-10 text-center">
            <p className="text-gray-500 flex items-center justify-center">
              <Phone className="w-4 h-4 mr-2 text-blue-500" />
              Need help? Contact our clinic at (555) 123-4567
            </p>
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

export default ConfirmationPage;