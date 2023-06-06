const Usuarios = require('../models/Usuarios');

exports.formCrearCuenta = (req, res) => {
    res.render('crear-cuenta', {
        nombrePagina: 'Crear Cuenta'
    });
};

exports.crearNuevaCuenta = async (req, res) => {
    const usuario = req.body;

    try {
        const nuevoUsuario = await Usuarios.create(usuario);

        // TODO : Flash Message y redireccionar
        console.log('Usuario creado', nuevoUsuario)
    } catch (error) {
        const erroresSequelize = error.errors.map(error => error.message);
        // console.log(erroresSequelize);

        req.flash('error', erroresSequelize);
        res.redirect('/crear-cuenta');
    }
    
};