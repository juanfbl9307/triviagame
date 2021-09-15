const Knex = require('knex')
const dotenv = require('dotenv').config();;


const databaseName = process.env.DB_NAME

const connection = {
    host: process.env.DB_HOST || 'localhost',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASSWORD || 'password'
}

async function main() {
    console.log("Starting migration")
    let knex = Knex({
        client: 'mysql',
        connection
    })

    await knex.raw('CREATE DATABASE IF NOT EXISTS ??', databaseName)

    knex = Knex({
        client: 'mysql',
        connection: {
            ...connection,
            database: databaseName,
        }
    })

    try {
        await knex.migrate.latest()
        console.log("Migration completed")
    } catch {
        console.log("Migration Error")

    }


}

main().catch(console.log).then(process.exit)