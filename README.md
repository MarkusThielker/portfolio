# Portfolio

This repository contains the source code of my portfolio/blog which is currently under active development.

# Getting started

1. Start the PostgreSQL database. It will be the backbone of our application and locally available on port 5432. The
   setup is provided using docker. The credentials can be found in the docker-compose.yaml file.
   ```shell
   docker compose -f docker/portfolio-dev/docker-compose.yaml up -d
   ```

2. Install the npm dependencies:
   ```shell
   npm install
   ```

3. After installing the dependencies, you need to apply the database migrations and generate the prisma client.
   The initial migrations set up the database scheme for the Lucia authentication. Prisma then generates the client
   based on the database model to provide typed access to the database.
   ```shell
   npx prisma migrate deploy # apply the database migrations 
   npx prisma generate # generate the prisma client
   ```

4. Finally, start the development server:
   ```shell
   npm run dev
   ```

Now open [localhost:3000](http://localhost:3000) and start editing!
