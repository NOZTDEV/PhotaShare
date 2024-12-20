import React from "react";
import logo from '../img/logo.png';

import './Splash.css'

function Splash() {

    return (
        <div className="splash">
            <div className="photoshare">
                <img src = {logo} alt='user' width='50%'/>
                <p>PhotoShare</p>
            </div>
        </div>
    )
};

export default Splash;