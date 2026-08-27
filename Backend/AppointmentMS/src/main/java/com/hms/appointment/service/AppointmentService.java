package com.hms.appointment.service;

import com.hms.appointment.dto.AppointmentDTO;

public interface AppointmentService {
    
    void scheduledAppointment(AppointmentDTO appointmentDTO);

    void cancelAppointment(Long appointmentId);

    void completeAppointment(Long appointmentId);

    void rescheduleAppointment(Long appointmentId, String newDateTime);

    void getAppointmentDetails(Long appointmentId);
}
