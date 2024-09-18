import Axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getEmployees = () => Axios.get(`${API_URL}/get/employees`);
export const createEmployee = (employee) => Axios.post(`${API_URL}/create/employee`, employee);
export const updateEmployee = (employee) => Axios.put(`${API_URL}/update/employee`, employee);
export const deleteEmployee = (id) => Axios.delete(`${API_URL}/delete/employee/${id}`);