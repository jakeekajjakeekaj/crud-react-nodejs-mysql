import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();  // Inicializa dotenv

const pool = mysql
  .createPool({
    // Las mayúsculas son variables de entorno
    host : process.env.MYSQL_HOST,
    user : process.env.MYSQL_USER,
    password : process.env.MYSQL_PASSWORD,
    database : process.env.MYSQL_DATABASE,
  })
  .promise();

// GET EMPLOYEE

export async function getEmployees() {
  const [rows] = await pool.query(
    `
      SELECT * FROM employees;
    `
  );

  return rows;
};

// POST EMPLOYEE

export async function createEmployee(name, age, country, charge, years) {
  const [result] = await pool.query(  // [result] es utilizado como desesctructuración de nuestra pool, para este caso se puede utilizar [rows] o [result], generalmente [rows] suele ser el primer dato, este se suele mostrar en forma de filas y corresponde más a cuando se usa SELECT, sin embargo [result] es otro dato de la desesctrucutración, y es el que se encarga de checar por ejemplo ya los metadatos y ese tipo de cosas, básicamente información generada al utilizar INSERT, UPDATE, DELETE, etc.
    `
      INSERT INTO employees (name, age, country, charge, years) VALUES (?, ?, ?, ?, ?);
    `, [name, age, country, charge, years]
  );

  // employeeID = result.insertId;
  return result;
};

// PUT EMPLOYEE

export async function updateEmployee(id, name, age, country, charge, years) {
  // console.log(`func ${id} ${name} ${age} ${country} ${charge} ${years}`);
  const [result] = await pool.query(
    `
      UPDATE employees SET name=?, age=?, country=?, charge=?, years=?
      WHERE id = ?;
    `, [name, age, country, charge, years, id]
  );
  return result;
};

// DELETE EMPLOYEE

export async function deleteEmployee(id) {
  const [result] = await pool.query(
    `
      DELETE FROM employees WHERE id = ? 
    `, id
  );
  return result;
};