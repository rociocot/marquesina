package com.cartelera.backend.service;

import com.cartelera.backend.model.ConfiguracionTv;
import com.cartelera.backend.repository.ConfiguracionTvRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor

public class ConfiguracionTvServiceImpl implements ConfiguracionTvService {
    private final ConfiguracionTvRepository configuracionTvRepository;
    private final String UPLOAD_DIR = "./uploads/";

    @Override
    public ConfiguracionTv obtenerPorNroTv(Integer nroTv){
        return configuracionTvRepository.findByNroTv(nroTv)
                .orElseGet(() -> crearConfiguracionPorDefecto(nroTv));
    }

    @Override
    public ConfiguracionTv guardar(ConfiguracionTv configuracionTv) {
        return configuracionTvRepository.save(configuracionTv);
    }

    @Override
    public String guardarArchivoFondo(MultipartFile file) {
        try {
            // 1. Crear carpeta si no existe
            Path directorio = Paths.get(UPLOAD_DIR);
            if (!Files.exists(directorio)) {
                Files.createDirectories(directorio);
            }

            // 2. Generar nombre único (ej: mi-foto.jpg -> 123e4567-e89b...jpg)
            String nombreOriginal = file.getOriginalFilename();
            String extension = nombreOriginal != null ? nombreOriginal.substring(nombreOriginal.lastIndexOf(".")) : "";
            String nombreUnico = UUID.randomUUID().toString() + extension;

            // 3. Guardar archivo físicamente
            Path rutaDestino = directorio.resolve(nombreUnico);
            Files.copy(file.getInputStream(), rutaDestino, StandardCopyOption.REPLACE_EXISTING);

            // 4. Retornar el nombre del archivo para guardarlo en la base de datos luego
            return nombreUnico;

        } catch (IOException e) {
            throw new RuntimeException("Error al guardar el archivo de fondo", e);
        }
    }

    private ConfiguracionTv crearConfiguracionPorDefecto(Integer nroTv) {
        ConfiguracionTv config = new ConfiguracionTv();
        config.setNroTv(nroTv);
        config.setTituloCabecera("Menú Principal");
        config.setTamanoLetra("24px");
        return configuracionTvRepository.save(config);
    }
}
