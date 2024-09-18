import React from 'react';
import EmployeeRow from './EmployeeRow';

export default function EmployeeList ({ employees, editEmp, deleteEmp }) {
  return (
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
            employees.map((val, index)=> (
              <EmployeeRow
                key = { val.id }
                val = { val }
                index = { index }
                editEmp = { editEmp }
                deleteEmp = { deleteEmp }
              />
            ))
          }
        </tbody>
      </table>
  );
};