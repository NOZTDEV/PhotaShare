// Importamos la función para inicializar la aplicación de Firebase
import { initializeApp } from "firebase/app";

// Añade aquí tus credenciales
const firebaseConfig = {
    apiKey: "AIzaSyDtsEc3qt6LPGpgL16Q2dX6vH-pDvcp1z0",
    authDomain: "photoshare-919cc.firebaseapp.com",
    projectId: "photoshare-919cc",
    storageBucket: "photoshare-919cc.appspot.com",
    messagingSenderId: "442873763568",
    appId: "1:442873763568:web:e7da8609f77db0809a1435"
};

// Inicializamos la aplicación y la guardamos en firebaseApp
const firebaseApp = initializeApp(firebaseConfig);
// Exportamos firebaseApp para poder utilizarla en cualquier lugar de la aplicación
export default firebaseApp;