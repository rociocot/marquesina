package com.cartelera.backend.repository;

import com.cartelera.backend.model.ConfiguracionTv;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface ConfiguracionTvRepository extends JpaRepository<ConfiguracionTv, Long> {


    Optional<ConfiguracionTv> findByNroTv(Integer nroTv);

}