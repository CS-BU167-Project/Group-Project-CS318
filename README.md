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
