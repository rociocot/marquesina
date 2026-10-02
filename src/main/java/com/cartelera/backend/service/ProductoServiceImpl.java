package com.cartelera.backend.service;

import com.cartelera.backend.model.Producto;
import com.cartelera.backend.repository.ProductoRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ProductoServiceImpl implements ProductoService {

    private final ProductoRepository productoRepository;

    private final String DIRECTORIO_UPLOADS = "uploads/";

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
    public Producto guardarConArchivos(Producto producto, MultipartFile imagenProducto, MultipartFile imagenFondo) {
        procesarArchivos(producto, imagenProducto, imagenFondo);
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
    public Producto modificarConArchivos(Long id, Producto producto, MultipartFile imagenProducto, MultipartFile imagenFondo) {
        Producto existente = obtenerPorId(id);
        producto.setId(id);

        // Si no se sube una nueva imagen de producto, conservamos la que ya tenía guardada
        if (imagenProducto == null || imagenProducto.isEmpty()) {
            producto.setImagenUrl(existente.getImagenUrl());
        }
        // Si no se sube una nueva imagen de fondo, conservamos la anterior
        if (imagenFondo == null || imagenFondo.isEmpty()) {
            producto.setImagenFondoUrl(existente.getImagenFondoUrl());
        }

        procesarArchivos(producto, imagenProducto, imagenFondo);
        return productoRepository.save(producto);
    }

    private void procesarArchivos(Producto producto, MultipartFile imagenProducto, MultipartFile imagenFondo) {
        try {
            Path uploadPath = Paths.get(DIRECTORIO_UPLOADS);
            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            if (imagenProducto != null && !imagenProducto.isEmpty()) {
                String nombreArchivo = UUID.randomUUID() + "_" + imagenProducto.getOriginalFilename();
                Path filePath = uploadPath.resolve(nombreArchivo);
                Files.copy(imagenProducto.getInputStream(), filePath, StandardCopyOption.REPLACE_EXISTING);
                producto.setImagenUrl("http://localhost:8080/uploads/" + nombreArchivo);
            }

            if (imagenFondo != null && !imagenFondo.isEmpty()) {
                String nombreArchivoFondo = UUID.randomUUID() + "_" + imagenFondo.getOriginalFilename();
                Path filePathFondo = uploadPath.resolve(nombreArchivoFondo);
                Files.copy(imagenFondo.getInputStream(), filePathFondo, StandardCopyOption.REPLACE_EXISTING);
                producto.setImagenFondoUrl("http://localhost:8080/uploads/" + nombreArchivoFondo);
            }
        } catch (IOException e) {
            throw new RuntimeException("Fallo al almacenar los archivos de imagen", e);
        }
    }

    @Override
    public void eliminar(Long id) {
        productoRepository.deleteById(id);
    }
}