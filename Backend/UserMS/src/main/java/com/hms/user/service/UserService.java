package com.hms.user.service;

import com.hms.user.dto.UserDTO;
import com.hms.user.exception.HmsException;

public interface UserService {
    void registerUser(UserDTO userDTO)throws HmsException;
    UserDTO loginUser(UserDTO userDTO)throws HmsException;
    UserDTO getUserById(Long userId) throws HmsException;
    public void updateUser(UserDTO userDTO);
    public UserDTO getUser(String email) throws HmsException;
}
