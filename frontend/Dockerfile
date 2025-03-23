# Etapa de construcción
FROM node:20 AS build

WORKDIR /app

# Copiar package.json y package-lock.json (si existe)
COPY package*.json ./

RUN npm install

# Copiar todo el código del frontend
COPY . ./

# Construir Angular
RUN npm run build --configuration=production

# Etapa de despliegue con Nginx
FROM nginx:alpine

# Copiar los archivos generados de Angular al servidor de Nginx
COPY --from=build /app/dist/proyecto-seminario /usr/share/nginx/html

# Exponer el puerto 80
EXPOSE 80

# Iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
