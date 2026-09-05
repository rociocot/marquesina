# Cartelera Digital

Sistema de cartelera digital interactiva, diseñado para la gestión y visualización en tiempo real de productos y precios en pantallas o televisores.

---

## Tecnologías Utilizadas

* **Lenguaje:** Java 21
* **Framework Backend:** Spring Boot 3.2.5
* **Base de Datos:** H2 Database (persistencia en archivo local)
* **Persistencia / ORM:** Spring Data JPA & Hibernate
* **Librerías / Utilidades:** Lombok, Maven

---

## Arquitectura del Sistema

El backend está construido bajo una arquitectura en capas:

* `com.cartelera.backend.model`: Entidades JPA (`Producto`, `ConfiguracionTv`) y Enumerados (`TipoFondo`).
* `com.cartelera.backend.repository`: Interfaces para la interacción con la base de datos mediante `JpaRepository`.
* `com.cartelera.backend.service`: Capa de lógica de negocio (interfaces e implementaciones `ServiceImpl`).
* `com.cartelera.backend.controller`: Controladores REST para la integración con el frontend en React.

---

## Avance del Proyecto

- [x] **Módulo 1:** Inicialización de proyecto y estructura básica.
- [x] **Módulo 2.1 - 2.2:** Modelo de dominio (`Producto`, `ConfiguracionTv`, `TipoFondo`).
- [x] **Módulo 2.3:** Repositorios JPA (`ProductoRepository`, `ConfiguracionTvRepository`).
- [ ] **Módulo 2.4:** Capa de Servicios (`ProductoService`, `ConfiguracionTvService`).
- [ ] **Módulo 2.5:** Controladores REST para el panel de administración y pantalla.