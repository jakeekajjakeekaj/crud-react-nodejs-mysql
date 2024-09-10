import React, { useState } from 'react';
import Axios from 'axios';
import './App.css';

export default function App() {

  // Para gestionar los datos que lleguen a través de los inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [charge, setCharge] = useState("");
  const [years, setYears] = useState("");

  const [employees, setemployees] = useState([]);

  const add = async ()=> {
    try {
      // alert(name);
    Axios.post('http://localhost:3000/api/create', {
      name,
      age,
      country,
      charge,
      years
    }).then(()=> {
      getEmployees();
      alert("Empleado Registrado");

      // Resetea los valores de los inputs
      setName("");
      setAge("");
      setCountry("");
      setCharge("");
      setYears("");
    });
    // alert("Empleado Registrado");
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

  const getEmployees = async ()=> {
    try {
    // console.log("pasa 1");
    Axios.get('http://localhost:3000/api/employees').then((res)=> {
      // console.log("pasa 2");
      setemployees(res.data);
      // alert("Get");
    });
    } catch (error) {
      alert(`Error al registrar usuario: ${error.message}`);
    }
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
              value={ name }  // Control del Input
            /></label>
            
          <label><div>Edad: </div> 
            <input 
              onChange={(event)=> {
                setAge(event.target.value);
              }}
              type='number'
              placeholder='Edad'
              value={ age }
            /></label>

          <label><div>Pais: </div> 
            <input 
              onChange={(event)=> {
                setCountry(event.target.value);
              }}
              type='text'
              placeholder='Pais'
              value={ country }
            /></label>

          <label><div>Cargo: </div> 
            <input 
              onChange={(event)=> {
                setCharge(event.target.value);
              }}
              type='text'
              placeholder='Cargo'
              value={ charge }
            /></label>

          <label><div>Años: </div> 
            <input 
              onChange={(event)=> {
                setYears(event.target.value);
              }}
              type='number'
              placeholder='Años'
              value={ years }
            /></label>


          {/* <button
            onClick={add}
          >Registrar</button> */}
          <button onClick={(event)=> {
            event.preventDefault();
            add();
          }}>Registrar</button>
        </form>
      </div>

      <div className="list">
        <button onClick={getEmployees}>Lista de Empleados</button>

        {
          employees.map((val, key)=> {
            return (
              <div className="">
                {val.name}
              </div>
            )
          })
        }

      </div>
    </div>
  )
};