// Si no tuviéramos el "type": "module" decladaro en nuestro package.json, la de abajo sería la manera correcta de mandar a llamar a express, pero al modificiarlo ya podemos importarlo de manera convencional
// const express = require('express');

import express from 'express';
import cors from 'cors';
import {
  createEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee
} from './database.js';

const corsOptions = {
  origin : ['http://127.0.0.1:5173', 'http://localhost:5173'],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials : true, // Permite enviar credenciales (cookies, autenticaciones)
};

const app = express();
app.use(express.json());  // Este es importante para poder usar express con solicitudes en formato JSON
app.use(cors(corsOptions));

// -- GET --

app.get("/api/get/employees", async(req, res)=> {
  try {
    const employees = await getEmployees();
    res.status(201).send(employees);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: `Internal Server Error: ${err}` });
  }
});

// -- POST --

app.post("/api/create/employee", async(req, res)=> {
  try {
    const { name, age, country, charge, years } = req.body;

    // Validación básica de los datos
    if (!name || !age || !country || !charge || !years) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
  
    const employee = await createEmployee(name, age, country, charge, years);
    // console.log("SQL EJECUTADO");
    res.status(201).send(employee);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// -- PUT --

app.put("/api/update/employee", async(req, res)=> {
  try {
    const { id, name, age, country, charge, years } = req.body;

    // Validación básica de los datos
    if (!id || !name || !age || !country || !charge || !years) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }

    // Validación adicional si es necesario
    if (typeof id !== 'number' || typeof name !== 'string' || 
      typeof age !== 'number' || typeof country !== 'string' || 
      typeof charge !== 'string' || typeof years !== 'number') {
      return res.status(400).send({ error: "Formato de datos incorrecto" });
    }

    // console.log(`${id} ${name} ${age} ${country} ${charge} ${years}`);
    
    const employee = await updateEmployee(id, name, age, country, charge, years);
    // console.log("SQL EJECUTADO");
    res.status(200).send(employee);
  } catch(err) {
    console.log(`Error en la actualizacion ${err}`);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

// -- DELETE --

app.delete("/api/delete/employee/:id", async(req, res)=> {
  try {
    const { id } = req.params;  // Es decir de los parámetros que se enviarán vía URL

    // Validación básica de los datos
    if (!id) {
      return res.status(400).send({ error: "Todos los campos son obligatorios" });
    }
  
    const employee = await deleteEmployee(id);
    // console.log("SQL EJECUTADO");
    res.status(201).send(employee);
  } catch(err) {
    console.log(err);
    res.status(500).send({ error: "Internal Server Error" });
  }
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, ()=> console.log(`Server is listening on port ${PORT}...`));