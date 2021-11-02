import axios from 'axios';


const EMPLOYEE_API_BASE_URL = "https://spring-boot-employee-backend.herokuapp.com/api/v1/employees";
// const EMPLOYEE_API_BASE_URL = "/api/v1/employees";


class EmployeeService {

    getEmployees() {
        return axios.get(EMPLOYEE_API_BASE_URL);
    }

    createEmployee(employee) {
        return axios.post(EMPLOYEE_API_BASE_URL, employee);
    }

    getEmployeeById(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    updateEmployee(employee, employeeId) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId, employee);
    }

    deleteEmployee(employeeId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId);
    }

    getEmployeeTasks(employeeId) {
        return axios.get(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/tasks');
    }

    createEmployeeTask(employeeId, task) {
        return axios.post(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/tasks', task);
    }

    deleteEmployeeTask(employeeId, taskId) {
        return axios.delete(EMPLOYEE_API_BASE_URL + '/' + employeeId + '/tasks/' +  taskId)
    }

    updateEmployeeTask(employeeId, taskId, task) {
        return axios.put(EMPLOYEE_API_BASE_URL + '/' + employeeId + "/tasks/"  + taskId, task);
    }



}

export default new EmployeeService();