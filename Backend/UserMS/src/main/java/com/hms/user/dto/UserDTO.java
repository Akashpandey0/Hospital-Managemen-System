package com.hms.user.dto;

// lombok imports
import com.hms.user.entity.User;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor

public class UserDTO {
    private Long id;

    @NotBlank(message = "Name is mandatory.")
    private String name;

    @NotBlank(message = "Email is mandatory.")
    @Email(message = "Email should be valid.")
    private String email;

    @NotBlank(message = "Password is mandatory.")
    @Pattern(regexp = "^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=.*[@#$%^&+=])(?=\\S+$).{8,16}$", message = "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character.")
    private String password;
    private Roles role; // e.g., "DOCTOR", "ADMIN", "PATIENT
    private Long profileId;

    public User toEntity() {
        return new User(this.id, this.name, this.email, this.password, this.role, this.profileId);
    }
}
