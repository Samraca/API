const mongoose = require('mongoose');

const getConnection = async () => {
    try{
        const url = 'mongodb://samraca:bRQTQEiGMReOodXg@cluster0-shard-00-00.31il8.mongodb.net:27017,cluster0-shard-00-01.31il8.mongodb.net:27017,cluster0-shard-00-02.31il8.mongodb.net:27017/inventarios-iw2?ssl=true&replicaSet=atlas-tru3fv-shard-0&authSource=admin&retryWrites=true&w=majority';
    
        await mongoose.connect(url);
    
        console.log('Conexión Exitosa');
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getConnection,
}