const validarEstadoEquipo = (req) => {
    
    const estadoEquipos = [];

    if (!req.body.nombre){
        estadoEquipos.push('Nombre es requerido');
    }

    if (!req.body.estado){
        estadoEquipos.push('Estado es requerido');
    }

    return estadoEquipos;
}

module.exports = {
    validarEstadoEquipo,
}