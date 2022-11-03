const { getAllDogs, getDogsByName, getById} = require("../controllers/getDogs");
const { Router } = require("express");
const { Dog, Temperament } = require("../db")
const dogsRouter = Router();

dogsRouter.get("/", async (req, res) => {
    try {
        const { name } = req.query;
        let getInfo = await getAllDogs();
        if (name) {
            let resultDogName = await getDogsByName(name);
            resultDogName.length ? res.status(200).send(resultDogName) :
                res.status(404).send({ error: "Dog not found" })
        } else {
            res.status(200).send(getInfo);
        }


    } catch (error) {
        res.status(404).send({ error: error.message })
    }

});

//https://www.w3schools.com/css/ link que me paso cinthia para stilos de css

dogsRouter.post("/", async (req, res) => {
    const { name, image, height, weight, life_span, temperament } = req.body;
    try {
        if (!name || !weight || !temperament) return res.status(400).send({ message: "information required" });
       
        const newDog = await Dog.create({ name, image, height, life_span, weight });

        let temperamentDb = await Temperament.findAll({
            where: {
                name: temperament
            }
        });

        await newDog.addTemperament(temperamentDb)

        res.status(200).send(newDog)

    } catch (error) {
        res.status(404).send({ error: error.message })
    }
});


dogsRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        let getDogId = await getById(id)
        return res.status(200).send(getDogId)
    } catch (error) {
        return res.status(404).send({ error: error.message })
    }
});


module.exports = dogsRouter;