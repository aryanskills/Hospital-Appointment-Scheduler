import { useAppointments } from '../hooks/useAppointments';
import { AppointmentService } from '../services/appointmentService';
import { Appointment } from '../types';

interface DayViewProps {
  doctorId: string;
  selectedDate: Date;
}

interface AppointmentCardProps {
  appointment: Appointment;
}

function AppointmentCard({ appointment }: AppointmentCardProps) {
  const patient = AppointmentService.getPatientById(appointment.patientId);
  const color = AppointmentService.getAppointmentColor(appointment.type);

  const startTime = new Date(appointment.startTime);
  const endTime = new Date(appointment.endTime);
  const duration = Math.round((endTime.getTime() - startTime.getTime()) / (1000 * 60));

  return (
    <div 
      className="p-2 rounded text-white text-sm mb-1"
      style={{ backgroundColor: color }}
    >
      <div className="font-semibold">{patient?.name || 'Unknown Patient'}</div>
      <div className="text-xs opacity-90">{appointment.type}</div>
      <div className="text-xs opacity-90">{duration} min</div>
    </div>
  );
}

export default function DayView({ doctorId, selectedDate }: DayViewProps) {
  const { appointments, timeSlots, loading, error } = useAppointments(doctorId, selectedDate);

  const getAppointmentsForSlot = (slotStart: Date) => {
    return appointments.filter(appointment => {
      const appointmentStart = new Date(appointment.startTime);
      return appointmentStart.getHours() === slotStart.getHours() && 
            appointmentStart.getMinutes() === slotStart.getMinutes();
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-red-500">{error}</div>
      </div>
    );
  }

  if (!doctorId) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-gray-500">Please select a doctor to view appointments</div>
      </div>
    );
  }

  return (
    <div className="day-view">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="max-h-96 overflow-y-auto">
          {timeSlots.map((slot) => {
            const slotAppointments = getAppointmentsForSlot(slot.start);
            
            return (
              <div 
                key={slot.start.getTime()} 
                className="flex border-b border-gray-200 min-h-[60px]"
              >
                <div className="w-20 p-3 bg-gray-50 text-sm font-medium text-gray-600 border-r">
                  {slot.start.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </div>
                <div className="flex-1 p-3">
                  {slotAppointments.length > 0 ? (
                    slotAppointments.map((appointment) => (
                      <AppointmentCard key={appointment.id} appointment={appointment} />
                    ))
                  ) : (
                    <div className="text-gray-400 text-sm">No appointments</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
