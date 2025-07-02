# Etapa 1: Compilar la app Angular
FROM node:18 AS build

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build --prod

# Reemplaza 'mi-app' por el nombre real de tu proyecto dentro de dist/
FROM nginx:alpine

COPY --from=build /app/dist/frontend /usr/share/nginx/html

# (opcional) Configuración personalizada de Nginx
# COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]