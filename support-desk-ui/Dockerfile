# Build stage: compile the React app with Node
FROM node:24-alpine AS build

WORKDIR /app

# Copy package metadata first so this dependency layer is cached separately
# from source changes - only re-runs when package.json/package-lock.json change.
COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

# Runtime stage: serve the built static files with Nginx (no Node needed here)
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 80

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget -q -O - http://127.0.0.1/ || exit 1

CMD ["nginx", "-g", "daemon off;"]