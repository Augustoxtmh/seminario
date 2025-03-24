FROM node:20-alpine
## A Docker working directory for Nest
WORKDIR /usr/src/app
# dependencies files
COPY package*.json ./
# Install the packages
RUN npm install
# Copy all the Nestjs code to Docker
COPY . .
## The command ro run Nest.js on Docker

# Definir la variable de entorno DATABASE_URL
ENV DATABASE_URL="mysql://root:root@mysql-db:3306/servicio_grua"


# Generar Prisma Client

RUN npx prisma migrate
RUN npx prisma generate

# Construir la aplicación (opcional, si usas TypeScript)
RUN npm run build

# Exponer el puerto de la API
EXPOSE 3000

# Ejecutar Prisma Migrate si estás en producción
# RUN npx prisma migrate deploy

# Iniciar la aplicación en modo desarrollo
CMD [ "npm", "run", "start:dev" ]