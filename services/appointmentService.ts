import type { Doctor, Appointment, Patient } from '../types';
import {
  MOCK_DOCTORS,
  MOCK_PATIENTS,
  MOCK_APPOINTMENTS,
  getDoctorById,
  getPatientById,
  getAppointmentsByDoctorAndDate,
  getAppointmentsByDoctorAndDateRange,
} from '../data/mockData';

export class AppointmentService {
  static getAllDoctors(): Doctor[] {
    return MOCK_DOCTORS;
  }

  static getDoctorById(doctorId: string): Doctor | undefined {
    return getDoctorById(doctorId);
  }

  static getAppointmentsByDoctorAndDate(doctorId: string, date: Date): Appointment[] {
    return getAppointmentsByDoctorAndDate(doctorId, date);
  }

  static getAppointmentsByDoctorAndWeek(doctorId: string, startDate: Date): Appointment[] {
    const endDate = new Date(startDate);
    endDate.setDate(startDate.getDate() + 6);
    return getAppointmentsByDoctorAndDateRange(doctorId, startDate, endDate);
  }

  static getPatientById(patientId: string): Patient | undefined {
    return getPatientById(patientId);
  }

  static generateTimeSlots(date: Date): { start: Date; end: Date }[] {
    const slots = [];
    for (let hour = 8; hour < 18; hour++) {
      for (let minute of [0, 30]) {
        const start = new Date(date);
        start.setHours(hour, minute, 0, 0);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + 30);
        slots.push({ start, end });
      }
    }
    return slots;
  }

  static getWeekDays(startDate: Date): Date[] {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  }

  static getAppointmentColor(appointmentType: string): string {
    const colors: { [key: string]: string } = {
      'checkup': '#3b82f6',
      'consultation': '#10b981',
      'follow-up': '#f59e0b',
      'procedure': '#8b5cf6'
    };
    return colors[appointmentType.toLowerCase()] || '#6b7280';
  }
}
