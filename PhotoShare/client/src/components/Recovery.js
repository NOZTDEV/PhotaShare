import React from "react";
import logo from '../img/logo.png';
import { Link } from 'react-router-dom';

import './Recovery.css';

function Recovery(){
    return(
        <div className="body">
            <div className="recovery-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Olvidaste tu contraseña?</h2>
                <form>
                    <label htmlFor = 'email'>E-mail</label>
                    <input type = 'text' placeholder="Ingrese su correo electronico"/>
                    <input type = 'submit' value='recuperar contraseña'/>
                    <Link to = '/login' className="a">
                        Volver a inicio de sesion
                    </Link>
                </form>
            </div>
        </div>
    );
};

export default Recovery;