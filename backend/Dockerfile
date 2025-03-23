# Usa la imagen de Node.js para la construcción
FROM node:20 AS build

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar solo package.json y package-lock.json para aprovechar la caché de Docker
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar el resto de los archivos del proyecto
COPY . .

# Generar Prisma Client
RUN npx prisma generate

# Construir la aplicación (opcional, si usas TypeScript)
RUN npm run build

# Exponer el puerto de la API
EXPOSE 3000

# Ejecutar Prisma Migrate si estás en producción
# RUN npx prisma migrate deploy

# Iniciar la aplicación en modo desarrollo
CMD ["npm", "run", "start:dev"]
