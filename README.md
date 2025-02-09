
<div align="center">
  <h1>🎫 Eclipto Manager</h1>
  <p>Sistema de gestión de eventos y venta de tickets</p>
    <img src="preview.gif" alt="Preview de la aplicación" style="max-width: 800px; border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

</div>

<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL"/>
</div>
![Preview Video](preview.gif)
## 📋 Descripción

Eclipto Manager es una aplicación web moderna para la gestión de eventos y venta de tickets. Permite a los organizadores crear y administrar eventos, mientras que los usuarios pueden comprar tickets de forma segura y sencilla.

## ✨ Características principales

- 🔐 Autenticación con JWT y Google Sign-In
- 👥 Roles de usuario (Admin/Usuario)
- 📅 Gestión completa de eventos
- 🎟️ Sistema de venta de tickets
- 📊 Panel de administración
- 📱 Diseño responsive

## 🛠️ Tecnologías utilizadas

### Frontend
- Angular 18
- TypeScript
- Bootstrap
- NgRx para gestión de estado
- Angular Material
- JWT para autenticación

### Backend
- Spring Boot 3
- Java 17
- Spring Security
- PostgreSQL
- Hibernate
- Maven

## 🏗️ Arquitectura

### Frontend
La aplicación está construida siguiendo el patrón de arquitectura por módulos de Angular:
- Core: Servicios singleton, guardias y modelos
- Shared: Componentes reutilizables
- Features: Módulos funcionales (auth, admin, user)

### Backend
Implementa una arquitectura en capas:
- Controllers: API REST
- Services: Lógica de negocio
- Repositories: Acceso a datos
- Security: Configuración de seguridad y JWT

## 🚀 Instalación

### Prerrequisitos
- Node.js (v18+)
- Java JDK 17
- PostgreSQL
- Maven

### Pasos para ejecutar el frontend

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/eclipto-manager.git

# Instalar dependencias
cd eclipto-manager/frontend
npm install

# Iniciar servidor de desarrollo
ng serve
```

### Pasos para ejecutar el backend

```bash
# Navegar al directorio del backend
cd eclipto-manager/backend

# Compilar el proyecto
mvn clean install

# Ejecutar la aplicación
mvn spring-boot:run
```

## 🔧 Configuración

1. Crear base de datos PostgreSQL
2. Configurar variables de entorno:
   - `DATABASE_URL`
   - `JWT_SECRET`
   - `GOOGLE_CLIENT_ID`

## 📝 Variables de entorno

Crear archivo `.env` en la raíz del proyecto:

```env
DATABASE_URL=postgresql://localhost:5432/eclipto
JWT_SECRET=tu_secret_key
GOOGLE_CLIENT_ID=tu_google_client_id
```

## 🤝 Contribuir

1. Fork del repositorio
2. Crear rama feature (`git checkout -b feature/AmazingFeature`)
3. Commit cambios (`git commit -m 'Add AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abrir Pull Request

## 📄 Licencia

Distribuido bajo la licencia MIT. Ver `LICENSE` para más información.

<div align="center">
  <p>Desarrollado con ❤️ por <a href="https://github.com/tu-usuario">Tu Nombre</a></p>
</div>
/* Estilos para el README */
img {
  margin: 0 5px;
}

h1 {
  color: #4f46e5;
  margin-bottom: 10px;
}

h2 {
  color: #1e293b;
  margin-top: 30px;
  margin-bottom: 15px;
  padding-bottom: 5px;
  border-bottom: 2px solid #e2e8f0;
}

code {
  background-color: #f8fafc;
  padding: 2px 5px;
  border-radius: 4px;
  font-family: 'Consolas', monospace;
}

pre {
  background-color: #f8fafc;
  padding: 15px;
  border-radius: 8px;
  overflow-x: auto;
}

a {
  color: #4f46e5;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.shields-container {
  margin: 20px 0;
}

.shields-container img {
  margin: 0 5px;
}
