package com.firstprojects.codereader.demo.services;

import com.firstprojects.codereader.demo.entities.Role;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdToken;
import com.google.api.client.googleapis.auth.oauth2.GoogleIdTokenVerifier;
import com.google.api.client.http.javanet.NetHttpTransport;
import com.google.api.client.json.jackson2.JacksonFactory;
import com.firstprojects.codereader.demo.auth.AuthenticationResponse;
import com.firstprojects.codereader.demo.dao.UserRepository;
import com.firstprojects.codereader.demo.entities.User;
import com.firstprojects.codereader.demo.services.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Collections;

@Service
@RequiredArgsConstructor
public class GoogleAuthService {
    private final UserRepository userRepository;
    private final JwtService jwtService;

    @Value("${google.clientId}")
    private String googleClientId;

    private GoogleIdToken verifyGoogleToken(String token) {
        try {
            GoogleIdTokenVerifier verifier = new GoogleIdTokenVerifier.Builder(
                    new NetHttpTransport(),
                    JacksonFactory.getDefaultInstance())
                    .setAudience(Collections.singletonList(googleClientId))
                    .build();

            return verifier.verify(token);
        } catch (Exception e) {
            throw new RuntimeException("Error al verificar el token de Google: " + e.getMessage());
        }
    }

    public AuthenticationResponse authenticateWithGoogle(String googleToken) {
        GoogleIdToken idToken = verifyGoogleToken(googleToken);
        if (idToken != null) {
            GoogleIdToken.Payload payload = idToken.getPayload();

            String email = payload.getEmail();
            User user = userRepository.findByEmail(email)
                    .orElseGet(() -> createNewGoogleUser(payload));

            String jwtToken = jwtService.generateToken(user);
            return AuthenticationResponse.builder()
                    .token(jwtToken)
                    .build();
        }
        throw new RuntimeException("Token de Google inválido");
    }

    private User createNewGoogleUser(GoogleIdToken.Payload payload) {
        return User.builder()
                .email(payload.getEmail())
                .firstname((String) payload.get("given_name"))
                .lastname((String) payload.get("family_name"))
                .password("") // Contraseña vacía para usuarios de Google
                .role(Role.ROLE_USER)
                .build();
    }
}