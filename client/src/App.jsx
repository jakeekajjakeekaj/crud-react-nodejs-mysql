import React, { useState } from 'react';
import './App.css';

export default function App() {

  // Para gestionar los datos que lleguen a través de los inputs
  const [nombre, setNombre] = useState("");
  const [edad, setEdad] = useState(0);
  const [pais, setPais] = useState("");
  const [cargo, setCargo] = useState("");
  const [anios, setAnios] = useState(0);

  const mostrarDatos = ()=> {
    alert(nombre);
  }

  return (
    <div className="App">
      <div className="App__datos">
        <form>

          <label><div>Nombre: </div> 
            <input
              onChange={(event)=> {
                setNombre(event.target.value);
              }}
              type='text' 
              placeholder='Nombre' 
            /></label>
            
          <label><div>Edad: </div> 
            <input 
              onChange={(event)=> {
                setNombre(event.target.value);
              }}
              type='number'
              placeholder='Edad' 
            /></label>

          <label><div>Pais: </div> 
            <input 
              onChange={(event)=> {
                setNombre(event.target.value);
              }}
              type='text'
              placeholder='Pais' 
            /></label>

          <label><div>Cargo: </div> 
            <input 
              onChange={(event)=> {
                setNombre(event.target.value);
              }}
              type='text'
              placeholder='Cargo' 
            /></label>

          <label><div>Años: </div> 
            <input 
              onChange={(event)=> {
                setNombre(event.target.value);
              }}
              type='number'
              placeholder='Años' 
            /></label>


          <button
            onClick={mostrarDatos}
          >Registrar</button>
        </form>
      </div>
    </div>
  )
};