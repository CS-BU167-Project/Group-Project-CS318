# Group-Project-CS318

A full-stack expense management application with React frontend and Spring Boot backend.

## Project Structure

- **frontend/** - React + TypeScript + Vite frontend application
- **backend/** - Spring Boot backend API with PostgreSQL

## Quick Start

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Backend
```bash
cd backend/expense-manager-api
./gradlew bootRun
```

### Run Both (Windows PowerShell)

To launch the backend and frontend simultaneously in separate PowerShell windows, from the repository root run:

```powershell
.\run-dev.ps1
```

This will open two new PowerShell windows: one running the Spring Boot backend (port 8080) and one running the Vite dev server (port 5173).

## Technology Stack

### Frontend
- React 18+
- TypeScript
- Vite
- ESLint

### Backend
- Spring Boot 3.5.7
- Spring Data JPA
- Spring Security with JWT
- SQLite
- Java 21

## Prerequisites

- Node.js 16+
- Java 21
- Gradle (included via wrapper)

## Database Setup

The backend uses SQLite with a local database file `expense_manager.db` created automatically in the backend directory. No setup is required - the database will be created on first run.
