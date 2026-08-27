package com.hms.user.jwt;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;

@Component
public class JwtUtil {

    private static final Long JWT_TOKEN_VALIDITY = 5 * 60 * 60L;
    private static final String SECRET = "2a64742f7310f2b24c8d9091c22a94e258c4f8d9b704e873b8c161f4fc311576c9de292b5ac353aee7256bd65661bf1e12ed7fcee6fa8200991dfbe051320181";

    public String generateToken(UserDetails userDetails) {
        Map<String, Object> claims = new HashMap<>();
        CustomUserDetails user = (CustomUserDetails) userDetails;
        claims.put("id", user.getId());
        claims.put("email", user.getEmail());
        claims.put("role", user.getRole());
        claims.put("name", user.getName());
        claims.put("profileId", user.getProfileId());

        return doGenerateToken(claims, user.getUsername());
    }

    public String doGenerateToken(Map<String, Object> claims, String subject) { 
        return Jwts.builder()
        .setClaims(claims)
        .setSubject(subject)
        .setIssuedAt(new Date(System.currentTimeMillis()))
        .setExpiration(new Date(System.currentTimeMillis() + JWT_TOKEN_VALIDITY * 1000))
        .signWith(SignatureAlgorithm.HS512, SECRET)
        .compact();
    }
}
