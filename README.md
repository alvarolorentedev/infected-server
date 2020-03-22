# Infected

#Migrations

for remote migrations of the database run

```sh
DATABASE_URL="$(heroku config:get DATABASE_URL -a infecteed)?ssl=true" npm run migrate:remote:up
```