package com.cartelera.backend.service;

import com.cartelera.backend.model.Producto;
import com.cartelera.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    @Override
    public List<Producto> obtenerTodos() {
        return productoRepository.findAll();
    }

    @Override
    public List<Producto> obtenerDisponibles() {
        return productoRepository.findByDisponibleTrue();
    }

    @Override
    public List<Producto> obtenerPorTvYDisponibles(Integer nroTv) {
        return productoRepository.findByAsignadoTvAndDisponibleTrue(nroTv);
    }

    @Override
    public Producto guardar(Producto producto) {
        return productoRepository.save(producto);
    }

    @Override
    public Producto obtenerPorId(Long id) {
        return productoRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Producto no encontrado con id: " + id));
    }

    @Override
    public Producto modificar(Producto producto) {
        if (producto.getId() == null || !productoRepository.existsById(producto.getId())) {
            throw new RuntimeException("No se puede modificar un producto sin ID o inexistente");
        }
        return productoRepository.save(producto);
    }

    @Override
    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}