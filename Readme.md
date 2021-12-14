# Gestor de sedes y alumnos

## Features

1- CRUD para tablas de alumnos y sede.
2- un menu que las llame de una pagina html5.
3- El backend debe estar en Node Js.
4- El listar de alumnos debe permitir filtrar por sede.
5- No se debe permitir borrar una sede si tiene Alumnos.
6- El formulario de Alumnos debe contener un dropcompo para seleccionar la sede.
7- Listar los alumnos por sede para imprimirlos.
8- La foto del alumno queda almacenada en el server y db.
10- cuando se lista los registros de la tabla sede, muestrar una columna con la cantidad de alumnos.

## Installation

El proyecto requiere [Node.js](https://nodejs.org/) v12+ para correr.

Instalar dependencias y correr el proyecto.

```sh
cd crud-alumnos-entrevista
cp .env.example .env
npm i
npm start
```

debe correr el script database/db.sql que construye la base de datos segun las indicaciones y remplazar las variables en el archivo .env que permitan conectar a la db.
