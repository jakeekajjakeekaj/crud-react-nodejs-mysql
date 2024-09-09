import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {

  // Para gestionar los datos que lleguen a través de los inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState(0);
  const [country, setCountry] = useState("");
  const [charge, setCharge] = useState("");
  const [years, setYears] = useState(0);

  const add = async ()=> {
    try {
      // alert(name);
    Axios.post('http://localhost:3000/create', {
      name,
      age,
      country,
      charge,
      years
    });
    alert("Empleado Registrado");
    } catch (error) {
      alert(`Error al registrar usuario: ${error.message}`);
    }
    // alert(nombre);
    // Axios.post('http://localhost:3000/create', {
    //   name,
    //   age,
    //   country,
    //   charge,
    //   years
    // }).then(()=> {
  //     alert("Empleado Registrado");
  //   })
  //   .catch((error)=> {
  //     alert(`Error al registrar usuario: ${error.message}`);
  //   });
  }

  return (
    <div className="App">
      <div className="App__datos">
        <form>

          <label><div>Nombre: </div> 
            <input
              onChange={(event)=> {
                setName(event.target.value);
              }}
              type='text' 
              placeholder='Nombre' 
            /></label>
            
          <label><div>Edad: </div> 
            <input 
              onChange={(event)=> {
                setAge(event.target.value);
              }}
              type='number'
              placeholder='Edad' 
            /></label>

          <label><div>Pais: </div> 
            <input 
              onChange={(event)=> {
                setCountry(event.target.value);
              }}
              type='text'
              placeholder='Pais' 
            /></label>

          <label><div>Cargo: </div> 
            <input 
              onChange={(event)=> {
                setCharge(event.target.value);
              }}
              type='text'
              placeholder='Cargo' 
            /></label>

          <label><div>Años: </div> 
            <input 
              onChange={(event)=> {
                setYears(event.target.value);
              }}
              type='number'
              placeholder='Años' 
            /></label>


          <button
            onClick={add}
          >Registrar</button>
        </form>
      </div>
    </div>
  )
};