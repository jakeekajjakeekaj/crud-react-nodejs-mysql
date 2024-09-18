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
      if (isFormValid(currentEmployee, originalEmployee)) {
        updateEmployee(currentEmployee);
      }
    } else {
      if (isFormValid(currentEmployee)) addNewEmployee();
    }
  };

  const handleCancel = () => {
    setEdit(false);
    clearFields();
  };

  // Función centralizada para validar el formulario
  const isFormValid = (employeeData, originalEmployee = null) => {
    // Validar que los datos no sean iguales al empleado original en caso de edición
    if (originalEmployee) {
      if (
        employeeData.name === originalEmployee.name &&
        employeeData.age === originalEmployee.age &&
        employeeData.country === originalEmployee.country &&
        employeeData.charge === originalEmployee.charge &&
        employeeData.years === originalEmployee.years
      ) {
        return true; // No se hicieron cambios
      }
    }

    // Validar campos vacíos
    if (!employeeData.name || !employeeData.age || !employeeData.country || !employeeData.charge || !employeeData.years) {
      MySwal.fire({
        title: "Error",
        text: "Por favor, completa todos los campos.",
        icon: "error",
        timer: 3500
      });
      return false;
    }

    // Validar que la edad y años de experiencia sean mayores a 0
    if (employeeData.age <= 0 || employeeData.years < 0) {
      MySwal.fire({
        title: "Error",
        text: "La edad y los años de experiencia deben ser mayores que 0.",
        icon: "error",
        timer: 3500
      });
      return false;
    }

    return true; // Formulario válido
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
    let errorMessage = message;
    let detailedError = null;

    if (error.response) {
      // Errores del servidor
      detailedError = error.response.data.message || error.response.data || 'Error del servidor';
    } else if (error.request) {
      // Errores de red o falta de respuesta del servidor
      detailedError = "No se pudo contactar al servidor. Por favor, intente más tarde.";
    } else {
      // Otros errores (ej. errores de código o de configuración)
      detailedError = error.message;
    }

    MySwal.fire({
      title: "Oooops...",
      text: errorMessage,
      icon: "error",
      footer: detailedError,
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