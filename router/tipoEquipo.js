const {Router} = require('express');
const TipoEquipo = require('../models/TipoEquipo');
const {validarTipoEquipo} = require('../helpers/validar-tipoEquipo');
const router = Router();

router.get('/', async function(req, res){
    try{
        const tipoEquipos = await TipoEquipo.find();
        res.send(tipoEquipos);
    }catch(error){
        res.status(500).send('Ha ocurrido un error');
    }
});

router.post('/', async function(req, res){
    try{
        const tipoEquipos  = validarTipoEquipo(req);

        if(tipoEquipos.length > 0){
            return res.status(400).send(tipoEquipos);
        }

        let tipoEquipo = new TipoEquipo();
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaCreacion = new Date();
        tipoEquipo.fechaActualizacion = new Date();
    
        tipoEquipo = await tipoEquipo.save();
    
        res.send(tipoEquipo);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ups, algo salio mal');
    }
});

router.put('/:tipoEquipoId', async function(req, res){
    try {
        const tipoEquipos  = validarTipoEquipo(req);

        if(tipoEquipos.length > 0){
            return res.status(400).send(tipoEquipos);
        }
        
        let tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(400).send('Tipo de equipo no existe');
        }
        
        tipoEquipo.nombre = req.body.nombre;
        tipoEquipo.estado = req.body.estado;
        tipoEquipo.fechaActualizacion = new Date();

        tipoEquipo = await tipoEquipo.save();

        res.send(tipoEquipo);

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el tipo de Equipo');
    }
});

router.get('/:tipoEquipoId', async function (req, res) {
    try {
        const tipoEquipo = await TipoEquipo.findById(req.params.tipoEquipoId);
        if(!tipoEquipo){
            return res.status(404).send('Tipo de equipo no existe');
        }
        res.send(tipoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el tipo de equipo')
    }
});

module.exports = router;