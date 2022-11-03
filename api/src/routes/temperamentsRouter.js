const { getAllTemperaments } = require("../controllers/getTemperaments");
const { Router } = require("express");
const temperamentsRouter = Router();
const { Temperament } = require("../db");

temperamentsRouter.get("/", async (req, res) => {
    try {
        let temperaments = await Temperament.findAll();
        if (temperaments.length === 0) await getAllTemperaments()
        console.log(temperaments);
        res.status(200).send(temperaments);
    } catch (error) {
        res.status(404).send(error)
    }
});

module.exports = temperamentsRouter;