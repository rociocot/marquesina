package com.cartelera.backend.controller;

import com.cartelera.backend.model.Producto;
import com.cartelera.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/productos")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class ProductoController {

    private final ProductoService productoService;

    @GetMapping
    public ResponseEntity<List<Producto>> obtenerTodos() {
        return ResponseEntity.ok(productoService.obtenerTodos());
    }

    @GetMapping("/disponibles")
    public ResponseEntity<List<Producto>> obtenerDisponibles() {
        return ResponseEntity.ok(productoService.obtenerDisponibles());
    }

    @GetMapping("/tv/{nroTv}")
    public ResponseEntity<List<Producto>> obtenerPorTv(@PathVariable Integer nroTv) {
        return ResponseEntity.ok(productoService.obtenerPorTvYDisponibles(nroTv));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Producto> obtenerPorId(@PathVariable Long id) {
        return ResponseEntity.ok(productoService.obtenerPorId(id));
    }

    @PostMapping
    public ResponseEntity<Producto> guardar(@RequestPart("producto") Producto producto,
                                            @RequestPart(value = "imagenProducto", required = false) MultipartFile imagenProducto,
                                            @RequestPart(value = "imagenFondo", required = false) MultipartFile imagenFondo)
    {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.guardarConArchivos(producto, imagenProducto, imagenFondo));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> modificar(@PathVariable Long id, @RequestPart Producto producto,
                                              @RequestPart(value = "imagenProducto", required = false) MultipartFile imagenProducto,
                                              @RequestPart(value = "imagenFondo", required = false) MultipartFile imagenFondo) {
        return ResponseEntity.ok(productoService.modificarConArchivos(id, producto, imagenProducto, imagenFondo));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}