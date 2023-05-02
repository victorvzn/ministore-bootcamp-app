# Ministore-backend

| **Note:** El uso de docker es opcional, se usa solo para tener una instancia de postgres y trabajar localmente.

### ¿Como levantar el proyecto?

```
npm install

npm run dev
```

### ¿Como levantar postgres?

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

Luego de levantar pgadmin visite http://localhost:5050

### ¿Cómo usar prisma?

```
npm run prisma:migrate  -> Ejecuta las migraciones
npm run prisma:seed     -> Añade data inicial en la base de datos
```

## Configuration

### Prisma

```
npm i -DE prisma

npx prisma init --datasource-provider postgresql

npx prisma migrate dev
```