# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY frontend/package*.json ./frontend/

# Install both backend and frontend dependencies
RUN npm install
RUN npm install --prefix frontend

# Copy all application files
COPY . .

# Build the React frontend into frontend/dist
RUN npm run build --prefix frontend

# Expose backend port
EXPOSE 5000

# Run command
CMD ["node", "src/index.js"]
