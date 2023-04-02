# Base image
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app
COPY . .

# Build the app
ARG VITE_APP_BASE_URL
ARG VITE_APP_TENOR_API_KEY
RUN VITE_APP_BASE_URL=${VITE_APP_BASE_URL} VITE_APP_TENOR_API_KEY=${VITE_APP_TENOR_API_KEY} npm run build

# Serve the app with a web server
FROM nginx:stable-alpine AS prod
COPY --from=0 /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]