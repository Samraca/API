const {Router} = require('express');
const Marca = require('../models/Marca');
const {validarMarcas} = require('../helpers/validar-marcas');
const router = Router();

router.get('/', async function(req, res){
    try{
        const marcas = await Marca.find();
        res.send(marcas);
    }catch(error){
        res.status(500).send('Ha ocurrido un error');
    }
});

router.post('/', async function(req, res){
    try{
        const marcas  = validarMarcas(req);

        if(marcas.length > 0){
            return res.status(400).send(marcas);
        }
        
        let marca = new Marca();
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaCreacion = new Date();
        marca.fechaActualizacion = new Date();
    
        marca = await marca.save();
    
        res.send(marca);
        
    }catch(error){
        console.log(error);
        res.status(500).send('Ups, algo salio mal');
    }
});

router.put('/:marcaId', async function(req, res){
    try {
        const marcas  = validarMarcas(req);

        if(marcas.length > 0){
            return res.status(400).send(marcas);
        }
        
        let marca = await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(400).send('Marca no existe');
        }
        
        marca.nombre = req.body.nombre;
        marca.estado = req.body.estado;
        marca.fechaActualizacion = new Date();

        marca = await marca.save();

        res.send(marca);

    }catch (error){
        console.log(error);
        res.status(500).send('Ocurrio un error al actualizar la marca');
    }
});

router.get('/:marcaId', async function (req, res) {
    try {
        const marca = await Marca.findById(req.params.marcaId);
        if(!marca){
            return res.status(404).send('Marca no existe');
        }
        res.send(marca);
    } catch (error) {
        console.log(error);
        res.status(500).send('Ocurrio un error al consultar la marca')
    }
});

module.exports = router;