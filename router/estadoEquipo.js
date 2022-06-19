const {Router} = require('express');
const EstadoEquipo = require('../models/EstadoEquipo');
const {validarEstadoEquipo} = require('../helpers/validar-estadoEquipo');
const router = Router();

router.get('/', async function(req, res){
    try{
        const estadoEquipos = await EstadoEquipo.find();
        res.send(estadoEquipos);
    }catch(error){
        res.status(500).send('Ha ocurrido un error');
    }
});

router.post('/', async function(req, res){
    try{
        const estadoEquipos  = validarEstadoEquipo(req);

        if(estadoEquipos.length > 0){
            return res.status(400).send(estadoEquipos);
        }

        let estadoEquipo = new EstadoEquipo();
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaCreacion = new Date();
        estadoEquipo.fechaActualizacion = new Date();
    
        estadoEquipo = await estadoEquipo.save();
    
        res.send(estadoEquipo);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ups, algo salio mal');
    }
});

router.put('/:estadoEquipoId', async function(req, res){
    try {
        const estadoEquipos  = validarEstadoEquipo(req);

        if(estadoEquipos.length > 0){
            return res.status(400).send(estadoEquipos);
        }

        let estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.status(400).send('El estado de equipo no existe');
        }
        
        estadoEquipo.nombre = req.body.nombre;
        estadoEquipo.estado = req.body.estado;
        estadoEquipo.fechaActualizacion = new Date();

        estadoEquipo = await estadoEquipo.save();

        res.send(estadoEquipo);

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar el estado de Equipo');
    }
});

router.get('/:estadoEquipoId', async function (req, res) {
    try {
        const estadoEquipo = await EstadoEquipo.findById(req.params.estadoEquipoId);
        if(!estadoEquipo){
            return res.status(404).send('Estado de equipo no existe');
        }
        res.send(estadoEquipo);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar el estado de equipo')
    }
});

module.exports = router;