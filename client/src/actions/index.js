import axios from 'axios';

export const getDogs = () => {
    return async function (dispatch) {
        let json = await axios("http://localhost:3001/dogs");
        return dispatch({
            type: "GET_DOGS",
            payload: json.data
        });
    };
};
export const getTemperaments = () => {
    return async function (dispatch) {
        let json = await axios("http://localhost:3001/temperaments");
        return dispatch({
            type: "GET_TEMPERAMENTS",
            payload: json.data
        });
    };
};
export const postDogs = (post) => {
    console.log(post)
    return async function (dispatch) {
        let json = await axios.post("http://localhost:3001/dogs", post);
        return dispatch ({
            type: "POST_DOG",
            payload: json.data
        })
    }
};

export const getNameDogs = (name) => {
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/dogs?name=${name}`);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data
            });
        } catch (error) {
            console.log(error)
        }
    }
}

export const filterCreated = (payload) => {
    return {
        type: "FILTER_CREATED",
        payload
    }
}
export const orderByName = (payload) => {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export const orderBYWeight = (payload) => {
    return {
        type: "ORDER_BY_WEIGTH",
        payload
    }
}
export const getDetails = (id) => {
    return async function (dispatch) {
        try {
            let json = await axios(`http://localhost:3001/dogs/${id}`);
            return dispatch({
                type: "GET_DETAILS",
                payload: json.data
            }); 
        } catch (error) {
            console.log(error)
        }
    }
}
  