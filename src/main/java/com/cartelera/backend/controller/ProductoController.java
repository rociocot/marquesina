package com.cartelera.backend.controller;

import com.cartelera.backend.model.Producto;
import com.cartelera.backend.service.ProductoService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
    public ResponseEntity<Producto> guardar(@RequestBody Producto producto) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productoService.guardar(producto));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Producto> modificar(@PathVariable Long id, @RequestBody Producto producto) {
        producto.setId(id);
        return ResponseEntity.ok(productoService.modificar(producto));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> eliminar(@PathVariable Long id) {
        productoService.eliminar(id);
        return ResponseEntity.noContent().build();
    }
}