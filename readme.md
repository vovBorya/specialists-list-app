# Specialists List App

A fullstack application that displays a list of specialists with infinite scrolling and filtering capabilities.

## Tech Stack

### Frontend
- **React 19** with TypeScript
- **Ionic React** - Cross-platform UI framework (supports iOS, Android, and Web)
- **Capacitor** - Native mobile runtime
- **Redux Toolkit** - State management
- **RTK Query** - API data fetching and caching
- **Vite** - Build tool

### Backend
- **NestJS** - Node.js framework with TypeScript
- **JSON-based database** - Simple file-based data storage

## Requirements

- **Node.js**: v22.x or higher (v22+ recommended for full Capacitor support)
- **npm**: v10.x or higher

## Project Structure

```
specialists-list-app/
├── backend/                  # NestJS backend application
│   ├── src/
│   │   ├── specialists/     # Specialists module with API endpoints
│   │   ├── app.module.ts
│   │   └── main.ts
│   └── data/
│       └── specialists.json # Database with 100 specialists
├── frontend/                 # Ionic React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Page components
│   │   ├── store/           # Redux store configuration
│   │   │   ├── api/         # RTK Query API definitions
│   │   │   └── slices/      # Redux slices
│   │   ├── types/           # TypeScript type definitions
│   │   └── styles/          # Global styles
│   └── public/
└── readme.md
```

## Getting Started

### 1. Install Dependencies

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Start the Backend

```bash
cd backend
npm run start:dev
```

The backend will start at `http://localhost:3000`

### 3. Start the Frontend

```bash
cd frontend
npm run dev
```

The frontend will start at `http://localhost:5173`

## API Endpoints

### GET /specialists

Fetches paginated list of specialists with optional filters.

**Query Parameters:**
| Parameter | Type   | Description                    |
|-----------|--------|--------------------------------|
| page      | number | Page number (default: 1)       |
| limit     | number | Items per page (default: 10)   |
| ageMin    | number | Minimum age filter             |
| ageMax    | number | Maximum age filter             |
| gender    | string | Gender filter ('man'/'woman')  |
| priceMin  | number | Minimum price filter           |
| priceMax  | number | Maximum price filter           |

**Response:**
```json
{
  "items": [...],
  "total": 100,
  "page": 1,
  "limit": 10,
  "totalPages": 10
}
```

## Features

### Specialists List Screen
- Display list of specialists with cards showing:
  - Avatar, Name, Country flag
  - Verified and Super Specialist badges
  - Session price and duration
  - Rating and number of reviews
  - Description (truncated)
  - Years of experience
  - Available time slots
- Infinite scroll loading (10 items per batch)
- Action bar with Filters, Sort, and Favorites buttons
- Loading and empty states

### Filters Screen
- Price per session range slider
- Gender selection (Man/Woman toggle)
- Age range slider
- Clear all / Apply buttons
- Shows count of matching results

## Available Scripts

### Backend

```bash
npm run start:dev    # Start development server with hot reload
npm run start        # Start production server
npm run build        # Build for production
npm run lint         # Run ESLint
npm run format       # Run Prettier
npm run test         # Run tests
```

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint
npm run lint:fix     # Run ESLint with auto-fix
npm run format       # Run Prettier
npm run format:check # Check formatting
npm run test.unit    # Run unit tests
npm run test.e2e     # Run E2E tests
```

## Mobile Development (Capacitor)

To run on mobile devices:

```bash
cd frontend

# Add platforms
npx cap add ios
npx cap add android

# Build and sync
npm run build
npx cap sync

# Open in native IDE
npx cap open ios     # Opens in Xcode
npx cap open android # Opens in Android Studio
```

## Environment Variables

Look at `.env.example` files in `backend` and `frontend` folders

## Linting and Formatting

Both projects use ESLint and Prettier for code quality:

```bash
# Backend
cd backend
npm run lint
npm run format

# Frontend
cd frontend
npm run lint
npm run format
```

## License

MIT
