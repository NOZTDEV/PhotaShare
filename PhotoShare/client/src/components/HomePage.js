import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import userimagen from '../img/user.png';

import firebaseApp from "../firebase/credenciales";
import { getAuth, signOut } from "firebase/auth"
import {doc, updateDoc, arrayUnion,arrayRemove, getFirestore} from "firebase/firestore";

import logo from '../img/logo.png';

import deportes from '../img/depo.jpg';
import paisajes from '../img/pai.jpg';
import comida from '../img/comi.jpg';
import games from '../img/game.jpg';
import autoMoto from '../img/aut.jpg';
import otros from '../img/otr.jpg';
import './HomePage.css'
import { getStart } from "../actions/actions";


const auth = getAuth(firebaseApp)
var defini, imgurl 


function HomePage({user}) {
    
    const [show,setShow]=useState('false')

    const dispatch = useDispatch();

    let userbd = useSelector(state => state.user);
    let usersbd = useSelector(state => state.users);
    
    const usuario_perfil = usersbd.find(element => element.email === userbd.user.email);
    let otros_Users = usersbd.filter(us => us.username !== usuario_perfil.username );
    
    
    useEffect(()=>{
        dispatch(getStart())
    },[dispatch])
    
    
    
    let btn = [{name : 'Deportes', 
               img : `${deportes}`}, 
               {name : 'Paisajes', 
               img : `${paisajes}`}, 
               {name : 'Comida', 
               img : `${comida}`},
               {name : 'Video Juegos', 
               img : `${games}`},
               {name : 'Autos & Motos', 
               img : `${autoMoto}`},
               {name : 'Otros', 
                img : `${otros}`}];

    const navigate = useNavigate();

    async function logOut(){
        const sing = await signOut(auth)
        navigate('/');

    };


    function edit(){
        navigate('/edit')
    }

    function perfil(){
        navigate('/perfil')
    }

    const [visible , setVisible] = useState(1);
    const [letra , setLetra] = useState("");
    

    const escribi = (e) => {
        setLetra(e.target.value);
        if(e.target.value === ''){
            setVisible(1);
        }else if(letra.length >= 0 && letra.length !== 1){
            setVisible(2);
        }
    }


    function exist(d){
        return d.includes(letra);
    }


    function desplegar(){
        show !== 'true'? setShow('true'):setShow('false')
    }
    
    const [nomCategoria , setNomCategoria] = useState('');

    //filtra los usuarios
    let usuariosbd = useSelector(state => state.users);
    //filtra usuarios que subieron imagenes
    let filtrados = usuariosbd.filter(imgs => imgs.imagenes.length > 0);
    //llena un array con todas las imagenes que hay
    let todasImgs = [];
    function llenar(todasImgs){
        for (let i = 0; i < filtrados.length; i++) {
            todasImgs = todasImgs.concat(filtrados[i].imagenes);
        }
        return todasImgs;
    }
    //array que da todas las imagenes de una categoria
    let todasImagenes = llenar(todasImgs).filter(imgs => imgs.categoria === nomCategoria);
    
    const estadoBoton = (cat) => {
        setNomCategoria(cat);
        setVisible(3);
    }

    function vol(){
        setVisible(1);
    }
   
    const datosImg = (name , url) => {
        imgurl= url;
        defini = name;
        ir();
    }
    
    function ir(){
        navigate('/ver')
    }

    const uid = userbd.user.uid;
    const firestore = getFirestore(firebaseApp)
    const[btnn, setBtn]=useState("Seguir")

    const eventoSeguir=(id ,user, cont)=>{
            if(cont=="Seguir"){
                document.getElementById(id).textContent="Dejar de seguir"
                const docuRef = doc(firestore, `users/${uid}`);
                updateDoc(docuRef,{
                seguidos: arrayUnion({ gmail: id,
                                       nombre: user })
                })
            }
            if(cont=="Dejar de seguir"){
                document.getElementById(id).textContent="Seguir"
                const docuRef = doc(firestore, `users/${uid}`);
                updateDoc(docuRef,{
                seguidos: arrayRemove({ gmail: id,
                                        nombre: user })
                })
            }
    };

    

    return (
        <div className="home">
            <div className="principal">
                <div 
                    onClick={perfil}
                    className="user">
                    <img 
                        src = {
                            usuario_perfil.Perfil.imgPerfil?usuario_perfil.Perfil.imgPerfil:
                            userimagen} 
                        alt='user' width="50" height="50"/>
                    <p>
                        {usuario_perfil.username}
                    </p>
                </div>
                <div>
                    <input className="search" 
                            type= 'text' 
                            name='buscar' 
                            placeholder="Buscar un nombre de usuario" 
                            onChange={escribi}>
                    </input>
                    
                </div>
                <img src = {logo} alt='user' width="100" height="100"/>
            </div>

            <div className="select_menu">
                <div className="select_btn" onClick={desplegar}>
                    <span className="btn_text">Selecionar su opcion</span>
                </div>
                {show === 'true'?
                <ul className="options">
                    <li className="option" onClick={perfil}>
                        <span className="option_text">Perfil</span>
                    </li>
                    <li className="option" onClick={edit}>
                        <span className="option_text">Editar Perfil</span>
                    </li>
                    <li className="option" onClick={logOut}>
                        <span className="option_text">Cerrar Sesion</span>
                    </li>
                </ul>
                :<>
                </>
                }  
            </div>

            {visible === 3?
            <button className="volver" onClick={vol}>Atras</button>
            
            : ""}

            {visible === 1?
            <div className="container">
                {Array.isArray(btn) && btn.map((c,i)=>(
                    <div className="card" key ={i} onClick={() => estadoBoton(c.name)}>
                        
                        <p className="title">{c.name}</p>
                        <div className="ima">
                            <img 
                                src={c.img} 
                                alt = 'imagen'
                                className = 'img' 
                            />
                        </div>
                        
                    </div> 
                ))}
            </div>
            : ""}

            {visible === 2? 
            <div className="container_search">
                    {Array.isArray(otros_Users) && otros_Users.map((c,i)=>(
                        <div key ={i}>
                            {exist(c.username)?
                            <>
                                <div className="usuario_result" key={c.username}>
                                    <Link className="mienbros" to = {c.email === userbd.user.email?'/Perfil':`/${c.email}`} key = {`link_${c.email}`}>
                                        <img src={c.Perfil.imgPerfil?c.Perfil.imgPerfil:userimagen} alt = 'imagen' className = 'imgUser' width="80" height="80"/>
                                        <p>{c.username}</p>
                                    </Link>
                                    <div>
                                        <button 
                                            id={c.email} 
                                            className="seguir" 
                                            onClick={()=>eventoSeguir(c.email,c.username,document.getElementById(c.email).textContent)}>{btnn}</button>
                                    </div>
                                </div>
                            </>
                            
                            : ""}
                        </div>
                    ))}
            </div>
            : ""}

            {visible === 3? 
            <div>
                <div className="container">
                    {Array.isArray(todasImagenes) && todasImagenes.map((c,i)=>(
                        <div key={i} className = 'imagenes_perfil'>
                            <>
                            <img
                                onClick = {() => datosImg(c.nameimg , c.imag)}
                                className="imagenes_show"
                                src = {c.imag}
                                alt= {c.nameimg}/>
                            </>
                        </div>
                    ))}
                </div>
            </div>
            : ""}

        </div>
    )
};
export{defini, imgurl};
export default HomePage;