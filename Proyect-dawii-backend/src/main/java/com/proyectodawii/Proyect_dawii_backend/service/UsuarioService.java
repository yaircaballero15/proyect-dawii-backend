package com.proyectodawii.Proyect_dawii_backend.service;

import com.proyectodawii.Proyect_dawii_backend.dto.LoginDTO;
import com.proyectodawii.Proyect_dawii_backend.dto.RegistroUsuarioDTO;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UsuarioService {
    @Autowired
    private IUsuarioRepository repoUsua;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public Usuario registrarUsuario(RegistroUsuarioDTO dto) {
        if (repoUsua.findByCorreo(dto.correo).isPresent()) {
            throw new RuntimeException("Correo ya está registrado");
        }
        Usuario usuario = new Usuario();
        usuario.setNomUsua(dto.nom_usua);
        usuario.setApeUsua(dto.ape_usua);
        usuario.setCorreo(dto.correo);
        usuario.setClave(passwordEncoder.encode(dto.clave));
        usuario.setFna_usua(dto.fna_usua);
        return repoUsua.save(usuario);
    }

    public Usuario login(LoginDTO dto) {
        Usuario usuario = repoUsua.findByCorreo(dto.correo)
                .orElseThrow(() -> new RuntimeException("Usuario no encontrado"));
        if (!passwordEncoder.matches(dto.clave, usuario.getClave())) {
            throw new RuntimeException("Contraseña incorrecta");
        }
        return usuario;
    }
}

