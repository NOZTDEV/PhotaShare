import { Routes, Route } from "react-router";
import { Navigate } from "react-router-dom";
import { useState } from "react";
//firebase
import firebaseApp from "./firebase/credenciales.js";
import { getAuth, onAuthStateChanged } from "firebase/auth";
//Componentes
import Splash from "./components/Splash.js";
import Login from "./components/Login.js";
import Register from "./components/Register.js";
import Recovery from "./components/Recovery.js";
import HomePage from './components/HomePage.js';
import Edit from "./components/Edit.js";
import Perfil from "./components/Perfil.js";
import Ver from "./components/Ver.js"
import './App.css';

const auth = getAuth(firebaseApp);

function App() {

  const [user, setUser] = useState(null);

  onAuthStateChanged(auth, (userFirebase) => {
    if(userFirebase) {
      setUser(userFirebase)
    }else {
      setUser(null)
    }
  })

  return (
    <div>
      <Routes>
        <Route 
          exact path = "/" 
          element ={user? <Navigate to="/home" /> : <Navigate to="/login" />}/>
        <Route exact path = "/home" element = {<HomePage user ={user}/>}/>
        <Route exact path = "/register" element = {<Register/>}/>
        <Route exact path = "/recovery" element = {<Recovery/>}/>
        <Route exact path = "/login" element = {<Login/>}/>
        <Route exact path = "/edit" element = {<Edit/>}/>
        <Route exact path = "/perfil" element = {<Perfil/>}/>
        <Route exact path = "/ver" element = {<Ver/>}/>
        <Route exact path = '/:email'element = {<Perfil/>}/>
      </Routes>
    </div>
  );
}

export default App;
