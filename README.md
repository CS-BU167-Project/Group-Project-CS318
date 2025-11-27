# Personal Expense Manager

A modern, full-stack expense management application built with React, Spring Boot, and Tailwind CSS. Features a sleek glassmorphism UI, interactive charts, and secure authentication.

## 🚀 Key Features

### User Interface & Experience
- **Modern Design:** Glassmorphism aesthetic with dynamic wavy backgrounds and smooth animations.
- **Interactive Dashboard:** Visual data representation using Recharts (Area charts, Pie charts).
- **Responsive Layout:** Fully responsive design that works seamlessly on desktop and mobile.
- **Global Loading States:** Smooth transitions and loading overlays.

### Authentication & Security
- **Secure Auth:** JWT-based authentication with Spring Security.
- **User Management:** Registration, Login, and Profile management.
- **Password Security:** BCrypt password encryption and secure password change functionality.

### Expense Management
- **CRUD Operations:** Create, Read, Update, and Delete expenses.
- **Categorization:** Organize expenses by categories (Food, Transport, Entertainment, etc.).
- **Smart Reporting:** Daily, Weekly, and Monthly expense summaries.
- **Live Updates:** Real-time UI updates upon data changes.

## 🛠️ Technology Stack

### Frontend
- **Framework:** React 18+ with TypeScript & Vite
- **Styling:** Tailwind CSS, Tailwind Animate
- **UI Components:** Shadcn UI (WavyBackground), Lucide React (Icons)
- **Visualization:** Recharts
- **Animations:** Framer Motion
- **Reporting:** html2canvas, jsPDF
- **State Management:** React Hooks
- **HTTP Client:** Axios

### Backend
- **Framework:** Spring Boot 3.5.7
- **Language:** Java 21
- **Security:** Spring Security with JWT
- **Database:** SQLite (Zero-config local database)
- **Build Tool:** Gradle

## 🏁 Quick Start

### Prerequisites
- Node.js 16+
- Java 21
- Gradle (included via wrapper)

### One-Click Start (Windows)
Run the included batch file to start both backend and frontend servers:
```bat
.\start-app.bat
```

### Manual Setup

#### Backend
```bash
cd backend/expense-manager-api
./gradlew bootRun
```
The API will start at `http://localhost:8080`.

#### Frontend
```bash
cd frontend
npm install
npm run dev
```
The UI will start at `http://localhost:5173`.

## 📂 Project Structure

```
Group-Project-CS318/
├── backend/expense-manager-api/
│   ├── src/main/java/com/personal/expense/
│   │   ├── config/         # Security & App Config
│   │   ├── controller/     # REST API Endpoints
│   │   ├── model/          # JPA Entities & DTOs
│   │   ├── repository/     # Data Access Layer
│   │   └── service/        # Business Logic
│   └── build.gradle        # Backend Dependencies
├── frontend/
│   ├── src/
│   │   ├── components/ui/  # Reusable UI Components
│   │   ├── hooks/          # Custom React Hooks
│   │   ├── lib/            # Utilities (Tailwind, etc.)
│   │   ├── Dashboard.tsx   # Main Dashboard View
│   │   └── ...
│   └── package.json        # Frontend Dependencies
├── start-app.bat           # One-click startup script
└── README.md               # Project Documentation
```

## 🧪 Running Tests

### Backend Tests
Run the JUnit tests for the Spring Boot backend:
```bash
cd backend/expense-manager-api
./gradlew test
```

## 🔌 API Endpoints

### Authentication
- `POST /api/v1/auth/signup` - Register new user
- `POST /api/v1/auth/signin` - Login user
- `GET /api/v1/auth/profile` - Get current user profile
- `POST /api/v1/auth/change-password` - Change user password

### Expenses
- `GET /api/v1/expenses` - Get all expenses
- `GET /api/v1/expenses/{id}` - Get expense by ID
- `POST /api/v1/expenses` - Create new expense
- `PUT /api/v1/expenses/{id}` - Update expense
- `DELETE /api/v1/expenses/{id}` - Delete expense

### Reports
- `GET /api/v1/reports/daily` - Daily expense breakdown
- `GET /api/v1/reports/weekly` - Weekly expense breakdown
- `GET /api/v1/reports/monthly` - Monthly expense breakdown
- `GET /api/v1/reports/summary` - Category-wise summary

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
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
