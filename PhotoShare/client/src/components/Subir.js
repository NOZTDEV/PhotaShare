import React, { useState } from "react";
import { useSelector } from 'react-redux';
import firebaseApp from "../firebase/credenciales";
import './Subir.css'
import swal from 'sweetalert';


import { getFirestore, doc, updateDoc, arrayUnion } from 'firebase/firestore';
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";

const firestore = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);


function Subir({isOpen, closeModal, refresh}){

    
    let userbd = useSelector(state => state.user);
    const uid = userbd.user.uid;

    let btn = [{name : 'Deportes' 
                }, 
                {name : 'Paisajes' 
                }, 
                {name : 'Comida' 
                },
                {name : 'Video Juegos' 
                },
                {name : 'Autos & Motos' 
                },
                {name : 'Otros' 
                }];

    const [storageRefImagen,setStorageRefImagen] = useState([]);
    const [fileImagen, setFileImagen] = useState([])
    const [tipoCategoria,settipoCategoria] = useState('Otros')

    function onUploadImagen(e){
        const stoRef = ref(storage,`Imagenes/${e.target.files[0].name}`); 
        setStorageRefImagen(stoRef) 
        setFileImagen(e.target.files[0])

    };

    function categoria_select (e){
        settipoCategoria(e.target.value);
    }

    function upLoadImagen() {
        swal({
            title: "Imagen subida con exito",
            icon: "success",
            button: "aceptar"
    })
        const uploadTask = uploadBytesResumable(storageRefImagen, fileImagen)

          uploadTask.on('state_changed', 
          (snapshot) => {
      },
          (error) => {
          console.log(error.message)
      },
          ()=>{
          
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            
              const docuRef = doc(firestore, `users/${uid}`);

              updateDoc(docuRef,{
                imagenes: arrayUnion({imag:downloadURL,
                                      nameimg:fileImagen.name,
                                      categoria:tipoCategoria})
              })
              closeModal();
              refresh();
            });
          
      });

        document.getElementById('imagenSubida').value='';
    };


    return(
        <div className={`modal ${isOpen && 'modal-open'}`}>
            <div className="box_subir">
                <h2>Sube una Imagen XD</h2><br/>
                            {/* <progress value={uploadValue.uploadValue} max='100'></progress> */}
                <input 
                    className="subir_imagen"
                    id = 'imagenSubida'
                    onChange={onUploadImagen}
                    type = 'file' 
                    name = 'imagen subida'/><br/>
            
                <h2>Tipo de Categoria</h2>

                <div className="group_catego">
                    {Array.isArray(btn) && btn.map((c,i)=>(
                            <div key ={i} onChange={categoria_select}>
                                <input type = 'radio'  name='categoria' value={c.name}/>
                                <label>{c.name}</label>
                            </div>
                        ))}
                </div>
                <input 
                        className="btn_exit"
                        onClick={upLoadImagen}
                        type = 'button' 
                        value = 'subir imagen'/>
                <input 
                        className='btn_exit' 
                        type='button' 
                        value='Salir'
                        onClick={closeModal}/>
            </div>

        </div>
    )
}

export default Subir;