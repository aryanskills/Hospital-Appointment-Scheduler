import { useState, useEffect, useMemo } from 'react';
import { Appointment, Doctor } from '../types';
import { AppointmentService } from '../services/appointmentService';

export function useAppointments(doctorId: string, date: Date) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) {
      setAppointments([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = AppointmentService.getAppointmentsByDoctorAndDate(doctorId, date);
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId, date]);

  const timeSlots = useMemo(() => AppointmentService.generateTimeSlots(date), [date]);

  return { appointments, timeSlots, loading, error };
}

export function useWeekAppointments(doctorId: string, startDate: Date) {
  const [appointments, setAppointments] = useState<Appointment[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!doctorId) {
      setAppointments([]);
      return;
    }
    setLoading(true);
    setError(null);
    try {
      const data = AppointmentService.getAppointmentsByDoctorAndWeek(doctorId, startDate);
      setAppointments(data);
    } catch (err) {
      setError('Failed to load appointments');
      setAppointments([]);
    } finally {
      setLoading(false);
    }
  }, [doctorId, startDate]);

  const weekDays = useMemo(() => AppointmentService.getWeekDays(startDate), [startDate]);

  return { appointments, weekDays, loading, error };
}

export function useDoctors() {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const doctorData = AppointmentService.getAllDoctors();
      setDoctors(doctorData);
    } catch (err) {
      console.error('Failed to load doctors');
    } finally {
      setLoading(false);
    }
  }, []);

  return { doctors, loading };
}
