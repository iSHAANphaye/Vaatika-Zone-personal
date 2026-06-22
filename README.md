# Vaatika Zone

Vaatika Zone is a premium online e-commerce platform designed for direct farm-to-home delivery of fresh fruits and organic vegetables in Chhattisgarh (serving Raipur, Bhilai, and Durg). By sourcing directly from local agricultural cooperatives, the platform ensures that produce is delivered to consumers within 24 hours of harvest, providing fair wages directly to farmers.

---

## 🚀 Key Features

*   **Fresh Local Inventory**: Dynamically generated catalog of regional fruits and vegetables.
*   **Search, Filter & Sort**: Fast and responsive search index combined with category filtering and sorting by price or date.
*   **User Accounts & Secure Authentication**: Fully-featured customer and administrator flows secured with JWT (JSON Web Tokens) and bcrypt password hashing.
*   **Interactive Shopping Cart & Checkout**: Interactive client state management matching atomic stock level checks on the backend database.
*   **Query Performance Optimization**: Pre-configured compound indexes and text search indexes with a built-in profiling script to evaluate database query efficiency.
*   **Docker Containerization**: Simple containerized setup using Docker and Docker Compose.

---

## 🛠️ Tech Stack

### Frontend (Client)
*   **React** (Vite build system)
*   **Tailwind CSS** (Premium UI styling)
*   **Lucide React** (Clean, modern iconography)

### Backend (Server)
*   **Node.js & Express** (REST API)
*   **MongoDB & Mongoose** (Database and object data modeling)
*   **JWT & bcryptjs** (Authentication and security)
*   **Concurrently** (Developer tool to run client & server together)

---

## ⚙️ Project Structure

```
Vaatika-Zone-personal/
├── frontend/               # React client application
│   ├── public/             # Static public assets (Favicon, Logo)
│   ├── src/                # React source code (components, pages, context)
│   └── package.json        # Frontend dependencies
├── src/                    # Node.js backend application
│   ├── config/             # Database connection setup
│   ├── controllers/        # REST API route handlers
│   ├── middleware/         # Security and authentication middleware
│   ├── models/             # Mongoose database schemas
│   ├── routes/             # Express routes definitions
│   ├── seedDb.js           # Database seeding script (1,000+ products)
│   ├── testApi.js          # REST API integration tests
│   └── testDb.js           # Database schema unit verification tests
├── package.json            # Backend & root orchestrator scripts
└── docker-compose.yml      # Container orchestration
```

---

## 💻 Getting Started

### Prerequisites
*   [Node.js](https://nodejs.org/) (v16+)
*   [MongoDB](https://www.mongodb.com/) running locally or a MongoDB Atlas URI

### Installation

1. Clone the repository and navigate to the directory:
   ```bash
   cd Vaatika-Zone-personal
   ```

2. Install dependencies for the backend and frontend:
   ```bash
   npm run build
   ```
   *(This helper script runs `npm install` at the root and triggers frontend installation & compilation)*

3. Configure Environment Variables:
   Create a `.env` file in the root directory (you can copy `.env.example` as a starting point):
   ```bash
   PORT=5000
   MONGO_URI=mongodb://127.0.0.1:27017/vaatika-zone-db
   JWT_SECRET=your_super_secret_jwt_key
   ```

---

## 🏃 Running the Application

### 1. Seed the Database
To populate the database with mock customers, dynamic products (1,000+ combinations), and initial orders, run:
```bash
npm run seed
```

### 2. Start Development Server
Launch the backend server and frontend client concurrently:
```bash
npm run dev
```
*   **Frontend Client**: [http://localhost:3000](http://localhost:3000)
*   **Backend Server**: [http://localhost:5000](http://localhost:5000)

### 3. Run Performance Profiling
Analyze query plans and compare indexed vs. unindexed search efficiency:
```bash
npm run profile
```

### 4. Run Integration Tests
Execute integration tests to verify database constraints, authentication guards, and checkout atomic stock checks:
```bash
npm run test
```
