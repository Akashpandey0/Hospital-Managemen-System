package com.hms.profile.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Patient;
import java.util.Optional;


@Repository
public interface  PatientRepository extends CrudRepository<Patient, Long> {
    Optional<Patient> findByAadharNo(String aadharNo);
    Optional<Patient> findByEmail(String email);
    Optional<Patient> findById(Long id);
}
