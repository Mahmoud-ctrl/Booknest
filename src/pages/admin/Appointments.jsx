// src/pages/admin/Appointments.jsx
import { motion } from 'framer-motion';

const appointments = [
  { id: 1, patient: 'Sarah Johnson', time: '09:00 AM', status: 'Confirmed' },
  { id: 2, patient: 'Mike Chen', time: '10:30 AM', status: 'Pending' },
  { id: 3, patient: 'Emma Wilson', time: '02:15 PM', status: 'Completed' },
];

export default function Appointments() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
    >
      <h2 className="text-2xl font-bold text-white mb-6">Appointments</h2>
      <div className="space-y-4">
        {appointments.map(appointment => (
          <div 
            key={appointment.id}
            className="p-4 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors"
          >
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-white font-medium">{appointment.patient}</h3>
                <p className="text-white/60 text-sm">{appointment.time}</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm ${
                appointment.status === 'Confirmed' ? 'bg-green-500/20 text-green-400' :
                appointment.status === 'Pending' ? 'bg-yellow-500/20 text-yellow-400' :
                'bg-gray-500/20 text-gray-400'
              }`}>
                {appointment.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}