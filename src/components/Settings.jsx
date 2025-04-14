import { useState, useEffect } from 'react';
import { Bell, Save, Calendar, Phone, Clock, Download, Settings, Menu, Mail, X, Home, AlertCircle, LogOut, ChevronRight, ChevronDown, ChevronUp, User, Check, X as XIcon, Edit, Trash2, Plus } from 'lucide-react';

export default function SettingsPage() {
    const [settings, setSettings] = useState({
      businessHours: [
        { id: 1, day: 'Monday', slots: ['9:00 AM - 5:00 PM'], isOpen: true },
        { id: 2, day: 'Tuesday', slots: ['9:00 AM - 5:00 PM'], isOpen: true },
        { id: 3, day: 'Wednesday', slots: ['9:00 AM - 5:00 PM'], isOpen: true },
        { id: 4, day: 'Thursday', slots: ['9:00 AM - 5:00 PM'], isOpen: true },
        { id: 5, day: 'Friday', slots: ['9:00 AM - 5:00 PM'], isOpen: true },
        { id: 6, day: 'Saturday', slots: ['10:00 AM - 2:00 PM'], isOpen: true },
        { id: 7, day: 'Sunday', slots: [], isOpen: false },
      ],
      notifications: {
        email: true,
        sms: false,
        push: true,
      },
      contactInfo: {
        phone: '(555) 123-4567',
        email: 'office@dentalclinic.com',
      },
    });
  
    const [expandedSections, setExpandedSections] = useState({
      businessHours: true,
      contactInfo: true,
      notifications: true
    });
  
    const toggleSection = (section) => {
      setExpandedSections({
        ...expandedSections,
        [section]: !expandedSections[section]
      });
    };
  
    const [saving, setSaving] = useState(false);
    const [editDay, setEditDay] = useState(null);
  
    const handleSaveSettings = () => {
      setSaving(true);
      setTimeout(() => {
        setSaving(false);
        // Show success notification
        const notification = document.getElementById('successNotification');
        notification.classList.remove('opacity-0', 'translate-y-4');
        notification.classList.add('opacity-100', 'translate-y-0');
        
        // Hide after 3 seconds
        setTimeout(() => {
          notification.classList.add('opacity-0', 'translate-y-4');
          notification.classList.remove('opacity-100', 'translate-y-0');
        }, 3000);
      }, 800);
    };
  
    const toggleDayStatus = (id) => {
      setSettings({
        ...settings,
        businessHours: settings.businessHours.map(day => 
          day.id === id ? { ...day, isOpen: !day.isOpen } : day
        )
      });
    };
  
    return (
      <div className="max-w-4xl mx-auto py-4 sm:py-8 px-3 sm:px-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-full text-blue-600">
                <Settings size={24} />
              </div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Clinic Settings</h1>
            </div>
            <div className="h-1 w-20 bg-blue-600 rounded-full mb-3"></div>
            <p className="text-sm sm:text-base text-gray-600">Customize your clinic's preferences and operational details</p>
          </div>
        </div>
  
        <div className="space-y-4 sm:space-y-6">
          {/* Business Hours */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300">
            <div 
              className="flex items-center justify-between p-3 sm:p-4 md:p-8 cursor-pointer bg-gradient-to-r from-blue-50 to-white"
              onClick={() => toggleSection('businessHours')}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Clock size={16} className="sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Business Hours</h2>
              </div>
              <div className="flex-shrink-0">
                {expandedSections.businessHours ? <ChevronUp size={16} className="sm:w-5 sm:h-5" /> : <ChevronDown size={16} className="sm:w-5 sm:h-5" />}
              </div>
            </div>
            
            {expandedSections.businessHours && (
              <div className="p-3 sm:p-6 border-t border-gray-100 space-y-3 sm:space-y-4">
                {settings.businessHours.map((day) => (
                  <div key={day.id} className={`flex flex-col sm:flex-row items-start sm:items-center justify-between rounded-xl p-3 transition-all duration-200 ${day.isOpen ? 'bg-white' : 'bg-gray-50'}`}>
                    <div className="flex items-center space-x-3 mb-2 sm:mb-0 w-full sm:w-auto">
                      <div className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full ${day.isOpen ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                      <span className="w-24 sm:w-28 font-medium text-gray-700">{day.day}</span>
                      
                      <button 
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleDayStatus(day.id);
                        }}
                        className={`ml-auto sm:ml-0 sm:hidden px-2 py-0.5 text-xs rounded-full transition-all ${
                          day.isOpen 
                            ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                            : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                        }`}
                      >
                        {day.isOpen ? 'Open' : 'Closed'}
                      </button>
                    </div>
                    
                    {day.isOpen ? (
                      <div className="flex items-center w-full sm:w-auto">
                        <input
                          type="text"
                          value={day.slots.join(', ')}
                          readOnly={editDay !== day.id}
                          onChange={(e) => {
                            const updatedBusinessHours = settings.businessHours.map(d => 
                              d.id === day.id ? { ...d, slots: [e.target.value] } : d
                            );
                            setSettings({...settings, businessHours: updatedBusinessHours});
                          }}
                          className="flex-1 px-3 py-1.5 sm:px-4 sm:py-2 text-sm border rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-200"
                        />
                        <button 
                          className="text-blue-600 hover:text-blue-800 p-1.5 sm:p-2 rounded-lg hover:bg-blue-50 transition ml-2"
                          onClick={() => setEditDay(editDay === day.id ? null : day.id)}
                        >
                          <Edit size={14} className="sm:w-4 sm:h-4" />
                        </button>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 italic">Closed</span>
                    )}
                    
                    <button 
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleDayStatus(day.id);
                      }}
                      className={`hidden sm:block ml-4 px-2 sm:px-3 py-0.5 sm:py-1 text-xs rounded-full transition-all ${
                        day.isOpen 
                          ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      {day.isOpen ? 'Open' : 'Closed'}
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
  
          {/* Contact Information */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300">
            <div 
              className="flex items-center justify-between p-3 sm:p-6 cursor-pointer bg-gradient-to-r from-blue-50 to-white"
              onClick={() => toggleSection('contactInfo')}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Phone size={16} className="sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Contact Information</h2>
              </div>
              {expandedSections.contactInfo ? <ChevronUp size={16} className="sm:w-5 sm:h-5" /> : <ChevronDown size={16} className="sm:w-5 sm:h-5" />}
            </div>
            
            {expandedSections.contactInfo && (
              <div className="p-3 sm:p-6 border-t border-gray-100">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">Phone Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Phone size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="tel"
                        value={settings.contactInfo.phone}
                        onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, phone: e.target.value } })}
                        className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                      />
                    </div>
                  </div>
                  
                  <div className="group">
                    <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-1 sm:mb-2 group-hover:text-blue-600 transition-colors">Email Address</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Mail size={14} className="sm:w-4 sm:h-4" />
                      </div>
                      <input
                        type="email"
                        value={settings.contactInfo.email}
                        onChange={(e) => setSettings({ ...settings, contactInfo: { ...settings.contactInfo, email: e.target.value } })}
                        className="w-full pl-8 sm:pl-10 pr-3 py-2 sm:py-3 border border-gray-200 rounded-lg sm:rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition-all text-sm sm:text-base"
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
  
          {/* Notification Preferences */}
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-md border border-gray-100 overflow-hidden transition-all duration-300">
            <div 
              className="flex items-center justify-between p-3 sm:p-6 cursor-pointer bg-gradient-to-r from-blue-50 to-white"
              onClick={() => toggleSection('notifications')}
            >
              <div className="flex items-center space-x-2 sm:space-x-3">
                <div className="p-1.5 sm:p-2 rounded-lg bg-blue-100 text-blue-700">
                  <Bell size={16} className="sm:w-5 sm:h-5" />
                </div>
                <h2 className="text-base sm:text-lg md:text-xl font-semibold text-gray-800">Notification Preferences</h2>
              </div>
              {expandedSections.notifications ? <ChevronUp size={16} className="sm:w-5 sm:h-5" /> : <ChevronDown size={16} className="sm:w-5 sm:h-5" />}
            </div>
            
            {expandedSections.notifications && (
              <div className="p-3 sm:p-6 border-t border-gray-100">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    settings.notifications.email 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSettings({ 
                    ...settings, 
                    notifications: { 
                      ...settings.notifications, 
                      email: !settings.notifications.email 
                    } 
                  })}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.email}
                        onChange={() => {}}
                        className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-sm sm:text-base">Email</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 pl-6 sm:pl-8">Receive appointment notifications via email</p>
                  </div>
                  
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    settings.notifications.sms 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSettings({ 
                    ...settings, 
                    notifications: { 
                      ...settings.notifications, 
                      sms: !settings.notifications.sms 
                    } 
                  })}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.sms}
                        onChange={() => {}}
                        className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-sm sm:text-base">SMS</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 pl-6 sm:pl-8">Receive text messages for reminders</p>
                  </div>
                  
                  <div className={`p-3 sm:p-4 rounded-lg sm:rounded-xl border-2 transition-all duration-200 cursor-pointer ${
                    settings.notifications.push 
                      ? 'border-blue-500 bg-blue-50' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSettings({ 
                    ...settings, 
                    notifications: { 
                      ...settings.notifications, 
                      push: !settings.notifications.push 
                    } 
                  })}>
                    <div className="flex items-center space-x-2 sm:space-x-3 mb-2 sm:mb-3">
                      <input
                        type="checkbox"
                        checked={settings.notifications.push}
                        onChange={() => {}}
                        className="form-checkbox h-4 w-4 sm:h-5 sm:w-5 text-blue-600 rounded"
                      />
                      <span className="font-medium text-sm sm:text-base">Push</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-500 pl-6 sm:pl-8">Receive mobile app notifications</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
  
        {/* Save Button */}
        <div className="mt-6 sm:mt-10 flex justify-center">
          <button
            onClick={handleSaveSettings}
            disabled={saving}
            className={`px-6 sm:px-8 py-2.5 sm:py-3 rounded-lg sm:rounded-xl text-white text-base sm:text-lg font-medium shadow-md sm:shadow-lg transition-all duration-300 ${
              saving 
                ? 'bg-blue-400 cursor-wait' 
                : 'bg-blue-600 hover:bg-blue-700 hover:scale-105'
            }`}
          >
            <div className="flex items-center space-x-2">
              {saving ? (
                <div className="h-4 w-4 sm:h-5 sm:w-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Save size={16} className="sm:w-5 sm:h-5" />
              )}
              <span>{saving ? 'Saving...' : 'Save Changes'}</span>
            </div>
          </button>
        </div>
        
        {/* Success Notification - More mobile friendly position */}
        <div 
          id="successNotification"
          className="fixed bottom-4 sm:bottom-6 left-4 right-4 sm:left-auto sm:right-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-3 sm:p-4 rounded-lg shadow-lg opacity-0 translate-y-4 transition-all duration-300 max-w-sm mx-auto sm:mx-0"
        >
          <div className="flex items-center">
            <div className="mr-2 sm:mr-3 bg-green-200 p-1 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 sm:h-5 sm:w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            </div>
            <p className="text-sm sm:text-base font-medium">Settings saved successfully!</p>
          </div>
        </div>
      </div>
    );
}