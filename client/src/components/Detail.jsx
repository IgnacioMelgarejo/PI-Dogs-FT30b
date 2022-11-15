import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { getDetails } from "../actions";
import { Link } from "react-router-dom";
import "./components.css/Details.css"


export default function Detail(props) {
    console.log(props);
    const dispatch = useDispatch()


    const myDog = useSelector((state) => state.details)

    useEffect(() => {
        dispatch(getDetails(props.match.params.id))// de esta forma accedo al id de detalles 
    }, [dispatch, props.match.params.id])

    console.log(myDog[0])
    return (
        <div className="columns-detail ">
             <Link to="/home">
                <button className="button-back">back</button>
            </Link>
            {myDog &&
                <div className="main-container-detail">
                    <h1 className="title-detal" >{myDog[0] ? myDog[0].name : myDog.name}</h1>
                    <img className="image-dog-detail " src={myDog[0] ? myDog[0].image : myDog.image} alt="img not found" width="240px" height="180px" />
                    <div className="dog-detail">
                        <p>Weight: {myDog[0] ? myDog[0].weight : myDog.weight} KG</p>
                        <p>Height: {myDog[0] ? myDog[0].height : myDog.height} CM</p>
                        <p>Life Span: {myDog[0] ? myDog[0].life_span+" Years" : myDog.life}</p>
                    </div>
                    <h4> TEMPERAMENTS <br />{myDog.temperament ? myDog.temperament : myDog[0] ? myDog[0].temperament : "unknow"}</h4>
                </div>

            }
           
        </div>
    )

}


