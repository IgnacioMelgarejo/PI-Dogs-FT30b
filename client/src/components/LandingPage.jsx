import React from 'react';
import { Link } from 'react-router-dom'
import "./components.css/LandingPage.css"

export default function LandingPage() {
    return (
        <div className="landing" >
            <h1>Dog breed page</h1>
            <div>
                <Link to="/home">
                    <button className='button'>home</button>
                </Link>
            </div>
        </div>
    )
}