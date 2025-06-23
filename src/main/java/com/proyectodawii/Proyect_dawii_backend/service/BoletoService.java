package com.proyectodawii.Proyect_dawii_backend.service;

import com.proyectodawii.Proyect_dawii_backend.model.Boleto;
import com.proyectodawii.Proyect_dawii_backend.model.Usuario;
import com.proyectodawii.Proyect_dawii_backend.repository.IBoletoRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class BoletoService {

    private final IBoletoRepository repo;

    /* ===========================================================
       ==============  CONSULTAS GLOBAL-ADMIN ONLY  ===============
       =========================================================== */

    /**
     * Listar todos los boletos – solo ADMIN llama a este método
     */
    public List<Boleto> listarTodos() {
        return repo.findAll();
    }

    /**
     * Obtener boleto por id – solo ADMIN
     */
    public Optional<Boleto> obtener(Long id) {
        return repo.findById(id);
    }

    /* ===========================================================
       ===============  OPERACIONES DE ESCRITURA  =================
       =========================================================== */

    /**
     * Crear boleto (compra) – accesible a cualquier cliente autenticado.
     */
    @Transactional
    public Boleto guardar(Boleto b) {
        return repo.save(b);
    }

    /**
     * Actualizar asiento / precio – solo ADMIN
     */
    @Transactional
    public Optional<Boleto> actualizar(Long id, Boleto data) {
        return repo.findById(id).map(b -> {
            b.setAsiento(data.getAsiento());
            b.setPrecio(data.getPrecio());
            return repo.save(b);
        });
    }

    /* ===========================================================
       ==============  LISTAR POR USUARIO O VUELO  ================
       =========================================================== */

    /**
     * Admin puede inspeccionar los boletos de un usuario concreto.
     */
    public List<Boleto> listarPorUsuario(Long codUsua) {
        return repo.findByUsuarioId(codUsua);
    }

    public List<Boleto> listarPorVuelo(Long idVuelo) {
        return repo.findByVueloId(idVuelo);
    }


        /* ======== cancelar según rol/propiedad ======== */
        @Transactional
        public boolean cancelarSiAutorizado(Long id, Usuario solicitante) {
            return repo.findById(id)
                    .filter(b -> esAdmin(solicitante) || esCliente(b, solicitante))
                    .map(b -> { repo.delete(b); return true; })
                    .orElse(false);
        }

    /* ===========================================================
 ================  VERIFICACIÓN DE ROL  =====================
 =========================================================== */
        /* ---------- helpers privados ---------- */
        private boolean esAdmin(Usuario u) {
            return "ADMIN".equalsIgnoreCase(u.getRolUsua());
        }
        private boolean esCliente(Boleto b, Usuario u) {
            return b.getUsuario().getCodUsua().equals(u.getCodUsua());
        }
    }


