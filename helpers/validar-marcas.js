const validarMarcas = (req) => {
    
    const marcas = [];

    if (!req.body.nombre){
        marcas.push('Nombre es requerido');
    }

    if (!req.body.estado){
        marcas.push('Estado es requerido');
    }

    return marcas;
}

module.exports = {
    validarMarcas,
}