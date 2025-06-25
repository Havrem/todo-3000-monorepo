# Build stage
FROM node:22-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm ci
COPY . .
RUN npm run build

# Final stage
FROM nginx:1.27.5-alpine3.21
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#Temp comment