import React from 'react';

export default function EmployeeForm({ 
  name, setName, 
  age, setAge, 
  country, setCountry, 
  charge, setCharge, 
  years, setYears, 
  edit, handleSubmit, handleCancel 
}) {
  return (
    <div className="card-body box-clamp">
      <div className="input-group mb-3">
        <span className="input-group-text equal-span" id="basic-addon1">Nombre: </span>
        <input type="text"
          onChange={(event) => setName(event.target.value)}
          className="form-control"
          placeholder="Nombre" aria-label="Nombre" aria-describedby="basic-addon1"
          value={name} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text equal-span" id="basic-addon1">Edad: </span>
        <input type="number"
          onChange={(event) => setAge(event.target.value)}
          className="form-control"
          placeholder="Edad" aria-label="Edad" aria-describedby="basic-addon1"
          value={age} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text equal-span" id="basic-addon1">País: </span>
        <input type="text"
          onChange={(event) => setCountry(event.target.value)}
          className="form-control"
          placeholder="País" aria-label="Pais" aria-describedby="basic-addon1"
          value={country} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text equal-span" id="basic-addon1">Cargo: </span>
        <input type="text"
          onChange={(event) => setCharge(event.target.value)}
          className="form-control"
          placeholder="Cargo" aria-label="Cargo" aria-describedby="basic-addon1"
          value={charge} />
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text equal-span" id="basic-addon1">Años: </span>
        <input type="number"
          onChange={(event) => setYears(event.target.value)}
          className="form-control"
          placeholder="Años de Experiencia" aria-label="Años de Experiencia" aria-describedby="basic-addon1"
          value={years} />
      </div>

      <div className="card-footer text-body-secondary">
        {edit ? (
          // FRAGMENTO
          <>
            <button className='btn btn-warning mx-1' onClick={handleSubmit}>Actualizar</button>
            <button className='btn btn-info mx-1' onClick={handleCancel}>Cancelar</button>
          </>
        ) : (
          <button className='btn btn-success my-button' onClick={handleSubmit}>Registrar</button>
        )}
      </div>
    </div>
  );
};