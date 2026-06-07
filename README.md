# Vera

Vera is a web application with a Ruby on Rails backend API and a React frontend stylized with Shadcn UI components. Both codebases live within this single repository.

---

## Architecture & Security

* **Monorepo Structure:** The backend API and frontend client are housed together for simplified development.
* **Full-Stack Protection:** Every route is protected on both the frontend and backend.
* **Authentication & Authorization:** Users must be authenticated to access the application. Strict authorization rules ensure users can only view and interact with their own projects and data.

---

## Prerequisites

Ensure you have the following installed on your system:
* Ruby (defined in the backend Gemfile)
* Node.js and npm

The default database is SQLite3. PostgreSQL is configurable.

---

## Quick Start Setup

Follow these steps to get the entire application running locally with pre-configured seeded data.

### 1. Backend Setup
Navigate to the backend directory and run the following:

```bash
cd backend
bin/setup
bin/rails server
```

### 2. Frontend Setup
Navigate to the frontend directory and run the following:

```bash
cd frontend
npm install
npm run dev
```

---

## Local Testing & Login

The database seeder auotmatically creates dummy accounts so you can explore the app immediately.

```json
"email": "test@example.com"
"password": "password123"
```

---