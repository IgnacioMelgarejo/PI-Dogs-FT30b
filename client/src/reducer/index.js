

const initialState = {
    dogs: [],
    details: [],
    allDogs: [],
    temperaments: [],

}

function rootReducer(state = initialState, action) {
    switch (action.type) {
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload
            }
        case "GET_NAME_DOGS":
            let nameDog = action.payload
            return {
                ...state,
                dogs: nameDog
            }
        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }
        case "POST_DOG":
            return {
                ...state,
            }
        case "FILTER_CREATED":
            const allDogs = state.allDogs
            const createdFilter = action.payload === "Created" ? allDogs.filter(e =>
                e.createdInDb) : allDogs.filter(e => !e.createdInDb)
            return {
                ...state,
                dogs: action.payload === "All" ? state.allDogs : createdFilter
            }
        case "ORDER_BY_NAME":
            //Funciona bien al ordenarlos ya que el metodo sort se fija unicamente en el primer valor para poder ordenarlos 
            let sortedDog = action.payload === "Asc" ?
                state.dogs.sort((a, b) => {
                    if (a.name > b.name) return 1//num positivo,el valor b va antes que el valor a 
                    if (b.name > a.name) return -1//negativo valor a va antes que el valor b
                    return 0
                }) : state.dogs.sort((a, b) => {
                    if (a.name > b.name) return -1
                    if (b.name > a.name) return 1
                    return 0
                })
            return {
                ...state,
                dogs: sortedDog
            }
        case "ORDER_BY_WEIGTH":
            const weightDogs = action.payload === "Weight 1" ?
                state.dogs.sort(function (a, b) {
                    if (typeof action.payload.weight === "string") { //si recibo un string con el peso
                        if (a.weight > b.weight) return 1 //accedo al valor weight que quiero comparar
                        if (a.weight < b.weight) return -1
                        return 0;         //si son iguales no hace nada, los deja igual
                    } else {             // lo convierto en número
                        if (parseInt(a.weight) > parseInt(b.weight)) return 1
                        if (parseInt(a.weight) < parseInt(b.weight)) return -1
                        return 0;
                    }
                }) :                                 //si el valor no es 'weight 1' 
                state.dogs.sort(function (a, b) {   //ordeno de mayor a menor
                    if (typeof action.payload.weight === "string") {
                        if (a.weight > b.weight) return -1
                        if (a.weight < b.weight) return 1
                        return 0;
                    } else {
                        if (parseInt(a.weight) > parseInt(b.weight)) return -1
                        if (parseInt(a.weight) > parseInt(b.weight)) return 1
                        return 0
                    }
                });
            return {
                ...state,
                dogs: weightDogs
            };

        case "GET_DETAILS":
            return {
                ...state,
                details: action.payload
            }

        default: return state;
    }
};







export default rootReducer;