Proyecto Seminario

Este es un proyecto utiliza Docker y Docker Compose para ejecutar una aplicación con un backend en NestJS, frontend en Angular y una base de datos MySQL.

Requisitos
- Descargar Docker Desktop
- Subsistema de linux (Se instalará durante la instalacion de docker desktop)

Pasos para ejecutar el proyecto

1. Clona el repositorio:

 git clone https://github.com/Augustoxtmh/seminario.git
 
 cd seminario/backend

2. Modifica el nombre del archivo .env.example => .env

3. docker-compose build
  
5. docker-compose up => Esperar hasta ver el mensaje en verde en la consola: Nest application successfully started
   
7. docker-compose exec nestjs-app sh -c "npx prisma migrate deploy"

8. cd ..
9. cd /frontend

10. docker build -t frontend-seminario .
11. docker run -p 4200:4200 frontend-seminario

Si todo salió bien, las siguientes rutas estarán disponibles:
http://localhost:8080/index.php -> permite gestionar las bases de datos.
Usuario: root Contraseña: root

http://localhost:3000/ -> es el backend, muestra un mensaje predeterminado.

http://localhost:4200/ -> es el frontend, tiene un botón para generar los datos de login solo para este caso, lo hice por problemas con los seeders que me cansé de intentar arreglar.

Este botón genera 2 usuarios -> Administrador y Usuario, las claves son: admin admin y usuario usuario.
Espero que funcione bien, en caso de que no sea asi:

Plan B denominado: "camino largo":

b1.  cd seminario/backend

b2.  npm i

b3.  Instalar xampp y habilitar los servicios de mysql y apache

b4.  npm run start

b5.  cd ..

b6.  cd /frontend

b7.  npm i

b8.  ng serve --open

Fin.
