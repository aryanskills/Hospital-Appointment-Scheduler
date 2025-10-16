import { useDoctors } from '../hooks/useAppointments';

interface DoctorSelectorProps {
  selectedDoctorId: string;
  onDoctorChange: (doctorId: string) => void;
}

export default function DoctorSelector({ selectedDoctorId, onDoctorChange }: DoctorSelectorProps) {
  const { doctors, loading } = useDoctors();

  if (loading) {
    return <div className="animate-pulse bg-gray-200 h-10 rounded"></div>;
  }

  const selectedDoctor = Array.isArray(doctors)
    ? doctors.find(d => d.id === selectedDoctorId)
    : undefined;

  return (
    <div className="space-y-2">
      <select
        value={selectedDoctorId}
        onChange={(e) => onDoctorChange(e.target.value)}
        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        <option value="">Select a Doctor</option>
        {doctors.map((doctor) => (
          <option key={doctor.id} value={doctor.id}>
            Dr. {doctor.name} - {doctor.specialty}
          </option>
        ))}
      </select>
      {selectedDoctor && (
        <div className="p-3 bg-blue-50 rounded-lg">
          <h3 className="font-semibold text-blue-900">Dr. {selectedDoctor.name}</h3>
          <p className="text-blue-700">{selectedDoctor.specialty}</p>
          <p className="text-sm text-blue-600">
            Working Hours: {Object.entries(selectedDoctor.workingHours).map(
              ([day, hours]) => `${day}: ${hours.start}-${hours.end}`
            ).join(', ')}
          </p>
        </div>
      )}
    </div>
  );
}
