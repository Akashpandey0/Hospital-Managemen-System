package com.hms.profile.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.hms.profile.dto.PatientDTO;
import com.hms.profile.exception.HmsException;
import com.hms.profile.repository.PatientRepository;

@Service
public class PatientServiceImpl implements PatientService {
    @Autowired
    private PatientRepository patientRepository;

    @Override
    public Long addPatient(PatientDTO patientDTO) throws HmsException {
        if(patientDTO.getAadharNo() != null && patientRepository.findByAadharNo(patientDTO.getAadharNo()).isPresent()) {
            throw new HmsException("PATIENT_ALREADY_EXISTS");
        }

        if(patientDTO.getEmail() != null && patientRepository.findByEmail(patientDTO.getEmail()).isPresent()) {
            throw new HmsException("PATIENT_ALREADY_EXISTS");
        }

        return patientRepository.save(patientDTO.toEntity()).getId();
    }

    @Override
    public PatientDTO getPatientById(Long patientId) throws HmsException {
        return patientRepository.findById(patientId).orElseThrow(() -> new HmsException("PATIENT_NOT_FOUND")).toDTO();
    }

    @Override
    public PatientDTO updatePatient(PatientDTO patientDTO) throws HmsException {
        if(!patientRepository.findById(patientDTO.getId()).isPresent()) {
            throw new HmsException("PATIENT_NOT_FOUND");
        }
        return patientRepository.save(patientDTO.toEntity()).toDTO();
    }
    
}
