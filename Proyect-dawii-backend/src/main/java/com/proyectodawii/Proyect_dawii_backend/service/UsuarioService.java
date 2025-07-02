package com.proyectodawii.Proyect_dawii_backend.service;

import com.proyectodawii.Proyect_dawii_backend.dto.LoginDTO;
import com.proyectodawii.Proyect_dawii_backend.dto.RegistroUsuarioDTO;
import com.proyectodawii.Proyect_dawii_backend.dto.UserDto;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.repository.IUsuarioRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

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

    // --- LISTAR TODOS LOS USUARIOS (solo ADMIN) ---
    public List<UserDto> listarTodos() {
        return repoUsua.findAll()
                .stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());
    }

    // --- OBTENER USUARIO POR ID (ADMIN y para perfil propio) ---
    public Optional<UserDto> obtener(Long id) {
        return repoUsua.findById(id)
                .map(this::mapToDTO);
    }

    // --- ACTUALIZAR USUARIO (ADMIN o el mismo usuario) ---
    public Optional<UserDto> actualizar(Long id, RegistroUsuarioDTO dto) {
        return repoUsua.findById(id).map(usuario -> {
            usuario.setNomUsua(dto.getNom_usua());
            usuario.setApeUsua(dto.getApe_usua());
            usuario.setCorreo(dto.getCorreo());
            usuario.setFna_usua(dto.getFna_usua());
            // Actualizar clave solo si viene una nueva (opcional)
            if (dto.getClave() != null && !dto.getClave().isEmpty()) {
                usuario.setClave(passwordEncoder.encode(dto.getClave()));
            }
            return mapToDTO(repoUsua.save(usuario));
        });
    }

    // --- ELIMINAR USUARIO (solo ADMIN) ---
    public boolean eliminar(Long id) {
        if (!repoUsua.existsById(id)) return false;
        repoUsua.deleteById(id);
        return true;
    }

    // --- MAPEO ENTIDAD a DTO ---
    public UserDto mapToDTO(Usuario usuario) {
        UserDto dto = new UserDto();
        dto.setCodUsua(usuario.getCodUsua());
        dto.setNomUsua(usuario.getNomUsua());
        dto.setApeUsua(usuario.getApeUsua());
        dto.setCorreo(usuario.getCorreo());
        dto.setFnaUsua(usuario.getFna_usua());
        dto.setRolUsua(usuario.getRolUsua());
        dto.setEstUsua(usuario.getEstUsua());
        return dto;

    }
}
