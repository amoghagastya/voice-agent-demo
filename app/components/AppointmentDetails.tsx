'use client';

import React, { useState, useEffect } from 'react';
import { AppointmentSlot } from '@/lib/types';

const AppointmentDetails: React.FC = () => {
  const [availableSlots, setAvailableSlots] = useState<AppointmentSlot[]>([]);
  const [bookedAppointment, setBookedAppointment] = useState<AppointmentSlot | null>(null);

  useEffect(() => {
    const handleSlotsUpdate = (event: CustomEvent<AppointmentSlot[]>) => {
      setAvailableSlots(event.detail);
    };

    const handleAppointmentBooked = (event: CustomEvent<AppointmentSlot>) => {
      setBookedAppointment(event.detail);
      setAvailableSlots([]);
    };

    const handleCallEnded = () => {
      setAvailableSlots([]);
      setBookedAppointment(null);
    };

    window.addEventListener('availableSlotsUpdated', handleSlotsUpdate as EventListener);
    window.addEventListener('appointmentBooked', handleAppointmentBooked as EventListener);
    window.addEventListener('callEnded', handleCallEnded);

    return () => {
      window.removeEventListener('availableSlotsUpdated', handleSlotsUpdate as EventListener);
      window.removeEventListener('appointmentBooked', handleAppointmentBooked as EventListener);
      window.removeEventListener('callEnded', handleCallEnded);
    };
  }, []);

  return (
    <div className="mt-10">
      <h1 className="text-xl font-bold mb-4">Appointment Details</h1>
      <div className="shadow-md rounded p-4">
        {bookedAppointment ? (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Confirmed Appointment</h2>
            <div className="pl-4 border-l-2 border-green-500">
              <p>Date: {bookedAppointment.date}</p>
              <p>Time: {bookedAppointment.time}</p>
              <p>Dentist: {bookedAppointment.dentist}</p>
            </div>
          </div>
        ) : availableSlots.length > 0 ? (
          <div>
            <h2 className="text-lg font-semibold mb-2">Available Slots</h2>
            {availableSlots.map((slot, index) => (
              <div key={index} className="mb-2 pl-4 border-l-2 border-gray-200">
                <p>{slot.date} at {slot.time}</p>
                <p className="text-gray-600">with {slot.dentist}</p>
              </div>
            ))}
          </div>
        ) : (
          <span className="text-gray-500 text-base font-mono">No appointments scheduled</span>
        )}
      </div>
    </div>
  );
};

export default AppointmentDetails;