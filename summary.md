# Project Summary: Personal Expense Manager

## Overview
This is a full-stack personal expense management application consisting of a React frontend and a Spring Boot backend. The application allows users to track their expenses, categorize them, and generate reports.

## Project Structure
```
Group-Project-CS318/
├── README.md                          # Main project documentation
├── run-dev.ps1                        # PowerShell script to run both backend and frontend
├── backend/
│   └── expense-manager-api/
│       ├── build.gradle               # Gradle build configuration
│       ├── settings.gradle            # Gradle settings
│       ├── gradlew & gradlew.bat      # Gradle wrapper scripts
│       └── src/
│           ├── main/
│           │   ├── java/com/personal/expense/
│           │   │   ├── PersonalExpenseManagerApiApplication.java  # Main Spring Boot application
│           │   │   ├── config/
│           │   │   │   ├── JwtAuthenticationFilter.java            # JWT authentication filter
│           │   │   │   └── SecurityConfig.java                     # Spring Security configuration
│           │   │   ├── controller/
│           │   │   │   ├── AuthController.java                     # Authentication endpoints
│           │   │   │   ├── ExpenseController.java                  # Expense CRUD endpoints
│           │   │   │   └── ReportController.java                   # Report generation endpoints
│           │   │   ├── model/
│           │   │   │   ├── Category.java                            # Category entity
│           │   │   │   ├── Expense.java                             # Expense entity
│           │   │   │   ├── JwtAuthenticationResponse.java          # JWT response model
│           │   │   │   ├── SignInRequest.java                       # Login request model
│           │   │   │   ├── SignUpRequest.java                       # Registration request model
│           │   │   │   └── User.java                                # User entity
│           │   │   ├── repository/
│           │   │   │   ├── CategoryRepository.java                 # Category data access
│           │   │   │   ├── ExpenseRepository.java                   # Expense data access
│           │   │   │   └── UserRepository.java                      # User data access
│           │   │   ├── service/
│           │   │   │   ├── AuthenticationService.java & impl       # Authentication logic
│           │   │   │   ├── ExpenseService.java & impl               # Expense business logic
│           │   │   │   ├── JwtService.java & impl                   # JWT token handling
│           │   │   │   └── UserService.java & impl                  # User management
│           │   └── resources/
│           │       └── application.properties                      # Application configuration
│           └── test/
│               └── java/com/personal/expense/expensemanagerapi/
│                   └── PersonalExpenseManagerApiApplicationTests.java  # Basic test
└── frontend/
    ├── package.json                     # Node.js dependencies and scripts
    ├── vite.config.js                  # Vite configuration with proxy
    ├── index.html                      # Main HTML file
    ├── eslint.config.js                # ESLint configuration
    ├── tsconfig.json & tsconfig.node.json  # TypeScript configurations
    └── src/
        ├── main.tsx                     # React application entry point
        ├── App.tsx                      # Main app component with routing
        ├── api.ts                       # Axios API client configuration
        ├── Dashboard.tsx                # Dashboard component (basic)
        ├── Landing.tsx                  # Landing page
        ├── Login.tsx                    # Login form
        ├── Register.tsx                 # Registration form
        ├── App.css                      # Main styles
        ├── index.css                    # Global styles
        ├── vite-env.d.ts                # Vite environment types
        └── assets/                      # Static assets (empty)
```

## Technology Stack

### Backend
- **Framework**: Spring Boot 3.5.7
- **Language**: Java 21
- **Database**: SQLite (file-based)
- **ORM**: Spring Data JPA with Hibernate
- **Security**: Spring Security with JWT authentication
- **Build Tool**: Gradle
- **Key Dependencies**:
  - Spring Web
  - Spring Data JPA
  - Spring Security
  - JWT (io.jsonwebtoken)
  - Lombok
  - SQLite JDBC driver

### Frontend
- **Framework**: React 19.2.0
- **Language**: TypeScript 5.9.3
- **Build Tool**: Vite (with rolldown)
- **Routing**: React Router DOM 7.9.6
- **HTTP Client**: Axios 1.13.2
- **Animations**: Framer Motion 12.23.24
- **Linting**: ESLint 9.39.1
- **Key Dependencies**:
  - React DOM
  - TypeScript types for React

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

## Development Setup

### Prerequisites
- Node.js 16+
- Java 21
- Gradle (included via wrapper)

### Running the Application
1. **Backend**: `cd backend/expense-manager-api && ./gradlew bootRun`
2. **Frontend**: `cd frontend && npm install && npm run dev`
3. **Both**: Run `.\run-dev.ps1` (Windows PowerShell)

The backend runs on `http://localhost:8080` and frontend on `http://localhost:5173`.

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
- Multi-currency support</content>
<parameter name="filePath">c:\Users\Charcrit\Documents\portfolio\Group-Project-CS318\summary.md