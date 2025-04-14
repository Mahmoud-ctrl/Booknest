import { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <header className="bg-white shadow-sm relative z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="flex items-center space-x-2">
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
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex space-x-8">
          <Link to="/" className="text-gray-600 hover:text-blue-600">Book Appointment</Link>
          <a href="#services" className="text-gray-600 hover:text-blue-600">Services</a>
          <a href="#about" className="text-gray-600 hover:text-blue-600">About Us</a>
          <a href="#contact" className="text-gray-600 hover:text-blue-600">Contact</a>
          <Link to="/admin/login" className="text-gray-600 hover:text-blue-600">Admin Login</Link>
        </nav>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          <a href="tel:+15551234567" className="hidden md:flex items-center text-gray-700 hover:text-blue-600">
            <svg 
              className="h-5 w-5 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (555) 123-4567
          </a>

          {/* Mobile Menu Button */}
          <button 
            onClick={toggleMobileMenu}
            className="md:hidden bg-blue-50 hover:bg-blue-100 p-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            aria-label="Toggle menu"
          >
            <svg 
              className="h-5 w-5 text-blue-600" 
              xmlns="http://www.w3.org/2000/svg" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>
        </div>
      </div>

      {/* Backdrop */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-40 transition-opacity duration-300 backdrop-blur-sm"
          onClick={closeMobileMenu}
        />
      )}

      {/* Mobile Drawer Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 ease-in-out ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Menu Header */}
        <div className="bg-blue-50 px-6 py-6">
          <div className="flex justify-between items-center mb-6">
            <Link to="/" className="flex items-center space-x-2" onClick={closeMobileMenu}>
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
            </Link>
            <button
              onClick={closeMobileMenu}
              className="text-gray-500 hover:text-blue-600 p-2 rounded-full hover:bg-blue-100 transition-colors focus:outline-none"
              aria-label="Close menu"
            >
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        {/* Menu Items */}
        <nav className="px-6 py-6">
          <div className="space-y-6">
            <Link 
              to="/" 
              onClick={closeMobileMenu} 
              className="flex items-center text-gray-800 hover:text-blue-600 group"
            >
              <svg className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 12L5 10M5 10L12 3L19 10M5 10V20C5 20.5523 5.44772 21 6 21H9M19 10L21 12M19 10V20C19 20.5523 18.5523 21 18 21H15M9 21C9.55228 21 10 20.5523 10 20V16C10 15.4477 10.4477 15 11 15H13C13.5523 15 14 15.4477 14 16V20C14 20.5523 14.4477 21 15 21M9 21H15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg">Book Appointment</span>
            </Link>
            
            <a 
              href="#services" 
              onClick={closeMobileMenu} 
              className="flex items-center text-gray-800 hover:text-blue-600 group"
            >
              <svg className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 6V12L16 14M22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg">Services</span>
            </a>
            
            <a 
              href="#about" 
              onClick={closeMobileMenu} 
              className="flex items-center text-gray-800 hover:text-blue-600 group"
            >
              <svg className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 14C8.13401 14 5 17.134 5 21H19C19 17.134 15.866 14 12 14Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg">About Us</span>
            </a>
            
            <a 
              href="#contact" 
              onClick={closeMobileMenu} 
              className="flex items-center text-gray-800 hover:text-blue-600 group"
            >
              <svg className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H5C3.89543 5 3 5.89543 3 7V17C3 18.1046 3.89543 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg">Contact</span>
            </a>
            <Link to="/admin/login" className="flex items-center text-gray-800 hover:text-blue-600 group" onClick={closeMobileMenu}>
              <svg className="h-5 w-5 mr-3 text-blue-500 group-hover:text-blue-600" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M17 16L21 12M21 12L17 8M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span className="text-lg">Admin Login</span>
            </Link>
          </div>
        </nav>
        
        {/* Contact Button */}
        <div className="absolute bottom-8 left-0 right-0 px-6">
          <a 
            href="tel:+15551234567" 
            className="flex items-center justify-center bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200"
          >
            <svg 
              className="h-5 w-5 mr-2" 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
            </svg>
            (555) 123-4567
          </a>
        </div>
      </div>
    </header>
  );
}

export default Header;