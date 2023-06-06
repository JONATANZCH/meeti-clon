const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const path  = require('path');
const bodyParser = require('body-parser');
const flash = require('connect-flash');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const router = require('./routes');

// Configuración y Modelos de la BD
const db = require('./config/db');
require('./models/Usuarios');
db.sync()
    .then(()=> console.log('Conectado a la base de datos'))
    .catch(error => console.log(error));

// Variables de Desarrollo
require('dotenv').config({path:'.env'});

// Aplicación Principal /* Initializations */
const app = express();

// Body parser, leer forms
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// Habilitar template engine
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Ubicación vistas 
app.set('views', path.join(__dirname, './views'));

// Archivos estaticos 
app.use(express.static('public'));

// Habilitar cookie parser
app.use(cookieParser());

// Crear la session
app.use(session({
    secret: process.env.SECRETO,
    key: process.env.KEY,
    resave: false,
    saveUninitialized: false
}));

// Agrega flash messages
app.use(flash());

// Middleware (usuario logeado, flash messages, fecha actual)
app.use((req, res, next) => {
    res.locals.usuario = {...req.user} || null;
    res.locals.mensajes = req.flash();
    const fecha = new Date();
    res.locals.year = fecha.getFullYear();
    next();
});

// Routing
app.use('/', router());

// Agrega el puerto 
app.listen(process.env.PORT,()=>{
    console.log('Server running on port', process.env.PORT);
});
