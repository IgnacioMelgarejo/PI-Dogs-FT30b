import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDogs, filterCreated, orderByName, orderBYWeight } from "../actions";
import { Link } from "react-router-dom";
import Cards from "./Cards";
import SearchBar from "./SearchBar";
import Paginated from "./Paginated"
import "./components.css/Home.css"
import "./components.css/SearchBar.css"

export default function Home() {
    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const [orden, setOrden] = useState('')
    //↓Primero declaro un estado local, al que le paso la pagina actual(currentPage) y cual 
    //↓va a ser la pagina actual(setCurrentPage), la pag actual va a arrancar en 1 
    const [currentPage, setCurrentPage] = useState(1)
    //↓Luego declaro otro estado local que tengo la cant de dogs por pagina que arranca en 6 
    const [dogsPerPage] = useState(8)
    //↓Sobre la pag actual multiplico la cant de dogs por paj. Ej si estoy en la pag 3, esa ↓pagina la debo multiplicar por 8(dogsPage) esto dara 24 que es el ult index de la pag
    const indexOfLastDog = currentPage * dogsPerPage;
    //↑ index va a ser la pag actual en la que esta por la cant de dogs por pag
    const indexOfFirstDog = indexOfLastDog - dogsPerPage
    //↑ indice del ultimo personaje, menos los personajes por pagina, siguendo con el ej de ↑arriba si 24 es el ultimo index de la pag 3, entonces 16 sera el first index 
    const currentDog = allDogs.slice(indexOfFirstDog, indexOfLastDog)
    //↑ o sea, esto me devolvera un arreglo desde el 0 al 8, le paso como primer param el inicio y como segundo param el corte


    //↓ el paginado se seteara la pag con eel num que vaya apretando 
    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    const handleClick = (e) => {// lo unico que hace es resetear(que traiga todo de nuevo)
        e.preventDefault()
        dispatch(getDogs())
    }

    const handlefilterCreated = (e) => {
        dispatch(filterCreated(e.target.value))
    }

    const handleSort = (e) => {
        e.preventDefault()
        dispatch(orderByName(e.target.value))
        setCurrentPage(1)//cuando hago en ordenamiento setea la pag en la primera 
        setOrden(`Ordenando ${e.target.value}`)
    }

    const handleSortBYWeight = (e) => {
        e.preventDefault()
        dispatch(orderBYWeight(e.target.value))
        setCurrentPage(1)//cuando hago en ordenamiento setea la pag en la primera 
        setOrden(`Ordenando ${e.target.value}`)
    }
    return (
        <div >
            <nav className="nav-home columns">
                
                    <Link className="create" to="/dogs">Create Dog</Link>
                
                <div className="dropdown">
                    <select className="dropbtn dropdown" onClick={(e) => handleSort(e)}>
                        <option value="Order by Name">Order by Name</option>
                        <option value="Asc">From A to Z</option>
                        <option value="Desc">From Z to A</option>
                    </select>
                    <select className="dropbtn dropdown" onClick={(e) => handleSortBYWeight(e)}>
                        <option value="Order by Weight">Order by Weight</option>
                        <option value="Weight 1">Small</option>
                        <option value="Weight 2">Big</option>
                    </select>
                    <select className="dropbtn dropdown" onChange={e => handlefilterCreated(e)}>
                        <option value="Source">Source</option>
                        <option value="All">All Dogs</option>
                        <option value="Created">Created by You!</option>
                    </select>
                </div>
                <SearchBar/>
                
            </nav>

            <button className="cargaPerro" onClick={e => { handleClick(e) }}>
                Refresh Dogs
            </button>
            <div>
                <Paginated
                    dogsPerPage={dogsPerPage}
                    allDogs={allDogs.length}
                    paginated={paginado}
                />
                <div className="card">
                    {currentDog?.map((e) => {
                        return (
                            <div key={e.id}>
                                <Link className="link-card" to={`/dog/${e.id}`}>
                                    <Cards id={e.id} name={e.name} image={e.image} temperament={e.temperament} weight={e.weight} />
                                </Link>
                            </div>
                        )
                    })}
                </div>

            </div>
        </div>
    )
}