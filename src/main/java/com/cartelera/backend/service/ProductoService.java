package com.cartelera.backend.service;

import com.cartelera.backend.model.Producto;
import java.util.List;
import org.springframework.web.multipart.MultipartFile;

public interface ProductoService {
    List<Producto> obtenerTodos();
    List<Producto> obtenerDisponibles();
    List<Producto> obtenerPorTvYDisponibles(Integer nroTv);
    Producto guardar(Producto producto);
    Producto guardarConArchivos(Producto producto, MultipartFile imagenProducto, MultipartFile imagenFondo);
    Producto obtenerPorId(Long id);
    Producto modificar(Producto producto);
    Producto modificarConArchivos(Long id, Producto producto, MultipartFile imagenProducto, MultipartFile imagenFondo);
    void eliminar(Long id);
}
