Proyecto Seminario

Este es un proyecto que utiliza Node.js para ejecutar una aplicación con un backend en NestJS, frontend en Angular y una base de datos MySQL.

Requisitos
- Descargar Node.js -> https://nodejs.org/es/download
- Descargar Xampp -> https://www.apachefriends.org/download.html

1. Clona el repositorio:

 git clone https://github.com/Augustoxtmh/seminario.git
 
 cd seminario/backend

2. Modifica el nombre del archivo .env.example => .env

3.  Instalar Node: 

Una vez instalado reiniciamos la pc, tras eso entramos al proyecto seminario en VSC y en una terminal ejecutamos:

1.  cd seminario/backend

2.  npm i

3.  Instalar xampp y habilitar los servicios de mysql y apache

5.  Entramos a esta ruta en cualquier navegador -> http://localhost/phpmyadmin/index.php?route=/

usuario: root contraseña: root
en caso de no ser asi probar sin contraseña

6.  Creamos una base de datos nueva llamada: servicio_grua

Regresamos a la terminal de VSC.

7.  npx prisma generate

8.  npx prisma migrate dev --name inicio

9.  npx prisma migrate deploy

10.  npm run start

Abrimos otra terminal:

1.  cd ..

2.  cd /frontend

3.  npm i

4.  npm i @angular/cli

5.  ng serve --open

Este botón genera 2 usuarios -> Administrador y Usuario, las claves son: admin admin y usuario usuario.
Espero que funcione bien, Fin.

