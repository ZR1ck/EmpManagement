import axios from "axios";

const host = process.env.REACT_APP_API_URL;

export const countAttendanceRecords = async (id, token) => {
    if (!id) {
        throw new Error("ID is required");
    }
    return await axios.get(host + `api/attendance/working-days/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const countAbsentRecords = async (id, token) => {
    if (!id) {
        throw new Error("ID is required");
    }
    return await axios.get(host + `api/attendance/absent-days/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const countTeamPresent = async (id, token) => {
    if (!id) {
        throw new Error("ID is required");
    }
    return await axios.get(host + `api/attendance/working/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const countTeamAbsent = async (id, token) => {
    if (!id) {
        throw new Error("ID is required");
    }
    return await axios.get(host + `api/attendance/absent/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}

export const getCurrentAttendanceRecord = async (id, token) => {
    if (!id) {
        throw new Error("ID is required");
    }
    return await axios.get(host + `api/attendance/today/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}