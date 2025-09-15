import { useState, useEffect } from 'react';
import { Calendar, Clock, Phone, MapPin, Shield, Award, Heart, Star, CheckCircle, Users, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

// Mock data
const clinicInfo = {
  name: "BookNest Dental",
  tagline: "Your smile, our priority",
  description: "At BookNest Dental, we combine modern dental technology with compassionate care to deliver exceptional dental services for the whole family.",
  phone: "(555) 123-4567",
  address: "123 Smile Avenue, Dental District",
  hours: "Mon-Fri: 8am-6pm, Sat: 9am-2pm"
};

const testimonials = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "Patient since 2022",
    avatar: "https://cdn-icons-png.freepik.com/512/4140/4140078.png?ga=GA1.1.1881380046.1744566968",
    text: "BookNest Dental transformed my dental experience! Dr. Mitchell and the team made me feel comfortable and informed throughout my treatment.",
    rating: 4
  },
  {
    id: 2,
    name: "Michael Chen",
    role: "Patient since 2023",
    avatar: "https://cdn-icons-png.freepik.com/512/4140/4140048.png?ga=GA1.1.1881380046.1744566968",
    text: "Booking appointments is so easy with their online system. The dental care is top-notch and the office is always spotless.",
    rating: 5
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    role: "Patient since 2021",
    avatar: "https://cdn-icons-png.freepik.com/512/4139/4139997.png?ga=GA1.1.1881380046.1744566968",
    text: "I've never felt more at ease at a dental clinic. The staff is friendly and professional, and the results are amazing!",
    rating: 5
  }
];

const services = [
  {
    id: 1,
    title: "General Dentistry",
    icon: <CheckCircle className="w-6 h-6" />,
    description: "Comprehensive care for your dental health including checkups, cleanings, and preventive treatments."
  },
  {
    id: 2,
    title: "Cosmetic Dentistry",
    icon: <Star className="w-6 h-6" />,
    description: "Transform your smile with our range of cosmetic procedures including whitening and veneers."
  },
  {
    id: 3,
    title: "Family Dentistry",
    icon: <Users className="w-6 h-6" />,
    description: "Dental care for all ages, from children's first visits to specialized care for seniors."
  }
];

const stats = [
  { label: "Happy Patients", value: "5,000+" },
  { label: "Years Experience", value: "15+" },
  { label: "Dental Experts", value: "12" },
  { label: "Procedures", value: "20+" }
];

function useScrollAnimation() {
  const [scrollY, setScrollY] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  return scrollY;
}

function useInView(options) {
  const [ref, setRef] = useState(null);
  const [isInView, setIsInView] = useState(false);
  
  useEffect(() => {
    if (ref) {
      const observer = new IntersectionObserver(([entry]) => {
        setIsInView(entry.isIntersecting);
      }, options);
      
      observer.observe(ref);
      
      return () => {
        observer.disconnect();
      };
    }
  }, [ref, options]);
  
  return [setRef, isInView];
}

export default function HomePage() {
  const scrollY = useScrollAnimation();
  const [heroRef, heroInView] = useInView({ threshold: 0.1 });
  const [featuresRef, featuresInView] = useInView({ threshold: 0.1 });
  const [testimonialsRef, testimonialsInView] = useInView({ threshold: 0.1 });
  const [servicesRef, servicesInView] = useInView({ threshold: 0.1 });
  const [statsRef, statsInView] = useInView({ threshold: 0.1 });
  const [contactRef, contactInView] = useInView({ threshold: 0.1 });

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6 }
    }
  };
  
  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const itemFade = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="flex flex-col min-h-screen font-sans overflow-hidden">
      {/* Hero Section */}
      <section id="home" className="pt-28 pb-16 md:pt-40 md:pb-24 bg-gradient-to-br from-blue-50 to-blue-100">
        <div ref={heroRef} className="container mx-auto px-4 md:px-8">
          <motion.div 
            className="flex flex-col md:flex-row items-center"
            initial="hidden"
            animate={heroInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div variants={fadeIn} className="md:w-1/2 mb-8 md:mb-0 z-10">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={heroInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="mb-2 inline-block bg-blue-600 text-white text-sm px-3 py-1 rounded-full"
              >
                #1 Trusted Dental Care
              </motion.div>
              
              <motion.h1 
                className="text-4xl md:text-6xl font-bold text-blue-800 mb-4 leading-tight"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                Your <span className="text-blue-600">Smile</span> Deserves The Best Care
              </motion.h1>
              
              <motion.p 
                className="text-xl text-gray-600 mb-8 max-w-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.6 }}
              >
                {clinicInfo.description}
              </motion.p>
              
              <motion.div
                className="flex flex-col sm:flex-row gap-4"
                initial={{ opacity: 0, y: 20 }}
                animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.6, delay: 0.8 }}
              >
                <Link 
                  to="/services"
                  className="inline-flex items-center justify-center bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 group"
                >
                  Book an Appointment
                  <ArrowRight className="ml-2 transform group-hover:translate-x-1 transition-transform" size={20} />
                </Link>
                
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center border-2 border-blue-600 text-blue-600 py-3 px-8 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
                >
                  Explore Services
                </a>
              </motion.div>
              <div className="mt-6 text-sm text-gray-500 text-center underline cursor-pointer hover:text-blue-600">
                  <Link to="/admin/login">
                Demo: Admin Dashboard
                </Link>
                </div>
            </motion.div>
            
            <motion.div 
              className="md:w-1/2 flex justify-center relative"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={heroInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <div className="absolute w-full h-full bg-blue-200 rounded-full blur-3xl opacity-30"></div>
              <img 
                src="https://img.freepik.com/free-photo/photo-smiling-dentist-standing-with-arms-crossed-with-her-colleague-showing-okay-sign_496169-1043.jpg?t=st=1744566984~exp=1744570584~hmac=9a32c54fbcf59a854b561bdde7c69c277f140000a663320acac33f33003de1c4&w=996" 
                alt="Smiling patient at dental clinic" 
                className="rounded-3xl shadow-2xl z-10 relative"
              />
              
              <motion.div 
                className="absolute -bottom-6 -left-6 bg-white p-4 rounded-xl shadow-lg flex items-center space-x-3 z-20"
                animate={{ 
                  y: [0, -5, 0],
                  transition: { 
                    duration: 2,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <div className="bg-green-100 p-2 rounded-lg">
                  <CheckCircle className="text-green-600" size={24} />
                </div>
                <div>
                  <p className="text-sm text-gray-500">Trusted by</p>
                  <p className="font-bold text-blue-800">5,000+ Patients</p>
                </div>
              </motion.div>
              
              <motion.div 
                className="absolute -top-6 -right-6 bg-white p-4 rounded-xl shadow-lg z-20"
                animate={{ 
                  y: [0, -8, 0],
                  transition: { 
                    duration: 3,
                    delay: 0.5,
                    repeat: Infinity,
                    repeatType: "reverse"
                  }
                }}
              >
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="text-yellow-400 fill-current" size={20} />
                  ))}
                </div>
                <p className="text-sm font-bold text-blue-800 mt-1">4.9/5 Rating</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
        
        {/* Wave separator */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg 
            className="relative block w-full h-16" 
            xmlns="http://www.w3.org/2000/svg" 
            viewBox="0 0 1200 120" 
            preserveAspectRatio="none"
          >
            <path 
              d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
              className="fill-white"
            ></path>
          </svg>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial="hidden"
            animate={statsInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            {stats.map((stat, index) => (
              <motion.div 
                key={index}
                variants={itemFade}
                className="flex flex-col items-center justify-center p-6 bg-blue-50 rounded-lg hover:shadow-lg transition-shadow duration-300"
              >
                <motion.span 
                  className="text-3xl md:text-4xl font-bold text-blue-600 mb-2"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={statsInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  {stat.value}
                </motion.span>
                <span className="text-gray-600 text-center">{stat.label}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gradient-to-b from-white to-blue-50">
        <div ref={servicesRef} className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.span variants={itemFade} className="text-blue-600 font-medium">Our Specialized Services</motion.span>
            <motion.h2 variants={itemFade} className="text-3xl md:text-4xl font-bold text-blue-800 mt-2">Comprehensive Dental Care</motion.h2>
            <motion.div variants={itemFade} className="w-24 h-1 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={servicesInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                variants={itemFade}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="bg-white p-8 rounded-xl shadow-xl hover:shadow-2xl transition-all duration-300"
              >
                <div className="bg-blue-100 text-blue-600 p-3 rounded-full w-12 h-12 flex items-center justify-center mb-6">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-blue-800 mb-3">{service.title}</h3>
                <p className="text-gray-600 mb-6">{service.description}</p>
                <Link 
                  to="/services" 
                  className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
                >
                  Learn More <ArrowRight className="ml-2" size={16} />
                </Link>
              </motion.div>
            ))}
          </motion.div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={servicesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/services"
              className="inline-flex items-center bg-blue-600 text-white py-3 px-8 rounded-lg font-semibold shadow-lg hover:bg-blue-700 transition-all duration-300 transform hover:scale-105"
            >
              View All Services <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-blue-800 text-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute top-0 left-0 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-300 rounded-full blur-3xl"></div>
        </div>
        
        <div ref={featuresRef} className="container mx-auto px-4 md:px-8 relative z-10">
          <motion.div
            initial="hidden"
            animate={featuresInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.span variants={itemFade} className="text-blue-200 font-medium">Why Patients Choose Us</motion.span>
            <motion.h2 variants={itemFade} className="text-3xl md:text-4xl font-bold text-white mt-2">The BookNest Advantage</motion.h2>
            <motion.div variants={itemFade} className="w-24 h-1 bg-blue-400 mx-auto mt-4"></motion.div>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-16">
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="bg-blue-700 p-4 rounded-full mb-6 shadow-lg">
                <Award className="text-blue-200" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4">Expert Dentists</h3>
              <p className="text-blue-100">Our team of dental professionals has years of experience providing quality dental care with ongoing education in the latest techniques.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <div className="bg-blue-700 p-4 rounded-full mb-6 shadow-lg">
                <Calendar className="text-blue-200" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4">Simple Booking</h3>
              <p className="text-blue-100">Our online booking system makes scheduling appointments quick and convenient, with automated reminders to help you stay on track.</p>
            </motion.div>
            
            <motion.div 
              className="flex flex-col items-center text-center"
              initial={{ opacity: 0, y: 30 }}
              animate={featuresInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              <div className="bg-blue-700 p-4 rounded-full mb-6 shadow-lg">
                <Shield className="text-blue-200" size={36} />
              </div>
              <h3 className="text-xl font-bold mb-4">Advanced Technology</h3>
              <p className="text-blue-100">We use state-of-the-art equipment and techniques to ensure the best possible dental experience with comfortable and efficient treatments.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="py-20 bg-gradient-to-b from-blue-50 to-white">
        <div ref={testimonialsRef} className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate={testimonialsInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.span variants={itemFade} className="text-blue-600 font-medium">Patient Testimonials</motion.span>
            <motion.h2 variants={itemFade} className="text-3xl md:text-4xl font-bold text-blue-800 mt-2">What Our Patients Say</motion.h2>
            <motion.div variants={itemFade} className="w-24 h-1 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>
          
          <div className="relative">
            <motion.div 
              className="grid grid-cols-1 md:grid-cols-3 gap-8"
              initial="hidden"
              animate={testimonialsInView ? "visible" : "hidden"}
              variants={staggerChildren}
            >
              {testimonials.map((testimonial, index) => (
                <motion.div
                  key={testimonial.id}
                  variants={itemFade}
                  whileHover={{ y: -10, transition: { duration: 0.3 } }}
                  className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 relative"
                >
                  <div className="absolute -top-5 right-8 text-blue-500 text-4xl opacity-30">"</div>
                  <div className="flex items-center mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="text-yellow-400 fill-current mr-1" size={18} />
                    ))}
                  </div>
                  <p className="text-gray-600 italic mb-6">"{testimonial.text}"</p>
                  <div className="flex items-center">
                    <img 
                      src={testimonial.avatar} 
                      alt={`${testimonial.name} avatar`} 
                      className="w-12 h-12 rounded-full mr-4 object-cover border-2 border-blue-100" 
                    />
                    <div>
                      <h4 className="font-bold text-blue-800">{testimonial.name}</h4>
                      <p className="text-sm text-gray-500">{testimonial.role}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </div>
          
          <motion.div 
            className="text-center mt-12"
            initial={{ opacity: 0, y: 20 }}
            animate={testimonialsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Link 
              to="/testimonials" 
              className="inline-flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors"
            >
              Read More Testimonials <ArrowRight className="ml-2" size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-2xl mx-auto"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Book Your Appointment?</h2>
            <p className="text-blue-100 text-lg mb-8">Experience the best dental care for you and your family. Schedule your visit today and take the first step toward a healthier smile.</p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link 
                to="/services"
                className="inline-flex items-center bg-white text-blue-700 py-4 px-10 rounded-lg font-bold shadow-xl hover:bg-blue-50 transition-colors duration-300"
              >
                Book an Appointment <ArrowRight className="ml-2" size={20} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section id="contact" className="py-20 bg-white">
        <div ref={contactRef} className="container mx-auto px-4 md:px-8">
          <motion.div
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerChildren}
            className="text-center mb-16"
          >
            <motion.span variants={itemFade} className="text-blue-600 font-medium">Get in Touch</motion.span>
            <motion.h2 variants={itemFade} className="text-3xl md:text-4xl font-bold text-blue-800 mt-2">Contact Information</motion.h2>
            <motion.div variants={itemFade} className="w-24 h-1 bg-blue-600 mx-auto mt-4"></motion.div>
          </motion.div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
            initial="hidden"
            animate={contactInView ? "visible" : "hidden"}
            variants={staggerChildren}
          >
            <motion.div 
              variants={itemFade}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <Phone className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Call Us</h3>
              <p className="text-gray-600">{clinicInfo.phone}</p>
              <a href={`tel:${clinicInfo.phone}`} className="mt-4 text-blue-600 font-medium hover:underline">Call Now</a>
            </motion.div>
            
            <motion.div 
              variants={itemFade}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <MapPin className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Visit Us</h3>
              <p className="text-gray-600">{clinicInfo.address}</p>
              <a href="#" className="mt-4 text-blue-600 font-medium hover:underline">Get Directions</a>
            </motion.div>
            
            <motion.div 
              variants={itemFade}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
              className="bg-blue-50 p-8 rounded-xl shadow-md flex flex-col items-center text-center"
            >
              <div className="bg-blue-100 p-4 rounded-full mb-6">
                <Clock className="text-blue-600" size={28} />
              </div>
              <h3 className="text-xl font-bold text-blue-800 mb-2">Office Hours</h3>
              <p className="text-gray-600">{clinicInfo.hours}</p>
              <Link to="/services" className="mt-4 text-blue-600 font-medium hover:underline">Book Now</Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};
