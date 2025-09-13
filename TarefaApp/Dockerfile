# build da aplicação
FROM node:20 AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build --prod

#debug
RUN ls -la dist

# servidor web
FROM nginx:alpine
COPY --from=build /app/dist/TarefaApp/browser /usr/share/nginx/html

EXPOSE 80