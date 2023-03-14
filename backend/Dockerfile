# Base image
FROM node:14-alpine

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
RUN npm run build

# Set the environment variables
ENV PORT=3000

# Expose the port
EXPOSE ${PORT}

# Start the app
CMD ["npm", "start"]
