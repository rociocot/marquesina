package com.cartelera.backend.service;

import com.cartelera.backend.model.ConfiguracionTv;
import com.cartelera.backend.repository.ConfiguracionTvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor

public class ConfiguracionTvServiceImpl implements ConfiguracionTvService {
    private final ConfiguracionTvRepository configuracionTvRepository;

    @Override
    public ConfiguracionTv obtenerPorNroTv(Integer nroTv){
        return configuracionTvRepository.findByNroTv(nroTv)
                .orElseGet(() -> crearConfiguracionPorDefecto(nroTv));
    }

    @Override
    public ConfiguracionTv guardar(ConfiguracionTv configuracionTv) {
        return configuracionTvRepository.save(configuracionTv);
    }

    private ConfiguracionTv crearConfiguracionPorDefecto(Integer nroTv) {
        ConfiguracionTv config = new ConfiguracionTv();
        config.setNroTv(nroTv);
        config.setTituloCabecera("Menú Principal");
        config.setTamanoLetra("24px");
        return configuracionTvRepository.save(config);
    }
}
