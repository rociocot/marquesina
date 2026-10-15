# Cartelera Digital

Sistema de cartelera digital interactiva, diseñado para la gestión y visualización en tiempo real de productos y precios en pantallas o televisores.

## Tecnologías Utilizadas

### Backend
- Lenguaje: Java 21
- Framework: Spring Boot 3.2.5
- Base de Datos: H2 Database (persistencia en archivo local)
- ORM: Spring Data JPA & Hibernate
- Herramientas: Lombok, Maven

### Frontend
- Librería / Framework: React con Vite
- Estilos: Tailwind CSS
- Enrutamiento y Componentes Modulares (Formularios, Modales, Listas y Vistas de Panel / TV)

### Empaquetado y Distribución
- Instalador y Automatización: Inno Setup (generación de instalador ejecutable para Windows)
- Entorno de Ejecución: Modo Kiosk de Google Chrome y scripts de automatización por lotes (.bat).

## Arquitectura del Sistema

El backend está construido bajo una arquitectura en capas:
- com.cartelera.backend.config: Configuraciones del servidor, CORS y flujos iniciales.
- com.cartelera.backend.model: Entidades JPA (Producto, ConfiguracionTv) y Enumerados (Orientacion, TipoFondo).
- com.cartelera.backend.repository: Interfaces para la interacción con la base de datos mediante JpaRepository.
- com.cartelera.backend.service: Capa de lógica de negocio (interfaces e implementaciones ServiceImpl).
- com.cartelera.backend.controller: Controladores REST para la integración con el frontend.

El frontend está organizado modularmente:
- src/components/productos: Componentes específicos para la administración, formularios, modales de vista previa y listas de productos.
- src/pages: Vistas principales para el Panel de Administración (AdminPage) y la Pantalla de Visualización de la Cartelera (TvPage).

## Estado del Proyecto

Proyecto finalizado por completo, desplegado y funcionando activamente en entorno de producción real para comercios.

- Módulo 1: Inicialización de proyecto y estructura básica.
- Módulo 2: Backend robusto en Spring Boot (Modelos, Repositorios, Servicios y Controladores REST).
- Módulo 3: Interfaz de usuario interactiva y responsiva en React y Tailwind CSS.
- Módulo 4: Configuración multimonitor en Windows.
- Módulo 5: Empaquetado final de la aplicación mediante Inno Setup para su fácil distribución e instalación comercial.
