import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux"
import { getNameDogs } from "../actions"
import "./components.css/SearchBar.css"

export default function SearchBar (){
    const dispatch = useDispatch();
    const [name, setName] = useState("")//vacio porque aqui metere el target.value
 
    const handleInputChange = (e)=>{
        e.preventDefault()
        setName(e.target.value)
    }
    const handleSubmit = (e)=>{
        e.preventDefault()
        dispatch(getNameDogs(name));
        setName("")
    }

    return (
        <div className="search-bar" >
            <input className="input-search" type="text" placeholder="Search.." onChange={e=>handleInputChange(e)}/>
            <button className="button-search" type="submit" onClick={e=>handleSubmit(e)}>Search</button>
        </div>
        
    )
}