
<div align="center">
  <h1>🎫 Eclipto Manager</h1>
  <p>Event management and ticket sales system</p>
    <img src="preview.gif" alt="Preview de la aplicación" style="max-width: 800px; border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

</div>

<div align="center">
  <a href="https://angular.io/docs" target="_blank">
    <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  </a>
  <a href="https://docs.spring.io/spring-boot/docs/current/reference/html/" target="_blank">
    <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  </a>
  <a href="https://dev.mysql.com/doc/" target="_blank">
    <img src="https://img.shields.io/badge/MySQL-316192?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
  </a>
</div>

## 📋 Description

  Eclipto Manager is a modern web application for event management and ticket sales. It allows organizers to create and manage events, while users can purchase tickets securely and easily.

## ✨ Main

  - 🔐 Authentication with JWT and Google Sign-In
  - 👥 User roles (Admin/User)
  - 📅 Complete event management
  - 🎟️ Ticket sales system
  - 📊 Admin dashboard
  - 📱 Responsive design

## 🛠️ Technologies Used

  ### Frontend
  - Angular 18
  - TypeScript
  - Bootstrap
  - NgRx for state management
  - Angular Material
  - JWT for authentication
  
  ### Backend
  - Spring Boot 3
  - Java 17
  - Spring Security
  - MySQL
  - Hibernate
  - Maven

## 🏗️ Architecture

  ### Frontend
  The application is built following Angular's modular architecture pattern:
  - Core: Singleton services, guards and models
  - Shared: Reusable components
  - Features: Functional modules (auth, admin, user)
  
  ### Backend
  Implements a layered architecture:
  - Controllers: REST API
  - Services: Business logic
  - Repositories: Data access
  - Security: Security configuration and JWT

## 🚀 Installation

  ### Prerequisites
  - Node.js (v18+)
  - Java JDK 17
  - MySQL
  - Maven
  
  ### Steps to run the frontend
  
  ```bash
  # Clone repository
  git clone https://github.com/HugoNienhausen/eclipto-manager-v1.git
  
  # Install dependencies
  cd eclipto-manager/frontend
  npm install
  
  # start frontend server
  ng serve
  ```
  
  ### Steps to run the backend
  
  ```bash
  # change to backend directory
  cd eclipto-manager/backend
  
  # Compile the project
  mvn clean install
  
  # Execute app
  mvn spring-boot:run
  ```

## 🔧 Configuration

  1. Create MySQL Schema
  2. Configure Path Variables
     - `DATABASE_URL`
     - `JWT_SECRET`
     - `GOOGLE_CLIENT_ID`

## 📝 Path Variables

  Create file `.env` at the root of the project:
  
  ```env
  DATABASE_URL=mysql://localhost:5432/eclipto
  JWT_SECRET=your_secret_key
  GOOGLE_CLIENT_ID=your_google_client_id
  ```


<div align="center">
  <p>Developed with ❤️ By <a href="https://github.com/HugoNienhausen">Hugo Nienhausen</a></p>
</div>
