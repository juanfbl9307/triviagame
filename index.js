const express = require('express');
const app = express();

const dotenv = require('dotenv');
const routes = require('./routes');
const cors = require('cors');
dotenv.config();
const port = process.env.SERVER_PORT;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(port, () => {
    console.log(`Servidor corriendo en puerto ${port}`)
});