const axios = require("axios");
const key = "live_HpOXHTLKe6MYxF2Vogc2sMk8U0ZcUR0d5PiiYAqItQdNVJKwyttzLdB9VAAOC3kx"
const urlTemperaments = `https://api.thedogapi.com/v1/breeds/?api_key=${key}`;
const { Temperament } = require("../db");


const getAllTemperaments = async () => {
    let temperamentsApi = await axios(urlTemperaments);
    let temperamentsContent = []

    temperamentsApi.data.forEach(e => temperamentsContent.push(e.temperament));

    let separator = temperamentsContent.join(",").split(",");
    console.log(separator)
    let allTemperaments = separator.reduce((a, e) => {
        if (!a.find(d => d === e)) {
            a.push(e)
        }
        return a
    }, []);

    allTemperaments.map(async (d) =>{
        await Temperament.create({name:d});
      });


}


module.exports = {getAllTemperaments} ;