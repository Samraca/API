const validarUsuario = (req) => {
    
    const usuarios = [];

    if (!req.body.nombre){
        usuarios.push('Nombre es requerido');
    }

    if (!req.body.email){
        usuarios.push('Email es requerido');
    }

    if (!req.body.estado){
        usuarios.push('Estado es requerido');
    }

    return usuarios;
}

module.exports = {
    validarUsuario,
}