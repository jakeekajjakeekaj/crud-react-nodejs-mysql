import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';

export default function App() {

  // Para gestionar los datos que lleguen a través de los inputs
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [country, setCountry] = useState("");
  const [charge, setCharge] = useState("");
  const [years, setYears] = useState("");
  const [id, setId] = useState("");

  const [employees, setEmployees] = useState([]);

  const [edit, setEdit] = useState(false);

  const MySwal = withReactContent(Swal);

  function validateForm (originalEmployee) {
    if (
      name === originalEmployee.name &&
      age === originalEmployee.age &&
      country === originalEmployee.country &&
      charge === originalEmployee.charge &&
      years === originalEmployee.years
    ) {
      return true; // No se realizaron cambios, proceder sin validar
    }
    
    validateForm();
  }

  function validateForm () {
    if (!name || !age || !country || !charge || !years) {
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        timer: 3500
      });
      return false;
    }
  
    if (age <= 0 || years < 0) {
      MySwal.fire({
        title: "Error",
        text: "La edad y los años de experiencia deben ser mayores que 0.",
        icon: "error",
        timer: 3500
      });
      return false;
    }
    return true;
  };
  
    

  const add = async ()=> {
    try {
      // alert(name);
    await Axios.post('http://localhost:3000/api/create/employee', {
      name,
      age,
      country,
      charge,
      years
    });

    getEmployees();
    // alert("Empleado Registrado");

    // Resetea los valores de los inputs
    // setName("");
    // setAge("");
    // setCountry("");
    // setCharge("");
    // setYears("");
    limpiarCampos();
    MySwal.fire({
      title: "Registro Exitoso!",
      text: `El usuario ${name} fue registrado`,
      icon: "success",
      timer: 3500
    });
    // alert("Empleado Registrado");
    } catch (error) {
      MySwal.fire({
        title: "Ooops...",
        text: "Error al agregar el usuario",
        icon: "error",
        // footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
        timer: 3500
      });
      // alert(`Error al registrar usuario: ${error.message}`);
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

  const update = async (originalEmployee)=> {
    // Verificar si originalEmployee es válido
    if (!originalEmployee) {
      MySwal.fire({
        title: "Error",
        text: "No se encontró el empleado a actualizar.",
        icon: "error",
        timer: 3500
      });
      return;
    };

    console.log("pasa 1");

    if(validateForm(originalEmployee)) {
      try {
      console.log("pasa 2");
      console.log(`${id} ${name} ${age} ${country} ${charge} ${years}`);
        // alert(name);
      await Axios.put('http://localhost:3000/api/update/employee', {
        id,
        name,
        age: parseInt(age),
        country,
        charge,
        years: parseInt(years)
      });
    console.log("pasa 3");
  
      await getEmployees();
      // alert("Empleado Actualizado");
      setEdit(false);
      limpiarCampos();
      MySwal.fire({
        title: "Registro Actualizado!",
        text: `El usuario ${name} fue actualizado`,
        icon: "success",
        timer: 3500
      });
      // alert("Empleado Registrado");
      } catch (error) {
        // alert(`Error al registrar usuario: ${error.message}`);
        MySwal.fire({
          title: "Oooops...",
          text: "Error al actualizar el usuario",
          icon: "error",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
          timer: 3500
        });
      }
    }
  };

  const deleteEmp = async (id, name)=> {
    const result = await MySwal.fire({
      title: "¿Estás seguro?",
      text: `Eliminarás al usuario ${name} de forma permanente`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Si, deseo eliminar!",
      cancelButtonText: "Cancelar",
    });

    if (result.isConfirmed) {
      try {
        // alert(name);
        await Axios.delete(`http://localhost:3000/api/delete/employee/${id}`);

        await getEmployees();
        // alert("Empleado Actualizado");
        // limpiarCampos();
        await MySwal.fire({
          title: "Eliminado!",
          text: `El usuario ${name} ha sido eliminado.`,
          icon: "success",
          timer: 2500
        });
        // alert("Empleado Registrado");
      } catch (error) {
        // alert(`Error al eliminar usuario: ${error.message}`);
        MySwal.fire({
          title: "Oooops",
          text: "Error al eliminar el usuario",
          icon: "error",
          footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
          timer: 3500
        });
      }
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
      const res = await Axios.get('http://localhost:3000/api/get/employees');
      // console.log("pasa 2");
      setEmployees(res.data);
      // alert("Get");
    } catch (error) {
      // alert(`Error al registrar usuario: ${error.message}`);
      MySwal.fire({
        title: "Oooops",
        text: "Error al obtener los usuarios",
        icon: "error",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
        timer: 3500
      });
    }
  };

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
  };

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
                const originalEmployee = employees.find(emp => emp.id === id);  // Busca el empleado original
                if (validateForm(originalEmployee)){
                  update(originalEmployee);
                };
                // update();
              }}>Actualizar</button> 
              <button /*className='btn btn-success my-button'*/ className='btn btn-info mx-1' onClick={(event)=> {
                event.preventDefault();
                setEdit(false);
                limpiarCampos();
              }}>Cancelar</button>
            </div>
            : <button /*className='btn btn-success my-button'*/ className='my-button' onClick={(event)=> {
              event.preventDefault();
              if (validateForm()) add();
              // add();
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
            <th scope="col">No</th>
            {/* <th scope="col">#</th> */}
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
            employees.map((val, index)=> {
              return (
                <tr key={ val.id }>
                  <th scope="row">{ index + 1 }</th>
                  {/* <td scope="row">{ val.id }</td> */}
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

                    <button type="button"
                    onClick={ ()=> {
                      deleteEmp(val.id, val.name)
                    } }
                    className="btn btn-danger">Eliminar</button>
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