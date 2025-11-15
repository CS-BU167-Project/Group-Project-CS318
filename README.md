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

## Key Features

### Authentication
- User registration and login
- JWT-based authentication
- Password encryption with BCrypt
- Secure API endpoints

### Expense Management
- CRUD operations for expenses
- Expense categorization
- Date-based expense tracking
- User-specific expense isolation

### Reporting
- Daily expense reports
- Weekly expense reports
- Monthly expense reports
- Category-based expense summaries

### User Interface
- Responsive design with animations
- Landing page
- Login and registration forms
- Dashboard (basic implementation)
- Loading states and error handling

## API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/signin` - Login user

### Expenses
- `GET /api/v1/expenses` - Get all expenses
- `GET /api/v1/expenses/{id}` - Get expense by ID
- `POST /api/v1/expenses` - Create new expense
- `PUT /api/v1/expenses/{id}` - Update expense
- `DELETE /api/v1/expenses/{id}` - Delete expense

### Reports
- `GET /api/v1/reports/daily?userId={userId}` - Daily report
- `GET /api/v1/reports/weekly?userId={userId}` - Weekly report
- `GET /api/v1/reports/monthly?userId={userId}` - Monthly report
- `GET /api/v1/reports/summary?userId={userId}` - Category summary

## Database Schema

### Users Table
- id (Primary Key)
- firstname
- lastname
- email (Unique)
- password (Encrypted)

### Categories Table
- id (Primary Key)
- name (Unique)

### Expenses Table
- id (Primary Key)
- description
- amount (BigDecimal)
- date
- user_id (Foreign Key)
- category_id (Foreign Key)

## Configuration

### Backend Configuration (application.properties)
- SQLite database URL: `jdbc:sqlite:./expense_manager.db`
- JPA DDL auto-update enabled
- JWT signing key configured

### Frontend Configuration (vite.config.js)
- Development server proxy for `/api` to `http://localhost:8080`

## Security Features
- JWT token-based authentication
- Password hashing with BCrypt
- CORS configuration for frontend-backend communication
- Stateless session management
- Protected API endpoints

## Architecture Notes
- **Backend**: Layered architecture with Controller-Service-Repository pattern
- **Frontend**: Component-based React architecture with routing
- **Database**: SQLite for simplicity, easily replaceable with other RDBMS
- **Authentication**: Stateless JWT tokens stored in localStorage
- **API Communication**: Axios with request/response interceptors

## Future Enhancements
- Complete dashboard implementation with expense visualization
- Category management UI
- Expense filtering and search
- Data export functionality
- User profile management
- Email notifications
- Multi-currency support
