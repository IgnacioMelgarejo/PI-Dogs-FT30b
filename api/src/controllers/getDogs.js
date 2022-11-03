const axios = require("axios");
const MY_APPI_KEY = "live_HpOXHTLKe6MYxF2Vogc2sMk8U0ZcUR0d5PiiYAqItQdNVJKwyttzLdB9VAAOC3kx"
const urlDogs = `https://api.thedogapi.com/v1/breeds/?api_key=${MY_APPI_KEY}`;
const { infoDb } = require("../controllers/getDogsDB");
const { Dog} = require("../db")

//siempre que tengo axios, la informacion que busco va a estar en la respuesta.data 
const getAllDogs = async () => {
    let dataDb = await infoDb();
    let infoApi = await axios(urlDogs)//primero hacemos la peticion y la guardamos en un var
    let getDogs = []
    infoApi.data.map(el => {
        getDogs.push({
            id: el.id,
            name: el.name,
            weight: el.weight.imperial,
            height: el.height.imperial,
            life: el.life_span,
        });
    });
    return [...getDogs, ...dataDb];
};


const getDogsByName = async (name) => {
    let result = await getAllDogs()
    const resultDogName = result.filter(
        e => e.name.toLowerCase().includes(name.toLowerCase()))
    return resultDogName;
}


const getById = async (id) => {
    let allDogs = await getAllDogs();
    const regex = /([a-zA-Z]+([0-9]+[a-zA-Z]+)+)/
    if (regex.test(id)) {
        let dogDb = await Dog.findAll({
            where: {
                id: id
            }
        });
        return dogDb
    }
    let dogId = allDogs.find((e) => e.id === parseInt(id));
    return dogId;
}

// const repeatedDog = async (name, image, height, weight, life_span)=>{
//  const yaEsta = Dog.findAll({
//     name: name,
//      image: image,
//      height:height,
//      weight:weight, 
//      life_span:life_span
//  })
// }

module.exports = {
    getAllDogs,
    getDogsByName,
    getById

};