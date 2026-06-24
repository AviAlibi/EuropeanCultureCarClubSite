# Basic Next.js Template

This project is a clean Next.js App Router starter with Docker support for:

- app (Next.js)
- db (PostgreSQL)

## Local Development

1. `npm install` - Install the dependencies needed for the app
2. `npm run db` - Create the database container
3. `npm run db:dev` - Migrates the schema, generates a prisma client, and then seeds the database with our dev-data
4. For the frontend, you can run it in two ways:
    1. `npm run dev` - Runs the frontend locally with hot-refresh
    2. `npm run app` - Runs the frontend within a docker container with no hot refresh

## Docker

Build and run the app + database:

```bash
docker compose up --build
```

App URL: http://localhost:3000
Postgres URL: postgresql://postgres:postgres@localhost:5432/appdb

## Scripts

`dev`
`build`
`start`
`app` - Used to run the frontend in some format

`lint`
`format`
`format:fix` - used to format the project

`db`
`db:generate`
`db:migrate-dev`
`db:seed`
`db:review`
`db:dev` - database operations

`test`
`coverage` - testing

`wipe:win` - wipes docker on windows
