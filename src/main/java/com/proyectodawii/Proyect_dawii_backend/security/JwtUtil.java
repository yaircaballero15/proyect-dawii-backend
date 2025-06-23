package com.proyectodawii.Proyect_dawii_backend.security;

import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import org.springframework.stereotype.Component;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import javax.crypto.SecretKey;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import jakarta.annotation.PostConstruct;
@Component
public class JwtUtil {

    /* 1) Clave secreta (mínimo 32 caracteres para HS256) */
    private static final String SECRET = "mi_clave_super_secreta_de_32_bytes!!";

    /* 2) Duración del token: 1 hora (en milisegundos) */
    private static final long EXPIRA_EN = 60 * 60 * 1000;

    private SecretKey key;

    /* 3) Convertimos la cadena en clave al iniciar el bean */
    @PostConstruct
    public void init() {
        this.key = Keys.hmacShaKeyFor(SECRET.getBytes(StandardCharsets.UTF_8));
    }

    /* ----------------------------------------------------------------
       GENERAR TOKEN – metemos correo como “sub” (subject) y rol en
       un claim llamado “rol”.                                   */
    public String generarToken(Usuario usuario) {
        return Jwts.builder()
                .setSubject(usuario.getCorreo())          // quién es
                .claim("rol", usuario.getRolUsua())       // ADMIN / CLIENTE
                .setIssuedAt(new Date())                  // fecha de emisión
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRA_EN))
                .signWith(key, SignatureAlgorithm.HS256)  // firmamos
                .compact();
    }

    /* ----------------------------------------------------------------
       LEER los datos del token y obtener los “claims” (sub, rol, etc.)
       Si la firma no coincide o está expirado, lanzará excepción.     */
    public Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }

    /* ----------------------------------------------------------------
       VALIDAR: 1) usuario coincide con el subject
                2) token no expiró                                    */
    public boolean tokenValido(String token, String correoEsperado) {
        try {
            Claims c = getClaims(token);
            boolean mismoCorreo = c.getSubject().equals(correoEsperado);
            boolean noVencido   = c.getExpiration().after(new Date());
            return mismoCorreo && noVencido;
        } catch (JwtException | IllegalArgumentException e) {
            return false;
        }
    }

    /* ----------------------------------------------------------------
       Obtener el rol guardado en el token (por si lo necesitas).      */
    public String leerRol(String token) {
        return (String) getClaims(token).get("rol");   // devuelve "ADMIN" o "CLIENTE"
    }
}

