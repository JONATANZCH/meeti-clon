const express = require('express');
const path  = require('path');
const router = require('./routes');

require('dotenv').config({path:'.env'});

const app = express();

// Habilitar template engine
app.set('view engine', 'ejs');

// Ubicación vistas 
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos 
app.use(express.static('public'));

// Routing
app.use('/', router());

// Agrega el puerto 
app.listen(process.env.PORT,()=>{
    console.log('Server running on port', process.env.PORT);
});
