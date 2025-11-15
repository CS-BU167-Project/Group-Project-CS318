# Expense Manager Frontend

React + TypeScript + Vite application for personal expense tracking.

## Setup

```bash
npm install
npm run dev
```

## Backend Integration

The frontend communicates with the Spring Boot backend at `http://localhost:8080/api/v1`.

### API Endpoints

**Authentication:**
- `POST /auth/signup` - Register new user
- `POST /auth/signin` - Login user

**Expenses:**
- `GET /expenses` - Get all expenses
- `GET /expenses/{id}` - Get expense by ID
- `POST /expenses` - Create new expense
- `PUT /expenses/{id}` - Update expense
- `DELETE /expenses/{id}` - Delete expense

**Reports:**
- `GET /reports/daily?userId={userId}` - Daily report
- `GET /reports/weekly?userId={userId}` - Weekly report
- `GET /reports/monthly?userId={userId}` - Monthly report
- `GET /reports/summary?userId={userId}` - Category summary

## Project Structure

- `src/api.ts` - Axios API client with all backend endpoints
- `src/App.tsx` - Main app component
- `src/Dashboard.tsx` - Main dashboard component
- `src/Login.tsx` - Login page
- `src/Register.tsx` - Registration page
- `src/Landing.tsx` - Landing page

## Build

```bash
npm run build
```

## Technology Stack

- React 18+
- TypeScript
- Vite
- Axios (HTTP client)
- ESLint
