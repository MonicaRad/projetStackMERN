# projetStackMERN - AI Coding Instructions

## Architecture Overview

This is a **MERN stack** project (MongoDB, Express, React, Node.js) with a **3-layer service architecture**:

- **Controller** (`src/controller/`) - HTTP request handlers
- **Service** (`src/service/`) - Business logic and orchestration  
- **Repository** (`src/repository/`) - Data access layer (Mongoose queries)
- **Model** (`src/model/`) - MongoDB schemas

**Request flow:** Route → Controller → Service → Repository → MongoDB

## Project Structure & Conventions

### Data Models
Three core entities: `Movie`, `Order`, `User` in `src/model/`.
- Each has a corresponding Service, Repository, Controller, and Routes
- Models define Mongoose schemas with validation
- Use Mongoose plugins for timestamps, soft deletes, etc.

### Services & Repositories
- **Service**: Contains business logic, validation, and calls repositories. Should NOT directly touch the database.
- **Repository**: Data access layer. Encapsulates all Mongoose queries and database operations.
- Keep repositories focused on CRUD and simple queries; move complex logic to services.

### API Response Format
Use `src/utils/apiResponse.js` for standardized API responses across all endpoints.
- All controllers should return consistent response structures
- Pattern: `{ success: boolean, data: any, message: string, statusCode: number }`

### Environment Configuration
- Uses `dotenv` (Node v17.3.1+) for environment variables
- MongoDB credentials via `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_INIT_DB`
- DB connection in `src/config/database.js` - initialize at app startup
- Express CORS enabled for frontend communication

## Development Workflow

### Running the Project
```bash
npm install  # Install dependencies (Express 5.2.1, Mongoose 9.2.1, CORS)
docker-compose up  # Start MongoDB (port 27017) and Mongo Express (port 8081)
npm start  # Start Node.js server (server entry point: src/app.js)
```

### Docker Services
- **MongoDB**: Container `mongodb`, persists in `/data/db`
- **Mongo Express**: Admin UI at `localhost:8081` for visual DB inspection
- Requires `.env` with `MONGO_USER`, `MONGO_PASSWORD`, `MONGO_INIT_DB`
- Dataset import: CSV files in `dataset/` auto-loaded via volume mount

### Common Tasks
- **Add new entity**: Create Model, Repository, Service, Controller, Routes following existing Movie/Order/User pattern
- **Add endpoint**: Implement in Controller, add to Routes (`src/route/`), business logic in Service
- **Query data**: Use Repository methods, never raw Mongoose in Controller/Service
- **Test locally**: Use Mongo Express at localhost:8081 to verify data changes

## Key Dependencies
- **express** (5.2.1) - HTTP server & routing
- **mongoose** (9.2.1) - MongoDB ODM with schema validation
- **cors** (2.8.6) - Cross-origin requests for React frontend
- **dotenv** (17.3.1) - Environment variable management

## Notes for AI Agents
- Many files are currently empty templates; implement following existing patterns
- Repository pattern prevents tight DB coupling; maintain this separation
- Each feature module (Movie/Order/User) is self-contained; reuse the pattern
- All endpoints should validate input in Service layer before DB operations
- MongoDB connection string should be constructed from MONGO_USER and database name in docker-compose
