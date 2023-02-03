import "./components.css/CreateDog.css"
import React from "react";
import { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { postDogs, getTemperaments } from "../actions";

function validate(input) {
    let errors = {}
    if (!input.name) {
        errors.name = "Se requiere un nombre";
    } else if (!input.min_weight) {
        errors.min_weight = "Min weight is required";
    } else if (input.min_weight <= 0) {
        errors.min_weight = "Min weight should be greater than zero";
    } else if (!input.max_weight) {
        errors.max_weight = "Max weight is required";
    } else if (input.max_weight <= 0) {
        errors.max_weight = "Max weight should be greater than zero";
    } else if (parseInt(input.min_weight) >= parseInt(input.max_weight)) {
        errors.max_weight = "Max weight must be greater than Min weight";
    }
    return errors
}


export default function CreateDog() {
    const dispatch = useDispatch();
    const history = useHistory()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})
    const [input, setInput] = useState({
        name: "",
        min_height: "",
        max_height: "",
        min_weight: "",
        max_weight: "",
        life_span: "",
        image: "",
        temperament: []
    });

    const handleChange = (e) => {
        e.preventDefault()
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name]: e.target.value
        }));
    };

    const handleSelect = (e) => {
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
    }
    const handleSubmit = (e) => {
        if (errors.name !== undefined ||
            errors.min_height !== undefined ||
            errors.max_height !== undefined ||
            errors.min_weight !== undefined ||
            errors.max_weight !== undefined ||
            errors.life_span !== undefined
        ) {
            document.getElementById("DoNotSubmit"); //con document.getElementById() selecciono el form por medio del atributo id que le asigné ("DontSubmit")
            return alert("Please complete the fields with valid data");
        }
        const addDog = {
            name: input.name,
            height: input.min_height + " - " + input.max_height,
            weight: input.min_weight + " - " + input.max_weight,
            life_span: input.life_span,
            image: input.image,
            temperament: input.temperament
        };
        e.preventDefault()
        dispatch(postDogs(addDog))
        setInput({
            name: "",
            image: "",
            max_height: "",
            min_height: "",
            min_weight: "",
            max_weight: "",
            min_lifeSpan: "",
            max_lifeSpan: "",
            temperaments: [],
        });

        history.push("/home")//una vez creado el personaje llevame al home 
    }

    useEffect(() => {
        dispatch(getTemperaments())
    }, [dispatch])



    return (
        <div className="acomodanding">
            <Link to="/home"> <button className="button-back-create" >Back</button></Link>
            <h1>Create Dog</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label>Name</label> <br />
                    <input className="field" type="text" value={input.name} name="name"
                        onChange={(e) => handleChange(e)} ></input>
                    {errors.name && (<p>{errors.name}</p>)}
                </div>

                <div>
                    <label> Min Height </label><br />
                    <input className="field" type="text" value={input.min_height} name="min_height"
                        onChange={(e) => handleChange(e)} />
                    {errors.min_height && (<p>{errors.min_height}</p>)}
                </div>
                <div>
                    <label> Max Height </label><br />
                    <input className="field" type=" text" value={input.max_height} name="max_height"
                        onChange={(e) => handleChange(e)} />
                    {errors.max_height && (<p>{errors.max_height}</p>)}
                </div>
                <div>

                    <label>Min Weight</label><br />
                    <input className="field" type="text" value={input.min_weight} name="min_weight"
                        onChange={handleChange} />
                    {errors.min_weight && (<p>{errors.min_weight}</p>)}
                </div>
                <div>

                    <label>Max Weight </label><br />
                    <input className="field" type="text" value={input.max_weight} name="max_weight"
                        onChange={handleChange} />
                    {errors.max_weight && (<p>{errors.max_weight}</p>)}
                </div>


                <div>
                    <label> Life span </label><br />
                    <input className="field" type="text" value={input.life_span} name="life_span"
                        onChange={(e) => handleChange(e)} />
                    {errors.life_span && (<p>{errors.life_span}</p>)}
                </div>

                <div>
                    <label> Image </label> <br />
                    <input className="field" type="text" value={input.image} name="image"
                        onChange={(e) => handleChange(e)} />
                    {errors.image && (<p>{errors.image}</p>)}
                </div>
                <div className="select">
                    <select onChange={handleSelect}>
                        {temperaments.map((t, id) =>
                            <option key={id} value={t.name}>{t.name}</option>
                        )}
                    </select>
                </div>

                <ul><li>{input.temperament.map((e) => e + ",")}</li></ul>
                <p className="center-content">
                    <button className="button-submit" type="submit">Send</button>
                </p>
            </form>
        </div>
    )

}







