package com.proyectodawii.Proyect_dawii_backend.config;

import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.repository.IUsuarioRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;
import java.util.GregorianCalendar;

@Configuration
@RequiredArgsConstructor
public class DataInitializer {

    private final PasswordEncoder encoder;

    @Bean
    CommandLineRunner initAdmin(IUsuarioRepository repo) {
        return args -> {

            String adminCorreo = "admin@dawii.com";

            /* Si ya existe, no creamos nada */
            if (repo.findByCorreo(adminCorreo).isPresent()) {
                System.out.println("✔ Admin seed ya existe.");
                return;
            }

            /* Creamos el usuario ADMIN */
            Usuario admin = new Usuario();
            admin.setCorreo(adminCorreo);
            admin.setClave(encoder.encode("admin123")); // contraseña -> admin123
            admin.setNomUsua("Admin");
            admin.setApeUsua("Principal");
            admin.setFna_usua(new GregorianCalendar(1990, 0, 1).getTime());
            admin.setRolUsua("ADMIN");
            admin.setEstUsua("ACTIVO");

            repo.save(admin);
            System.out.println("🌱 Admin seed creado: " + adminCorreo + " / admin123");
        };
    }
}
