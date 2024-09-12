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
  const [id, setId] = useState("");

  const [employees, setemployees] = useState([]);

  const [edit, setEdit] = useState(false);

  const add = async ()=> {
    try {
      // alert(name);
    Axios.post('http://localhost:3000/api/create/employee', {
      name,
      age,
      country,
      charge,
      years
    }).then(()=> {
      getEmployees();
      alert("Empleado Registrado");

      // Resetea los valores de los inputs
      // setName("");
      // setAge("");
      // setCountry("");
      // setCharge("");
      // setYears("");
      limpiarCampos();
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
  };

  const update = async ()=> {
    try {
      // alert(name);
    Axios.put('http://localhost:3000/api/update/employee', {
      id,
      name,
      age,
      country,
      charge,
      years
    }).then(()=> {
      getEmployees();
      alert("Empleado Actualizado");
      setEdit(false);
      limpiarCampos();
    });
    // alert("Empleado Registrado");
    } catch (error) {
      alert(`Error al registrar usuario: ${error.message}`);
    }
  };

  const limpiarCampos = async ()=> {
    // Resetea los valores de los inputs
    setName("");
    setAge("");
    setCountry("");
    setCharge("");
    setYears("");
  };

  const getEmployees = async ()=> {
    try {
    // console.log("pasa 1");
    Axios.get('http://localhost:3000/api/get/employees').then((res)=> {
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

  const editEmployee = (val)=> {
    setEdit(true);

    setName(val.name);
    setAge(val.age);
    setCountry(val.country);
    setCharge(val.charge);
    setYears(val.years);
    setId(val.id);
  }

  return (
    <div className="App">
      {/* <div className="list"> */}
        {/* <button onClick={ getEmployees }>Lista de Empleados</button> */}

        {/* {
          employees.map((val, key)=> {
            return (
              <div key={ key }>
                {val.name}
              </div>
            )
          })
        }
      </div> */}

      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        <div className="card-body box-clamp">

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
            <span className="input-group-text equal-span" id="basic-addon1">País: </span>
            <input type="text"
              onChange={(event)=> {
                setCountry(event.target.value);
              }}
              className="form-control" placeholder="País" aria-label="Pais" aria-describedby="basic-addon1"
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
                className="form-control" placeholder="Años de Experiencia" aria-label="Años de Experiencia" aria-describedby="basic-addon1"
                value={ years }  /* Control del Input */ />
          </div>
        </div>
        <div className="card-footer text-body-secondary">
          {
            edit == true ?
            <div>
              <button /*className='btn btn-success my-button'*/ className='btn btn-warning mx-1' onClick={(event)=> {
                event.preventDefault();
                update();
              }}>Actualizar</button> 
              <button /*className='btn btn-success my-button'*/ className='btn btn-info mx-1' onClick={(event)=> {
                event.preventDefault();
                setEdit(false);
                limpiarCampos();
              }}>Cancelar</button>
            </div>
            : <button /*className='btn btn-success my-button'*/ className='my-button' onClick={(event)=> {
              event.preventDefault();
              add();
            }}>Registrar</button>
          }
          {/* <button className='my-button' onClick={(event)=> {
              event.preventDefault();
              add();
            }}>Registrar</button> */}
        </div>
      </div>

      <table className="table table-striped box-clamp">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Nombre</th>
            <th scope="col">Edad</th>
            <th scope="col">País</th>
            <th scope="col">Cargo</th>
            <th scope="col">Experiencia</th>
            <th scope="col">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {
            employees.map((val, key)=> {
              return (
                <tr key={ key }>
                  <th scope="row">{ val.id }</th>
                  <td>{ val.name }</td>
                  <td>{ val.age }</td>
                  <td>{ val.country }</td>
                  <td>{ val.charge }</td>
                  <td>{ val.years }</td>
                  <td>
                  <div className="btn-group" role="group" aria-label="Basic example">
                    <button type="button"
                    onClick={ ()=> {
                      editEmployee(val);
                    } }
                    className="btn btn-info">Editar</button>
                    <button type="button" className="btn btn-danger">Eliminar</button>
                  </div>
                  </td>
                </tr>
                // <div key={ key }>
                //   {val.name}
                // </div>
              )
            })
          }
        </tbody>
      </table>

    </div>
  )
};