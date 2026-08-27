package com.hms.profile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.DoctorDTO;
import com.hms.profile.exception.HmsException;
import com.hms.profile.repository.DoctorRepository;

@Service
public class DoctorServiceImpl implements DoctorService {
    @Autowired
    private DoctorRepository doctorRepository;

    @Override
    public Long addDoctor(DoctorDTO doctorDTO) throws HmsException {
        if(doctorDTO.getEmail() != null && doctorRepository.findByEmail(doctorDTO.getEmail()).isPresent()) {
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        }

        if(doctorDTO.getLicenseNo() != null && doctorRepository.findByLicenseNo(doctorDTO.getLicenseNo()).isPresent()) {
            throw new HmsException("DOCTOR_ALREADY_EXISTS");
        }

        return doctorRepository.save(doctorDTO.toEntity()).getId();
    }

    @Override
    public DoctorDTO getDoctorById(Long doctorId) throws HmsException {
        return doctorRepository.findById(doctorId).orElseThrow(() -> new HmsException("DOCTOR_NOT_FOUND")).toDTO();
    }

    @Override
    public DoctorDTO updateDoctor(DoctorDTO doctorDTO) throws HmsException {
        if(!doctorRepository.findById(doctorDTO.getId()).isPresent()) {
            throw new HmsException("DOCTOR_NOT_FOUND");
        }
        return doctorRepository.save(doctorDTO.toEntity()).toDTO();
    }
}
