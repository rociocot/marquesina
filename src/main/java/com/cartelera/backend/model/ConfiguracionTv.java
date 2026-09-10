package com.cartelera.backend.model;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Table (name = "configuraciones_tv")
@Data
@NoArgsConstructor
@AllArgsConstructor

public class ConfiguracionTv {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false, unique=true)
    private Integer nroTv;

    private String tipoLetra;

    private String tamanoLetra;

    private String posicionTexto;

    private String posicionImagen;

    private String tituloCabecera;

    private String imagenUrl;

    @Enumerated(EnumType.STRING)
    private TipoFondo tipoFondo; // COLOR o IMAGEN

    private String colorFondoHex;

    @Column(columnDefinition = "TEXT")
    private String estiloCssCustom;

    @Enumerated(EnumType.STRING)
    private Orientacion orientacion; //VERTICAL - HORIZONTAL

    private Integer productosPorPagina = 3; // Valor por defecto

    private Integer tiempoRotacionSegundos = 10;

}
