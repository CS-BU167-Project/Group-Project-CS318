:: Run with: .\start-app.bat
@echo off
echo Starting Personal Expense Manager...

:: Start Backend
echo Starting Backend (Spring Boot)...
start "Backend - Expense Manager API" cmd /k "cd backend\expense-manager-api && gradlew.bat bootRun"

:: Wait a bit for backend to initialize (optional, but helpful)
timeout /t 5

:: Start Frontend
echo Starting Frontend (Vite)...
start "Frontend - Expense Manager UI" cmd /k "cd frontend && bun dev"

echo Application started!
echo Backend: http://localhost:8080
echo Frontend: http://localhost:5173
pause

