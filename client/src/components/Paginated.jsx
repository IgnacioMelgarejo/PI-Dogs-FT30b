import React from "react";
import "./components.css/Paginated.css";


export default function Paginado({ dogsPerPage, allDogs, paginated }) {
    const pageNumber = []
    // Va a redondear todos los personajes por la cantidad que quiero por pag
    for (let i = 0; i < Math.ceil(allDogs / dogsPerPage); i++) {
        pageNumber.push(i + 1)
    }
    //si tengo el arreglo pageNumber lo mapeo y duvuevlo cada uno de los numeros que devuelva el paginado ↓↓

    return (
        <nav className="pagination-component">
            <div className="pagination-container">
                {pageNumber?.map((number) => {
                    return (
                        <button key={number} className="pagination" onClick={() => paginated(number)}>{number}</button>
                    )
                })}
            </div>
        </nav>
    )
}