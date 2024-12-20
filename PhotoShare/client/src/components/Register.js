import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import atras from '../img/atras.png';

import firebaseApp from "../firebase/credenciales";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, doc, setDoc } from 'firebase/firestore'

import logo from '../img/logo.png';

import './Register.css';
//import useModal from "../hooks/useModal";
import swal from 'sweetalert';


const auth = getAuth(firebaseApp);
const firestore = getFirestore(firebaseApp);


function Register() {
   
    //const [isOpenRegisterModal, openRegisterModal, closeRegisterModal]= useModal();
    const mostrarAlerta =()=>{
        swal({
                title: "Cuenta creada exitosamente",
                icon: "success",
                button: "aceptar"
        }
        );
    }
    
  
    const navigate = useNavigate();

    const [mail,setMail]= useState('');
    const [message, setMessage]= useState('');

    const [pas,setPas] = useState('');
    const [messagePas,setMessagePas] = useState('');

    const [equalityMenssage, setEqualityMenssage] = useState('');

    async function registerUser(email, password,username,sex,age) {
        const infoUser = await createUserWithEmailAndPassword(auth,email,password).then((userFirebase) => {
            return userFirebase
        });

        const docuRef = doc(firestore, `users/${infoUser.user.uid}`);

        setDoc(docuRef,{
            email:email,
            password: password,
            username:username,
            sex:sex,
            age:age,
            tipo:'Public',
            Perfil:{imgPerfil:'', imgName:''},
            Portal:{imgPortal:'', imgName:''},
            imagenes:[],
            favoritos:[],
            seguidos:{}
        });

    };

    function submitHandler(e) {
        e.preventDefault();

        const username = e.target.elements.username.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;
        const sex = e.target.elements.sex.value;
        const age = e.target.elements.age.value;

        registerUser(email,password,username,sex,age);

        navigate('/');

    };

    function validarEmail( email ) {
        let expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if ( !expr.test(email) ){
            setMessage (`La dirección de correo es incorrecta.`);  
        } else {
            setMessage (``); 
        }
    };

    function validarPass(pas) {
        
        if(pas.length <5) {
            setMessagePas (`El password tiene que tener como minnimo 6 caracteres`);  
        } else {
            setMessagePas ('');
        }
    };

    function validarEquality(equality) {
        if(pas !== equality){
            setEqualityMenssage('El Password no coincide')
            
        } else {
            setEqualityMenssage('')
            
        }
    }

    function validate(e) {
        setMail(e.target.value)
        validarEmail(mail);
    };

    function verify(e) {
        setPas(e.target.value);
        validarPass(pas);
    };

    function equal(e) {
        validarEquality(e.target.value);
    };

    return (
        <div className="body">
            <img 
                onClick={()=>{navigate('/login')}}
                src={atras} 
                className ='btn_atras'
                alt='atras' 
                width="50px" height="50px"/>
            <div className="register-box">
                <img className = 'avatar'src={logo} alt="logo"/>
                <h2>Registro!</h2>
                <form onSubmit={submitHandler}>
                    <label htmlFor = 'username'>Nombre de usuario</label>
                    <input 
                        id = 'username' 
                        type = 'text' 
                        placeholder="ingrese nombre de usuario"/>

                    <label htmlFor = 'email'>E-mail</label>
                    <input 
                        id = 'email'
                        type = 'text' 
                        placeholder="Ingrese correo electronico"
                        onChange={validate}/>
                    <span className="alert">{message}</span>
                    <label htmlFor = 'password'>Contraseña</label>
                    <input 
                        type = 'password' 
                        placeholder="Ingrese una contraseña"
                        onChange={verify}/>
                    <span className="alert">{messagePas}</span>
                    <label htmlFor = 'confirm-password'>Confirmar contraseña</label>
                    <input 
                        id = 'password' 
                        type = 'password'  
                        placeholder="vuelva a introducir la contraseña"
                        onChange={equal}/>
                    <span className="alert">{equalityMenssage}</span>
                    <label htmlFor = 'sex'>Sexo</label>
                    <input 
                        id = 'sex' 
                        type = 'text' 
                        placeholder="Introdusca su sexo"/>

                    <label htmlFor = 'age'>Edad</label>
                    <input 
                        id = 'age' 
                        type = 'text' 
                        placeholder="Introdusca su edad"/>
                       
                       <input type = 'submit'  value='Registrarse' onClick={()=>mostrarAlerta()}/>
                          <Link to = '/login' className="a">
                        Volver a inicio de sesion
                        </Link>
                </form>      
            </div>
        </div>
    );
};

export default Register;