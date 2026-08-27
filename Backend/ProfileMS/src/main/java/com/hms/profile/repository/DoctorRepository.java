package com.hms.profile.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.hms.profile.entity.Doctor;
import java.util.Optional;

@Repository
public interface DoctorRepository extends CrudRepository<Doctor, Long> {
    Optional<Doctor> findByLicenseNo(String licenseNo);
    Optional<Doctor> findByEmail(String email);
    Optional<Doctor> findById(Long id);
}
