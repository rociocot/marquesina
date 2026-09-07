package com.cartelera.backend.service;

import com.cartelera.backend.model.Producto;
import java.util.List;

public interface ProductoService {
    List<Producto> obtenerTodos();
    List<Producto> obtenerDisponibles();
    List<Producto> obtenerPorTvYDisponibles(Integer nroTv);
    Producto guardar(Producto producto);
    Producto obtenerPorId(Long id);
    Producto modificar(Producto producto);
    void eliminar(Long id);
}
