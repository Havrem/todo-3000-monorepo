#1. Spin up container from node image from docker hub, inside it build app.
#2. Spin up new container from nginx image, copy static app content into it for serving.
#Node 22 is lts, taking second latest linux distro for least amount of suprises.
FROM node:22-alpine3.21 AS build
WORKDIR /app
COPY package*.json ./
#npm ci instead of npm install as the latter can install dependencies that have a different version then the one specified in the json file.

ARG VITE_API_URL
ENV VITE_API_URL=${VITE_API_URL}

RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM nginx:1.27.5-alpine3.21
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]