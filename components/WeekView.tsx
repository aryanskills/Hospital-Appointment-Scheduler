import { useWeekAppointments } from '../hooks/useAppointments';
import { AppointmentService } from '../services/appointmentService';
import { Appointment } from '../types';

interface WeekViewProps {
  doctorId: string;
  selectedDate: Date;
}

interface DayColumnProps {
  date: Date;
  appointments: Appointment[];
}

function DayColumn({ date, appointments }: DayColumnProps) {
  const dayAppointments = appointments.filter(appointment => {
    const appointmentDate = new Date(appointment.startTime);
    return appointmentDate.toDateString() === date.toDateString();
  });
  const timeSlots = AppointmentService.generateTimeSlots(date);

  return (
    <div className="flex-1 border-r border-gray-200">
      <div className="p-2 bg-gray-50 border-b text-center">
        <div className="font-semibold text-sm">
          {date.toLocaleDateString('en-US', { weekday: 'short' })}
        </div>
        <div className="text-xs text-gray-600">
          {date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
      </div>
      <div className="space-y-0">
        {timeSlots.map((slot) => {
          const slotAppointments = dayAppointments.filter(appointment => {
            const appointmentStart = new Date(appointment.startTime);
            return appointmentStart.getHours() === slot.start.getHours() && 
                  appointmentStart.getMinutes() === slot.start.getMinutes();
          });

          return (
            <div key={slot.start.getTime()} className="h-12 border-b border-gray-100 p-1">
              {slotAppointments.map((appointment) => {
                const patient = AppointmentService.getPatientById(appointment.patientId);
                const color = AppointmentService.getAppointmentColor(appointment.type);
                return (
                  <div
                    key={appointment.id}
                    className="text-xs p-1 rounded text-white truncate"
                    style={{ backgroundColor: color }}
                    title={`${patient?.name} - ${appointment.type}`}
                  >
                    {patient?.name}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function WeekView({ doctorId, selectedDate }: WeekViewProps) {
  const startOfWeek = new Date(selectedDate);
  startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay());
  const { appointments, weekDays, loading, error } = useWeekAppointments(doctorId, startOfWeek);

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

  const timeSlots = AppointmentService.generateTimeSlots(new Date());

  return (
    <div className="week-view">
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="flex">
          {/* Time column */}
          <div className="w-20 bg-gray-50 border-r border-gray-200">
            <div className="h-16 border-b border-gray-200 flex items-center justify-center">
              <span className="text-sm font-medium text-gray-600">Time</span>
            </div>
            {timeSlots.map((slot) => (
              <div key={slot.start.getTime()} className="h-12 border-b border-gray-100 flex items-center justify-center">
                <span className="text-xs text-gray-500">
                  {slot.start.toLocaleTimeString('en-US', { 
                    hour: 'numeric', 
                    minute: '2-digit',
                    hour12: true 
                  })}
                </span>
              </div>
            ))}
          </div>
          {/* Days columns */}
          {weekDays.map((day) => (
            <DayColumn key={day.getTime()} date={day} appointments={appointments} />
          ))}
        </div>
      </div>
    </div>
  );
}
