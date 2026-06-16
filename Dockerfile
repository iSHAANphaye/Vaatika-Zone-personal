# Base image
FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy dependency files
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy application files
COPY . .

# Expose backend port
EXPOSE 5000

# Run command
CMD ["node", "src/index.js"]
