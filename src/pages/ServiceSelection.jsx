import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Clock, DollarSign, ArrowRight, CheckCircle } from 'lucide-react';
import {
  FaTooth,
  FaSearch,
  FaMicroscope,
  FaSmileBeam,
  FaTools,
  FaTeethOpen
} from 'react-icons/fa';

const dentalServices = [
  {
    id: 1,
    name: 'Dental Cleaning',
    description: 'Professional teeth cleaning to remove plaque and tartar.',
    duration: 30,
    price: '$85',
    icon: <FaTooth />
  },
  {
    id: 2,
    name: 'Dental Check-up',
    description: 'Comprehensive examination including x-rays and oral cancer screening.',
    duration: 45,
    price: '$120',
    icon: <FaSearch />
  },
  {
    id: 3,
    name: 'Root Canal',
    description: 'Treatment for infected tooth pulp to eliminate pain and save your tooth.',
    duration: 90,
    price: '$800',
    icon: <FaMicroscope />
  },
  {
    id: 4,
    name: 'Teeth Whitening',
    description: 'Professional whitening treatment for a brighter smile.',
    duration: 60,
    price: '$250',
    icon: <FaSmileBeam />
  },
  {
    id: 5,
    name: 'Dental Filling',
    description: 'Restore damaged teeth caused by decay or fracture.',
    duration: 45,
    price: '$150',
    icon: <FaTools />
  },
  {
    id: 6,
    name: 'Braces',
    description: 'Correct misaligned teeth for a straighter smile.',
    duration: 60,
    price: '$400',
    icon: <FaTeethOpen />
  }
];

function ServiceSelection({ updateAppointment }) {
  const [selectedService, setSelectedService] = useState(null);
  const navigate = useNavigate();

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleContinue = () => {
    if (selectedService) {
      updateAppointment({ service: selectedService });
      navigate('/calendar');
    }
  };

  return (
    <div className="bg-gradient-to-b from-blue-800 to-blue-600 text-white">
      {/* Hero Section */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-3">Select Your Treatment</h1>
          <p className="max-w-2xl mx-auto text-blue-100">
            Choose from our range of professional dental services tailored to meet your needs.
          </p>
        </div>
      </div>
      
      {/* Services Section */}
      <div className="bg-gray-50 py-16 rounded-t-3xl">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {dentalServices.map(service => (
              <div 
                key={service.id}
                className={`bg-white rounded-xl shadow-md overflow-hidden cursor-pointer transition-all duration-300 
                  ${selectedService?.id === service.id 
                    ? 'ring-2 ring-blue-500 transform scale-105 shadow-lg' 
                    : 'hover:shadow-lg hover:transform hover:scale-102'
                  }`}
                onClick={() => handleServiceSelect(service)}
              >
                <div className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-blue-100 p-3 rounded-full text-blue-600 mr-4">
                      <span className="text-xl">{service.icon}</span>
                    </div>
                    <h2 className="text-xl font-semibold text-gray-800">{service.name}</h2>
                    
                    {selectedService?.id === service.id && (
                      <div className="ml-auto">
                        <CheckCircle className="text-blue-500 w-6 h-6" />
                      </div>
                    )}
                  </div>
                  
                  <p className="text-gray-600 mb-6 leading-relaxed">{service.description}</p>
                  
                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center text-gray-600">
                      <Clock className="w-4 h-4 mr-2" />
                      <span>{service.duration} min</span>
                    </div>
                    
                    <div className="flex items-center text-blue-600 font-semibold">
                      <DollarSign className="w-4 h-4 mr-1" />
                      <span>{service.price.replace('$', '')}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12 flex justify-center">
            <button
              className={`flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 
                ${selectedService 
                  ? 'bg-blue-500 text-white hover:bg-blue-600 shadow-lg shadow-blue-100 hover:shadow-xl transform hover:-translate-y-1' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                }`}
              onClick={handleContinue}
              disabled={!selectedService}
            >
              Book an Appointment
              <ArrowRight className="ml-2 w-5 h-5" />
            </button>
          </div>
          
          {/* Progress indicator */}
          <div className="flex justify-center mt-10">
            <div className="flex items-center space-x-3">
              <div className="h-2 w-10 rounded-full bg-blue-500"></div>
              <div className="h-2 w-10 rounded-full bg-gray-300"></div>
              <div className="h-2 w-10 rounded-full bg-gray-300"></div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Trust Indicators */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-800 mb-2">The BookNest Advantage</h2>
            <p className="text-gray-600">Why patients choose us for their dental care</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Expert Dentists</h3>
              <p className="text-gray-600">Our team of board professionals with years of experience stay updated with ongoing education.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Simple Booking</h3>
              <p className="text-gray-600">Our online booking system makes scheduling appointments quick and convenient with reminders.</p>
            </div>
            
            <div className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 text-blue-600 rounded-full mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Advanced Technology</h3>
              <p className="text-gray-600">We use state-of-the-art equipment and techniques to ensure the best possible dental experience.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-blue-600 py-12">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Book Your Appointment?</h2>
          <p className="text-blue-100 mb-8">Experience the best dental care for you and your family. Schedule your visit today and take the first step toward a healthier smile.</p>
          <button
            className={`flex items-center justify-center px-8 py-4 rounded-lg text-lg font-medium mx-auto 
              bg-white text-blue-600 hover:bg-blue-50 shadow-lg hover:shadow-xl transition-all duration-300`}
            onClick={handleContinue}
            disabled={!selectedService}
          >
            {selectedService ? 'Continue to Scheduling' : 'Select a Service Above'}
            <ArrowRight className="ml-2 w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ServiceSelection;