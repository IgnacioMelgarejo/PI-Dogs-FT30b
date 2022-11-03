const { Dog, Temperament } = require("../db");// me traigo de db porque la relacion se encuentra en db 

// me voy a traer todos los perros que tengan como relacion el temperamento 
const infoDb = async () => {
    let dogsDb = await Dog.findAll();
    return dogsDb;
}

module.exports = { infoDb };   