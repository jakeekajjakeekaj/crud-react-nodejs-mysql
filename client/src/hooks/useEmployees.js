import { useState, useEffect } from 'react';
import Swal from 'sweetalert2';
import withReactContent from 'sweetalert2-react-content';
import {
  getEmployees as fetchEmployees,
  createEmployee as addEmployee,
  updateEmployee as modifyEmployee,
  deleteEmployee as removeEmployee
} from '../services/employeeServices.js';

export const useEmployees = () => {
  const [employees, setEmployees] = useState([]);
  const [edit, setEdit] = useState(false);
  const [currentEmployee, setCurrentEmployee] = useState({
    name: "",
    age: "",
    country: "",
    charge: "",
    years: "",
    id: ""
  });

  const MySwal = withReactContent(Swal);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (edit) {
      const originalEmployee = employees.find(emp => emp.id === currentEmployee.id);
      if (validateForm(originalEmployee)) {
        updateEmployee(currentEmployee);
      }
    } else {
      if (validateForm()) addNewEmployee();
    }
  };

  const handleCancel = () => {
    setEdit(false);
    clearFields();
  };

  const validateForm = (originalEmployee) => {
    if (
      currentEmployee.name === originalEmployee?.name &&
      currentEmployee.age === originalEmployee?.age &&
      currentEmployee.country === originalEmployee?.country &&
      currentEmployee.charge === originalEmployee?.charge &&
      currentEmployee.years === originalEmployee?.years
    ) {
      return true; // Sin cambios
    }

    if (!currentEmployee.name || !currentEmployee.age || !currentEmployee.country || !currentEmployee.charge || !currentEmployee.years) {
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        timer: 3500
      });
      return false;
    }

    if (currentEmployee.age <= 0 || currentEmployee.years < 0) {
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

  const addNewEmployee = async () => {
    try {
      await addEmployee(currentEmployee);
      fetchAllEmployees();
      clearFields();
      MySwal.fire({
        title: "Registro Exitoso!",
        text: `El usuario ${currentEmployee.name} fue registrado`,
        icon: "success",
        timer: 3500
      });
    } catch (error) {
      showError(error, "Error al agregar el usuario");
    }
  };

  const updateEmployee = async () => {
    try {
      await modifyEmployee(currentEmployee);
      fetchAllEmployees();
      setEdit(false);
      clearFields();
      MySwal.fire({
        title: "Registro Actualizado!",
        text: `El usuario ${currentEmployee.name} fue actualizado`,
        icon: "success",
        timer: 3500
      });
    } catch (error) {
      showError(error, "Error al actualizar el usuario");
    }
  };

  const deleteEmployee = async (id, name) => {
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
        await removeEmployee(id);
        fetchAllEmployees();
        MySwal.fire({
          title: "Eliminado!",
          text: `El usuario ${name} ha sido eliminado.`,
          icon: "success",
          timer: 2500
        });
      } catch (error) {
        showError(error, "Error al eliminar el usuario");
      }
    }
  };

  const fetchAllEmployees = async () => {
    try {
      const res = await fetchEmployees();
      setEmployees(res.data);
    } catch (error) {
      showError(error, "Error al obtener los usuarios");
    }
  };

  const showError = (error, message) => {
    MySwal.fire({
      title: "Oooops...",
      text: message,
      icon: "error",
      footer: JSON.parse(JSON.stringify(error)).message === "Network Error" ? "Intente más tarde" : JSON.parse(JSON.stringify(error)),
      timer: 3500
    });
  };

  const clearFields = () => {
    setCurrentEmployee({
      name: "",
      age: "",
      country: "",
      charge: "",
      years: "",
      id: ""
    });
  };

  const editEmployee = (employee) => {
    setEdit(true);
    setCurrentEmployee(employee);
  };

  // Cargar empleados al montar el hook
  useEffect(() => {
    fetchAllEmployees();
  }, []);

  return {
    employees,
    edit,
    currentEmployee,
    handleSubmit,
    handleCancel,
    editEmployee,
    deleteEmployee,
    setCurrentEmployee
  };
};