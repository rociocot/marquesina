package com.cartelera.backend.service;

import com.cartelera.backend.model.ConfiguracionTv;
import org.springframework.web.multipart.MultipartFile;

public interface ConfiguracionTvService {
    ConfiguracionTv obtenerPorNroTv(Integer nroTv);
    ConfiguracionTv guardar(ConfiguracionTv configuracionTv);
    String guardarArchivoFondo(MultipartFile file);

}