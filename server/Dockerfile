# Build stage
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .

# Production stage
FROM node:18-alpine

WORKDIR /app

COPY --from=build /app/package*.json ./
RUN npm ci --only=production

COPY --from=build /app ./

# Créer le dossier uploads s'il n'existe pas
RUN mkdir -p uploads

EXPOSE 5000

CMD ["npm", "start"] 