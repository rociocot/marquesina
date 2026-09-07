package com.cartelera.backend.controller;

import com.cartelera.backend.model.ConfiguracionTv;
import com.cartelera.backend.service.ConfiguracionTvService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.http.HttpStatus;

@RestController
@RequestMapping("/api/configuraciones-tv")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")

public class ConfiguracionTvController {

    private final ConfiguracionTvService configuracionTvService;

    @GetMapping("/{nroTv}")
    public ResponseEntity<ConfiguracionTv> obtenerPorNroTv(@PathVariable Integer nroTv) {
        return ResponseEntity.ok(configuracionTvService.obtenerPorNroTv(nroTv));
    }

    @PostMapping
    public ResponseEntity<ConfiguracionTv> guardar(@RequestBody ConfiguracionTv configuracionTv) {
        return ResponseEntity.ok(configuracionTvService.guardar(configuracionTv));
    }

    @PostMapping("/upload")
    public ResponseEntity<String> subirFondo(@RequestParam("file") MultipartFile file) {
        try {
            String nombreArchivoGuardado = configuracionTvService.guardarArchivoFondo(file);
            return ResponseEntity.ok(nombreArchivoGuardado);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Error al subir el archivo: " + e.getMessage());
        }
    }
}