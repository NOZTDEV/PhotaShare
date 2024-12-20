import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from "react-router-dom";
import firebaseApp from "../firebase/credenciales";
import { getStorage, ref, deleteObject } from "firebase/storage";
import { getFirestore, doc, updateDoc, arrayRemove } from 'firebase/firestore';

import Subir from './Subir.js';
import useModal from "../hooks/useModal";
import atras from '../img/atras.png';
import eliminar from '../img/Eliminar.png';
import swal from 'sweetalert';
import { getStart } from "../actions/actions";

import friends from '../img/Amigos.png';
import favorites from '../img/Favorito.png';
import up from '../img/Añadir.png';
import user from '../img/user.png';

import './Perfil.css';

const storage = getStorage(firebaseApp);
const firestore = getFirestore(firebaseApp);

function Perfil(){

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [isOpenModal, openModal, closeModal]= useModal();
    const [suprimido, setSuprimido] = useState(true);
    const [seccion,setSeccion] = useState(1);
    
    let { email } = useParams();
    

    let btn = [{name : 'seguidos', 
               img : `${friends}`}, 
               {name : 'Favoritos', 
               img : `${favorites}`}, 
               {name : 'Subir', 
               img : `${up}`}
               ];

    let userbd = useSelector(state => state.user);
    let usersbd = useSelector(state => state.users);

    const uid = userbd.user.uid;

    let usuario_perfil = usersbd.find(element => element.email === userbd.user.email);
    
        
    if(email === undefined || email === userbd.user.email) {
        
    }else {
        usuario_perfil = usersbd.find(element => element.email === email)
    }
    
    function select(e) {
        
        const seleccion = e.target.alt;
        switch(seleccion){
            case 'Subir':
                openModal()
            break;
            case 'seguidos':
                if(seccion === 1 || seccion === 2){
                    setSeccion(3)
                }else{
                    setSeccion(1)
                }
            break;
            case 'Favoritos':
                if(seccion === 2){
                    setSeccion(1)
                }else{
                    setSeccion(2)
                }
            break;
            default:
            break;
        }
    }

    useEffect(()=>{
        dispatch(getStart())
    },[suprimido]) // eslint-disable-line react-hooks/exhaustive-deps

    function deleteimg(e) {
        swal({
            title: "Estas Seguro que quieres Eliminar la Imagen?",
            text: "Una vez Eliminado, Usted no podra recuperar esta Imagen!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
          })
          .then((willDelete) => {
            if (willDelete) {
                const desertRef = ref(storage, `Imagenes/${e.target.alt}`);
                deleteObject(desertRef).then(() => {
                // File deleted successfully
                }).catch((error) => {
                // Uh-oh, an error occurred!
                });

                let imagen_borrar = usuario_perfil.imagenes.find(element => element.nameimg === e.target.alt);
                

                const docuRef = doc(firestore, `users/${uid}`);

                updateDoc(docuRef,{
                    imagenes: arrayRemove({nameimg:`${imagen_borrar.nameimg}`,
                                            imag:`${imagen_borrar.imag}`,
                                            categoria:`${imagen_borrar.categoria}`}),
                });
                setSuprimido(!suprimido);

              swal("Poof! La imagen a sido eliminado!", {
                icon: "success",
              });
            } else {
              swal("Tu imganen esta Seguro XD!");
            }
          });
    
    }

    function refresh (){
        setSuprimido(!suprimido);
    }
    let seguidos = usuario_perfil.seguidos;


    return (
        <div className="body_perfil">
            <img 
                onClick={()=>{navigate('/home')}}
                src={atras} 
                className ='btn_atras'
                alt='atras' 
                width="50px" height="50px"/>
            <header className="perfil">
                <div className="data_perfil">
                    <img 
                        src = {usuario_perfil.Perfil.imgPerfil?usuario_perfil.Perfil.imgPerfil:user} 
                        alt='usuario'
                        width="130" height="130"/>
                    <div >
                        <p className="status_perfil">{usuario_perfil.username}</p>
                        <br/>
                        <p className="status_perfil">{usuario_perfil.email}</p>
                        <span className="status_perfil">edad: {usuario_perfil.age}</span>
                        <span className="status_perfil">Tipo: {usuario_perfil.tipo}</span>    
                    </div>
                </div>
                <div className="btn_perfil">
                    {Array.isArray(btn) && btn.map((c,i)=>( c.name !== 'Subir'?
                        <div key={i} onClick = {select} id = {c.name}>
                            <img
                                className="img_perfil" 
                                src = {c.img}
                                alt= {c.name}/>
                            <p>{c.name}</p>
                        </div>
                        :email === undefined || email === userbd.user.email?
                        <div key={i} onClick = {select} id = {c.name}>
                            <img
                                className="img_perfil" 
                                src = {c.img}
                                alt= {c.name}/>
                            <p>{c.name}</p>
                        </div>:''
                    ))}
                </div>
            </header>
            <div className="contenido">
                {seccion === 3? 
                <div className="contenedor_seguidores">
                    <h2>Seguidos:</h2>
                    <div className="lista_seguidores">
                        {Array.isArray(seguidos) && seguidos.map((c,i)=>( 
                            <div key={i} className = 'seguidos'>   
                                <div>{c.nombre}</div>
                            </div>
                        ))}
                    </div>
                </div>
                : ""}

                {seccion===2?
                <div className="contenido">
                    {Array.isArray(usuario_perfil.favoritos) && usuario_perfil.favoritos.map((c,i)=>(
                    <div key={i} className = 'imagenes_perfil'>
                        <div className="roll_img">
                            <img
                                className="imagenes_show"
                                src = {c.imag}
                                alt= {c.nameimg}/>
                        </div>
                        
                    </div>
                ))}
                </div>
                
                :seccion===1?
                <div className="contenido">
                    <Subir 
                    isOpen={isOpenModal}
                    closeModal={closeModal}
                    refresh={refresh}/>

                {Array.isArray(usuario_perfil.imagenes) && usuario_perfil.imagenes.map((c,i)=>(
                    <div key={i} className = 'imagenes_perfil'>
                        <div className="roll_img">
                            <img
                                className="imagenes_show"
                                src = {c.imag}
                                alt= {c.nameimg}/>
                        </div>
                        {usuario_perfil.email === userbd.user.email?
                            <div className="btns_imgs">
                            <img 
                                onClick={deleteimg}
                                src={eliminar}
                                alt={c.nameimg}/>
                            </div>
                        :''}
                        
                    </div>
                ))} 
                </div>
                :''   }
                

            </div>
        </div>
    )
}

export default Perfil;