package com.cartelera.backend.service;

import com.cartelera.backend.model.ConfiguracionTv;

public interface ConfiguracionTvService {
    ConfiguracionTv obtenerPorNroTv(Integer nroTv);
    ConfiguracionTv guardar(ConfiguracionTv configuracionTv);
}