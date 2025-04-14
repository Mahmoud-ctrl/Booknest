// Availability Page Component
import { useState } from 'react';
import { Calendar, Clock, Plus, Edit, X, Trash2, Save, AlertCircle } from 'lucide-react';

function AvailabilityPage() {
  const mockAvailability = [
    { id: 1, day: 'Monday', slots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'], isActive: true },
    { id: 2, day: 'Tuesday', slots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'], isActive: true },
    { id: 3, day: 'Wednesday', slots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'], isActive: true },
    { id: 4, day: 'Thursday', slots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'], isActive: true },
    { id: 5, day: 'Friday', slots: ['9:00 AM - 1:00 PM', '2:00 PM - 5:00 PM'], isActive: true },
    { id: 6, day: 'Saturday', slots: ['10:00 AM - 2:00 PM'], isActive: true },
    { id: 7, day: 'Sunday', slots: [], isActive: false },
  ];

  const [availability, setAvailability] = useState(mockAvailability);
  const [editingAvailability, setEditingAvailability] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedSlots, setUpdatedSlots] = useState([]);
  const [exceptions, setExceptions] = useState([
    { id: 1, date: '2025-05-01', title: 'Holiday', slots: [] }
  ]);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const handleEditClick = (day) => {
    setEditingAvailability(day);
    setUpdatedSlots([...day.slots]);
    setIsEditing(true);
  };

  const handleSaveAvailability = () => {
    // In a real app, this would update the backend
    const updatedAvailability = availability.map(day => 
      day.id === editingAvailability.id ? { ...day, slots: updatedSlots } : day
    );
    setAvailability(updatedAvailability);
    setIsEditing(false);
    setEditingAvailability(null);
    
    // Show success toast
    setShowSuccessToast(true);
    setTimeout(() => setShowSuccessToast(false), 3000);
  };

  const toggleDayStatus = (dayId) => {
    setAvailability(availability.map(day => 
      day.id === dayId ? { ...day, isActive: !day.isActive } : day
    ));
  };

  return (
    <div className="max-w-6xl mx-auto py-4 md:py-8 px-3 md:px-4">
      {/* Header */}
      <div className="mb-6 md:mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <div className="flex items-center space-x-3 mb-2">
              <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                <Calendar size={20} className="md:size-24" />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Availability</h1>
            </div>
            <div className="h-1 w-24 bg-blue-600 rounded-full mb-3"></div>
            <p className="text-sm md:text-base text-gray-600">Manage your working hours and special date exceptions</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 md:px-6 md:py-3 rounded-xl flex items-center justify-center transition-all duration-300 shadow-md hover:shadow-lg w-full sm:w-auto">
            <Plus size={16} className="mr-2" />
            <span>Add Exception</span>
          </button>
        </div>
      </div>

      {/* Calendar Week View - Hidden on small screens */}
      <div className="mb-6 md:mb-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden hidden md:block">
        <div className="bg-gradient-to-r from-blue-50 to-white px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
            <Clock size={16} className="mr-2 text-blue-600" />
            Weekly Schedule
          </h2>
        </div>
        
        <div className="grid grid-cols-7 bg-gray-50 text-center text-xs font-medium text-gray-500 uppercase border-b border-gray-200">
          {availability.map(day => (
            <div key={day.id} className="px-2 py-3">{day.day}</div>
          ))}
        </div>
        
        <div className="grid grid-cols-7 min-h-32">
          {availability.map(day => (
            <div key={day.id} 
              className={`p-4 border-r border-gray-100 last:border-r-0 ${
                day.isActive ? 'bg-white' : 'bg-gray-50'
              }`}>
              {day.isActive ? (
                day.slots.length > 0 ? (
                  <div className="space-y-2">
                    {day.slots.map((slot, index) => (
                      <div key={index} className="bg-blue-50 text-blue-800 px-2 py-1 rounded-lg text-xs md:text-sm flex justify-between items-center">
                        <span>{slot}</span>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="h-full flex items-center justify-center">
                    <span className="text-xs md:text-sm text-gray-400 italic">No slots set</span>
                  </div>
                )
              ) : (
                <div className="h-full flex items-center justify-center">
                  <span className="text-xs md:text-sm text-gray-400 italic">Unavailable</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Mobile Accordion View - Only visible on small screens */}
      <div className="md:hidden mb-6 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-blue-50 to-white px-4 py-3 border-b border-gray-100">
          <h2 className="text-base font-semibold text-gray-800 flex items-center">
            <Clock size={16} className="mr-2 text-blue-600" />
            Weekly Schedule
          </h2>
        </div>
        
        <div className="divide-y divide-gray-100">
          {availability.map((day) => (
            <div key={day.id} className={`${day.isActive ? '' : 'bg-gray-50'}`}>
              <div className="flex justify-between items-center px-4 py-3">
                <div className="font-medium">{day.day}</div>
                <div className="flex items-center">
                  <div className={`mr-2 text-sm ${day.isActive ? 'text-blue-600' : 'text-gray-500'}`}>
                    {day.isActive ? 'Available' : 'Unavailable'}
                  </div>
                  <button 
                    className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors focus:outline-none ${day.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                    onClick={() => toggleDayStatus(day.id)}
                  >
                    <span
                      className={`inline-block h-3 w-3 transform rounded-full bg-white transition-transform ${
                        day.isActive ? 'translate-x-5' : 'translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
              
              {day.isActive && (
                <div className="px-4 pb-3">
                  {day.slots.length > 0 ? (
                    <div className="space-y-1">
                      {day.slots.map((slot, index) => (
                        <div key={index} className="bg-blue-50 text-blue-800 px-3 py-1 rounded-lg text-sm flex justify-between items-center">
                          <span>{slot}</span>
                          <button 
                            onClick={() => handleEditClick(day)}
                            className="text-blue-600 p-1 hover:bg-blue-100 rounded"
                          >
                            <Edit size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500 italic">No time slots configured</span>
                      <button 
                        onClick={() => handleEditClick(day)}
                        className="text-blue-600 p-1 hover:bg-blue-100 rounded"
                      >
                        <Edit size={14} />
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Detailed Table - Hidden on mobile */}
      <div className="hidden md:block bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gradient-to-r from-gray-50 to-white">
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time Slots</th>
              <th className="px-6 py-4 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {availability.map((day) => (
              <tr key={day.id} className={`${day.isActive ? '' : 'bg-gray-50'} hover:bg-blue-50 transition-colors duration-150`}>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{day.day}</div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center">
                    <button 
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none ${day.isActive ? 'bg-blue-600' : 'bg-gray-200'}`}
                      onClick={() => toggleDayStatus(day.id)}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                          day.isActive ? 'translate-x-6' : 'translate-x-1'
                        }`}
                      />
                    </button>
                    <span className={`ml-2 text-sm ${day.isActive ? 'text-blue-600 font-medium' : 'text-gray-500'}`}>
                      {day.isActive ? 'Available' : 'Unavailable'}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  {day.isActive ? (
                    day.slots.length > 0 ? (
                      <div className="space-y-1">
                        {day.slots.map((slot, index) => (
                          <div key={index} className="flex items-center">
                            <div className="w-2 h-2 rounded-full bg-blue-500 mr-2"></div>
                            <span className="text-sm text-gray-700">{slot}</span>
                          </div>
                        ))}
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500 italic">No time slots configured</span>
                    )
                  ) : (
                    <span className="text-sm text-gray-500 italic">Unavailable</span>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <button
                    onClick={() => handleEditClick(day)}
                    disabled={!day.isActive}
                    className={`flex items-center space-x-1 ml-auto text-sm px-3 py-1 rounded-md ${
                      day.isActive 
                        ? 'text-blue-600 hover:bg-blue-50' 
                        : 'text-gray-400 cursor-not-allowed'
                    }`}
                  >
                    <Edit size={14} />
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Exceptions Section */}
      <div className="mt-6 md:mt-8 bg-white rounded-2xl shadow-md border border-gray-100 overflow-hidden">
        <div className="bg-gradient-to-r from-amber-50 to-white px-4 md:px-6 py-3 md:py-4 border-b border-gray-100">
          <h2 className="text-base md:text-lg font-semibold text-gray-800 flex items-center">
            <AlertCircle size={16} className="mr-2 text-amber-600" />
            Special Date Exceptions
          </h2>
        </div>
        
        {exceptions.length > 0 ? (
          <div className="divide-y divide-gray-100">
            {exceptions.map(exception => (
              <div key={exception.id} className="p-4 flex items-center justify-between hover:bg-amber-50 transition-colors duration-150">
                <div className="flex items-center space-x-3 md:space-x-4">
                  <div className="bg-amber-100 text-amber-800 p-2 rounded-lg">
                    <Calendar size={16} />
                  </div>
                  <div>
                    <div className="font-medium">{exception.title}</div>
                    <div className="text-xs md:text-sm text-gray-500">{exception.date}</div>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                    <Edit size={16} />
                  </button>
                  <button className="p-1 text-red-600 hover:bg-red-50 rounded">
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-500">No exceptions have been added yet.</p>
          </div>
        )}
      </div>

      {/* Edit Availability Modal */}
      {isEditing && editingAvailability && (
        <div className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50 transition-opacity duration-300 p-4">
          <div className="bg-white rounded-2xl p-4 md:p-6 w-full max-w-md shadow-xl transform transition-all duration-300 scale-100 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4 md:mb-6">
              <h3 className="text-lg md:text-xl font-semibold text-gray-800">Edit {editingAvailability.day} Availability</h3>
              <button 
                onClick={() => setIsEditing(false)} 
                className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100 transition"
              >
                <X size={20} />
              </button>
            </div>
            
            <div className="space-y-3 md:space-y-4">
              {updatedSlots.length > 0 ? (
                updatedSlots.map((slot, index) => (
                  <div key={index} className="flex items-center gap-2 md:gap-3 group">
                    <div className="relative flex-1">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-gray-500">
                        <Clock size={16} />
                      </div>
                      <input
                        type="text"
                        value={slot}
                        onChange={(e) => {
                          const newSlots = [...updatedSlots];
                          newSlots[index] = e.target.value;
                          setUpdatedSlots(newSlots);
                        }}
                        className="w-full pl-10 pr-3 py-2 md:py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-200 transition text-sm md:text-base"
                        placeholder="e.g. 9:00 AM - 5:00 PM"
                      />
                    </div>
                    <button
                      onClick={() => setUpdatedSlots(updatedSlots.filter((_, i) => i !== index))}
                      className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition opacity-80 group-hover:opacity-100"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))
              ) : (
                <div className="py-4 text-center text-gray-500 bg-gray-50 rounded-xl">
                  No time slots added yet
                </div>
              )}
              
              <button
                onClick={() => setUpdatedSlots([...updatedSlots, ''])}
                className="w-full py-2 md:py-3 border-2 border-dashed border-blue-200 rounded-xl text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition flex items-center justify-center space-x-2"
              >
                <Plus size={16} />
                <span>Add Time Slot</span>
              </button>
            </div>

            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row justify-end gap-2 md:gap-3">
              <button
                onClick={() => setIsEditing(false)}
                className="px-5 py-2 text-gray-700 hover:bg-gray-100 rounded-lg transition order-2 sm:order-1"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveAvailability}
                className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 shadow-md hover:shadow-lg transition flex items-center justify-center space-x-2 order-1 sm:order-2"
              >
                <Save size={16} />
                <span>Save Changes</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Success Toast */}
      <div className={`fixed bottom-4 md:bottom-6 left-4 right-4 md:left-auto md:right-6 md:max-w-md bg-green-100 border-l-4 border-green-500 text-green-700 p-3 md:p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
        showSuccessToast ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0 pointer-events-none'
      }`}>
        <div className="flex items-center">
          <div className="mr-3 bg-green-200 p-1 rounded-full">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 md:h-5 md:w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
          </div>
          <p className="text-sm md:text-base font-medium">Availability updated successfully!</p>
        </div>
      </div>
    </div>
  );
}

export default AvailabilityPage;