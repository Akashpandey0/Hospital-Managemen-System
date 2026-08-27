package com.hms.appointment.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.appointment.dto.AppointmentDTO;
import com.hms.appointment.repository.AppointmentRepository;

@Service
public class AppointmentServiceImpl implements AppointmentService {
    @Autowired
    private AppointmentRepository appointmentRepository;

    @Override
    public void scheduledAppointment(AppointmentDTO appointmentDTO) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'scheduledAppointment'");
    }

    @Override
    public void cancelAppointment(Long appointmentId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'cancelAppointment'");
    }

    @Override
    public void completeAppointment(Long appointmentId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'completeAppointment'");
    }

    @Override
    public void rescheduleAppointment(Long appointmentId, String newDateTime) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'rescheduleAppointment'");
    }

    @Override
    public void getAppointmentDetails(Long appointmentId) {
        // TODO Auto-generated method stub
        throw new UnsupportedOperationException("Unimplemented method 'getAppointmentDetails'");
    }

    
    
}
