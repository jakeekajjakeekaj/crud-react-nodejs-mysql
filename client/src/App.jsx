import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
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

  // Llama a getEmployees solo cuando el componente se monta
  useEffect(() => { // useEffect básicamente se basa en actuar al momento de detectar un cambio, antes se usaban cosas como para revisar la update sobre algo, pero con las actualizaciones ahora se usa useEffect, para este caso en específico, indicamos que al existir un reenderizado, lo de adentro se cargue, en vez de que se pueda llegar a cargar infinitamente como si de un bucle se tratara
    getEmployees();
  }, []); // [] asegura que solo se ejecute una vez al montar

  return (
    <div className="App">
      <div className="list">
        {/* <button onClick={ getEmployees }>Lista de Empleados</button> */}

        {
          employees.map((val, key)=> {
            return (
              <div key={ key }>
                {val.name}
              </div>
            )
          })
        }
      </div>

      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body input-clamp">

          <div className="input-group mb-3">
            <span className="input-group-text equal-span" id="basic-addon1">Nombre: </span>
            <input type="text"
              onChange={(event)=> {
                setName(event.target.value);
              }}
              className="form-control"
              placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1"
              value={ name }  /* Control del Input */ />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text equal-span" id="basic-addon1">Edad: </span>
              <input type="number"
                onChange={(event)=> {
                  setAge(event.target.value);
                }}
                className="form-control" placeholder="Edad" aria-label="Edad" aria-describedby="basic-addon1"
                value={ age }  /* Control del Input */ />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text equal-span" id="basic-addon1">Pais: </span>
            <input type="text"
              onChange={(event)=> {
                setCountry(event.target.value);
              }}
              className="form-control" placeholder="Pais" aria-label="Pais" aria-describedby="basic-addon1"
              value={ country }  /* Control del Input */ />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text equal-span" id="basic-addon1">Cargo: </span>
              <input type="text"
                onChange={(event)=> {
                  setCharge(event.target.value);
                }}
                className="form-control" placeholder="Cargo" aria-label="Cargo" aria-describedby="basic-addon1"
                value={ charge }  /* Control del Input */ />
          </div>

          <div className="input-group mb-3">
            <span className="input-group-text equal-span" id="basic-addon1">Años: </span>
              <input type="number"
                onChange={(event)=> {
                  setYears(event.target.value);
                }}
                className="form-control" placeholder="Años trabajados" aria-label="Años trabajados" aria-describedby="basic-addon1"
                value={ years }  /* Control del Input */ />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          <button /*className='btn btn-success my-button'*/ className='my-button' onClick={(event)=> {
              event.preventDefault();
              add();
            }}>Registrar</button>
        </div>
      </div>

    </div>
  )
};