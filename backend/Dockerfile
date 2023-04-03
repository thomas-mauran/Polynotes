# Base image
FROM node:19-alpine as prod

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY . .

# Install dependencies
RUN npm install 
# && npm run build

# Expose the port
EXPOSE 3000

# Start the app
CMD ["npm", "run", "start"]
