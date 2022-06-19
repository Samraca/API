const validarTipoEquipo = (req) => {
    
    const tipoEquipos = [];

    if (!req.body.nombre){
        tipoEquipos.push('Nombre es requerido');
    }

    if (!req.body.estado){
        tipoEquipos.push('Estado es requerido');
    }

    return tipoEquipos;
}

module.exports = {
    validarTipoEquipo,
}