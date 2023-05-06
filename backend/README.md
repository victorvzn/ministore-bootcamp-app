# Ministore-backend

> **NOTE:** El uso de docker es opcional, se usa solo para tener una instancia de postgres y trabajar localmente.
> **NOTE:** Duplicar y renombrar el archivo `.env.example` a `.env`

### ¿Como levantar el proyecto?

```
npm install

npm run dev
```

Luego visite: http://localhost:5000

### ¿Cómo levantar postgres?

```
docker-compose up -d postgres

docker-compose ps

docker-compose down -> Para detener los servicios de docker

docker-compose exec postgres bash -> Para conectarnos al contenedor por terminal

/# psql -h localhost -d ministoredb -U ministore
=# \d
=# \q
```

### ¿Como levantar pgadmin?

```
docker-compose up -d pgadmin

docker-compose ps
```

Luego visite: http://localhost:5050

### ¿Cómo usar prisma?

```
npm run prisma:migrate  -> Ejecuta las migraciones
npm run prisma:seed     -> Añade data inicial en la base de datos
```


### Configuración de Prisma

```
npm i -DE prisma

npx prisma init --datasource-provider postgresql

npx prisma migrate dev
```

### Como resetear la base de datos

> **NOTE:** Limpia los datos sin opción a recuperarlos y vuelve a ejecutar los seeders

```
npm run prisma:reset
```

### Borrar la base de datos y volver a ejecutar las migraciones

```
docker-compose exec postgres bash

/# psql -h localhost -d postgres -U ministore
postgres=# DROP DATABASE ministoredb; CREATE DATABASE ministoredb;
postgres=# \q
/# exit

npx prisma migrate dev --name init_schema
npm run prisma:reset
```

### Configuración en render

* Para configurar en render debemos añadir lo siguiente en settings:

```
Root directory: backend
Build Command: npm install; npm run prisma:generate; npm run prisma:migrate; npm run prisma:seed --force
Start Command: npm start
```

* Luego hay que crear las variables de entorno que se encuentran en el archivo .env
### LINKS

* https://www.mikealche.com/software-development/how-to-create-a-multi-tenant-application-with-next-js-and-prisma
* https://blog.tericcabrel.com/many-to-many-relationship-prisma/
* https://jwt.io/
* https://www.brandcrowd.com/