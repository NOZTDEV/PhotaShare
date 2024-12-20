import React from "react"
import './Modal.css';
import firebaseApp from "../firebase/credenciales";

import { useSelector } from 'react-redux';
import { getAuth, deleteUser } from "firebase/auth"
import { useNavigate } from "react-router-dom";
import { getFirestore, doc, deleteDoc } from "firebase/firestore";

const auth = getAuth(firebaseApp);

const firestore = getFirestore(firebaseApp);


function Modal ({isOpen, closeModal, children}) {
    
    let userbd = useSelector(state => state.user);
    const uid = userbd.user.uid;

    const handleModalDialogClick = (e) =>{
        e.stopPropagation();
    }

    const navigate = useNavigate();

    function  eliminar(){
        
        const usuario = auth.currentUser;
        
        deleteUser(usuario).then(() => {
    
            const docuRef = doc(firestore, `users/${uid}`);
    
            deleteDoc(docuRef,{
            });

            navigate('/login');
        }).catch((error) => {
         // An error ocurred
         // ...
         });
           
        
    
    }


    return (
        <div className={`modal ${isOpen && 'modal-open'}`} onClick={closeModal}>
            <div className="modal__dialog" onClick={handleModalDialogClick}>
                <h1>¿Esta seguro de Eliminar la Cuenta?</h1>
                <input className="btn_exit" type='button' value='Eliminar Cuenta' onClick={eliminar}/> 
                <input className='btn_exit' type='button' value='Salir'onClick={closeModal}/> 
                {children}
            </div> 
        </div>
    )
}
export default Modal;

