🎫 Eclipto Manager

Event Management and Ticket Sales System

<div align="center">
  <img src="preview.gif" alt="Application Preview" style="max-width: 800px; border-radius: 10px; margin: 20px 0; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">
</div>


<div align="center">
  <img src="https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular&logoColor=white" alt="Angular"/>
  <img src="https://img.shields.io/badge/Spring_Boot-6DB33F?style=for-the-badge&logo=spring-boot&logoColor=white" alt="Spring Boot"/>
  <img src="https://img.shields.io/badge/MySQL-316192?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
</div>


📋 Description

Eclipto Manager is a modern web application for event management and ticket sales. It allows organizers to create and manage events, while users can securely and easily purchase tickets.

✨ Key Features
	•	🔐 Authentication with JWT and Google Sign-In
	•	👥 User roles (Admin/User)
	•	📅 Complete event management
	•	🎟️ Ticket sales system
	•	📊 Admin panel
	•	📱 Responsive design

🛠️ Technologies Used

Frontend
	•	Angular 18
	•	TypeScript
	•	Bootstrap
	•	NgRx for state management
	•	Angular Material
	•	JWT for authentication

Backend
	•	Spring Boot 3
	•	Java 17
	•	Spring Security
	•	MySQL
	•	Hibernate
	•	Maven

🏗️ Architecture

Frontend

The application follows Angular’s modular architecture pattern:
	•	Core: Singleton services, guards, and models
	•	Shared: Reusable components
	•	Features: Functional modules (auth, admin, user)

Backend

Implements a layered architecture:
	•	Controllers: REST API
	•	Services: Business logic
	•	Repositories: Data access
	•	Security: Security configuration and JWT

🚀 Installation

Prerequisites
	•	Node.js (v18+)
	•	Java JDK 17
	•	MySQL
	•	Maven

Steps to Run the Frontend

# Clone the repository
git clone https://github.com/your-username/eclipto-manager.git

# Install dependencies
cd eclipto-manager/frontend
npm install

# Start the development server
ng serve

Steps to Run the Backend

# Navigate to the backend directory
cd eclipto-manager/backend

# Compile the project
mvn clean install

# Run the application
mvn spring-boot:run

🔧 Configuration
	1.	Create a PostgreSQL database
	2.	Set up environment variables:
	•	DATABASE_URL
	•	JWT_SECRET
	•	GOOGLE_CLIENT_ID

📝 Environment Variables

Create a .env file in the project’s root directory:

DATABASE_URL=mysql://localhost:5432/eclipto
JWT_SECRET=your_secret_key
GOOGLE_CLIENT_ID=your_google_client_id

<div align="center">
  <p>Developed with ❤️ by <a href="https://github.com/HugoNienhausen">Hugo Nienhausen</a></p>
</div>
