import express, { Express } from 'express';
import { Pool } from 'pg'
import { router } from './router';
import cors from 'cors';
import bodyParser = require('body-parser');
require("dotenv").config()


export const pool: Pool = new Pool({
    host: process.env.HOST_DB,
    port: Number(process.env.PORT_DB),
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE,
})

const app: Express = express()

const corsOption = {
    origin: [
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "http://192.168.30.199:5173",
        "http://192.168.30.104"
    ]
}

app.use(cors(corsOption)) // cors adalah middleware yang menyediakan pengaturan untuk mengizinkan atau menolak permintaan dari domain yang berbeda.

app.use(bodyParser.json()) // bodyParser.json() memungkinkan aplikasi untuk mengurai body permintaan yang dikirim sebagai JSON dan membuatnya tersedia di objek req.body

app.use(bodyParser.urlencoded({ extended: true }))

app.use("/", router)

app.listen(Number(process.env.PORT), () => {
    console.log(`Server running on port ${process.env.PORT}`)
})
