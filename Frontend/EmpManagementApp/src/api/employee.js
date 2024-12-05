import axios from "axios";


const host = process.env.REACT_APP_API_URL;

export const getEmployeeById = async (empId, token) => {
    return await axios.get(host + `api/employee/${empId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const getEmployeeByDept = async (deptno, token) => {
    return await axios.get(host + `api/employees/dept/${deptno}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}