package com.proyectodawii.Proyect_dawii_backend.security;

import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)     // ← habilita @PreAuthorize
@RequiredArgsConstructor
public class SecurityConfig {

    private final JwtFilter jwtFilter;           // inyectado por constructor

    /* ---------- Password encoder ---------- */
    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /* ---------- AuthenticationManager (necesario para /auth/login) ---------- */
    @Bean
    public AuthenticationManager authManager(AuthenticationConfiguration config) throws Exception {
        return config.getAuthenticationManager();
    }

    /* ---------- Filtro de seguridad principal ---------- */
    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {

        http
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(auth -> auth
                        /* ENDPOINTS PÚBLICOS */
                        .requestMatchers("/auth/**").permitAll()          // login, register
                        .requestMatchers("/api/usuarios/**").permitAll()  // (si mantienes alguno público)
                        /* CUALQUIER OTRO ENDPOINT REQUIERE TOKEN */
                        .anyRequest().authenticated()
                )
                /* Añadimos nuestro filtro JWT antes del filtro de autenticación por formulario */
                .addFilterBefore(jwtFilter, UsernamePasswordAuthenticationFilter.class);

        return http.build();
    }
}
