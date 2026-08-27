package com.hms.user.service;

import org.springframework.stereotype.Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.reactive.function.client.WebClient;
import reactor.core.publisher.Mono;
import com.hms.user.dto.Roles;

import com.hms.user.dto.UserDTO;


@Service
public class ApiService {
    @Autowired
    private WebClient.Builder webClient;

    public Mono<Long> addprofile(UserDTO userDTO) {
        if(userDTO.getRole().equals(Roles.DOCTOR)) {
            return webClient.build().post().uri("http://localhost:8081/profile/doctor/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }

        else if(userDTO.getRole().equals(Roles.PATIENT)) {
            return webClient.build().post().uri("http://localhost:8081/profile/patient/add").bodyValue(userDTO).retrieve().bodyToMono(Long.class);
        }

        return null;
    }
}
