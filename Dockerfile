# Build Stage
FROM node:20-alpine as BUILD_IMAGE
WORKDIR /app/react-app

COPY package.json .

RUN npm install 

COPY . .

RUN npm run build

# Production Stage
FROM node:20-alpine as PRODUCTION_IMAGE
WORKDIR /app/react-app

COPY --from=BUILD_IMAGE /app/react-app/ /app/react-app/
EXPOSE 8080

# Enable preview 
COPY package.json .
COPY vite.config.js .

EXPOSE 8080
CMD ["npm", "run", "dev"]