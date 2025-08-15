# Stage 1: Build the React application
FROM node:18-alpine as build

WORKDIR /app

# Copy package.json and yarn.lock
COPY package.json yarn.lock ./n

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Build the React application
RUN yarn build

# Stage 2: Serve the React application with Nginx (or a simple static server)
FROM nginx:alpine

# Copy the build output from the build stage
COPY --from=build /app/build /usr/share/nginx/html

# Expose port 80
EXPOSE 80

# Start Nginx
CMD ["nginx", "-g", "daemon off;"]