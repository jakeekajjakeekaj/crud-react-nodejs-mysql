import React, { useState, useEffect } from 'react';
// import Axios from 'axios';
import {
  getEmployees as fetchEmployees,
  createEmployee as addEmployee,
  updateEmployee as modifyEmployee,
  deleteEmployee as removeEmployee
} from './services/employeeServices.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import EmployeeList from './components/EmployeeList.jsx';
import EmployeeForm from './components/EmployeeForm.jsx';

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

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      const originalEmployee = employees.find(emp => emp.id === id);
      if (validateForm(originalEmployee)) {
        update(originalEmployee);
      }
    } else {
      if (validateForm()) add();
    }
  };

  const handleCancel = () => {
    setEdit(false);
    limpiarCampos();
  };

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
    const newEmployeeData = {
      name,
      age,
      country,
      charge,
      years
    };
    // console.log(newEmployeeData);
    await addEmployee(newEmployeeData);


    getEmployees();
  
    limpiarCampos();
    MySwal.fire({
      title: "Registro Exitoso!",
      text: `El usuario ${name} fue registrado`,
      icon: "success",
      // footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
      timer: 3500
    });
    // alert("Empleado Registrado");
    } catch (error) {
      MySwal.fire({
        title: "Ooops...",
        text: "Error al agregar el usuario",
        icon: "error",
        footer: JSON.parse(JSON.stringify(error)).message==="Network Error"?"Intente más tarde":JSON.parse(JSON.stringify(error)),
        timer: 3500
      });
      // alert(`Error al registrar usuario: ${error.message}`);
    }
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

    // console.log("pasa 1");

    if(validateForm(originalEmployee)) {
      try {
    const updatedData = {
      id,
      name,
      age: parseInt(age),
      country,
      charge,
      years: parseInt(years)
    };
    await modifyEmployee(updatedData);
  
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
        const employeeId = id;
        await removeEmployee(employeeId);

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
    // console.log("pasa limpiar campos");
  };

  const getEmployees = async ()=> {
    try {
      const res = await fetchEmployees();
      // console.log("pasa 2");
      setEmployees(res.data);
      // alert("Get");
      // console.log("pasa getEmployees");
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

  const editEmp = (val)=> {
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
    
      <div className="card text-center">
        <div className="card-header">
          GESTIÓN DE EMPLEADOS
        </div>
        {/* FORMULARIO DE EMPLEADOS */}
        <EmployeeForm 
          name={name} setName={setName}
          age={age} setAge={setAge}
          country={country} setCountry={setCountry}
          charge={charge} setCharge={setCharge}
          years={years} setYears={setYears}
          edit={edit}
          handleSubmit={handleSubmit}
          handleCancel={handleCancel}
        />
      </div>

      {/* table */}
      <EmployeeList 
      employees = { employees }
      editEmp = { editEmp }
      deleteEmp = { deleteEmp }
      />
    </div>
  )
};