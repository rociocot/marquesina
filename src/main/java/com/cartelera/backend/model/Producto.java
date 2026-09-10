package com.cartelera.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.math.BigDecimal;

@Entity
@Table (name = "productos")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class Producto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String nombre;

    private String descripcion;

    private BigDecimal precio;

    @Column(nullable=false)
    private String imagenUrl;

    @Column(nullable = false)
    private Boolean disponible;

    private Integer asignadoTv;

    private String colorTarjeta;
}

