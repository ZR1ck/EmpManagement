import axios from "axios";

const host = process.env.REACT_APP_API_URL;

export const getAllRequest = async (id, token) => {
    if (!id) {
        throw new Error("Manager ID is required");
    }
    const response = await axios.get(host + `api/requests/all`, {
        params: {
            managerId: id
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (response.data) {
        return response.data;
    }
}



export const getRequest = async (reqId, requestType, token) => {
    const response = await axios.get(host + `api/` + getRequestTypePath(requestType), {
        params: {
            requestId: reqId
        },
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })

    if (response.data) {
        return response.data;
    }
}

const getRequestTypePath = (type) => {
    switch (type) {
        case "LeaveRequest": return "leaveRequest"
        case "HalfDayLeaveRequest": return "halfDayLeaveRequest"
        case "TimeAttendanceUpdateRequest": return "TAURequest"
        case "WFHRequest": return "WFHRequest"
        default: return "request"
    }
}

export const getRecognitionUpdateRequest = async (token, managerId) => {
    return await axios.get(host + `api/requests/recognition?managerId=${managerId}`,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
}

export const downloadFile = async (urls, token) => {
    try {
        const promises = urls.map((url) =>
            axios.get(host + 'file/' + url, {
                responseType: 'blob',
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
        );

        const responses = await Promise.all(promises);

        responses.forEach((response, index) => {
            const blob = response.data;

            const link = document.createElement('a');
            link.href = URL.createObjectURL(blob);

            const filename = urls[index].split('/').pop();
            link.download = filename;

            link.click();
        });
    } catch (error) {
        console.error('Error downloading files:', error);
    }
};

export const approveRequest = async (requests, status, token) => {
    for (let request of requests) {
        const data = new FormData();
        data.append("requestId", request.requestId);
        data.append("status", status)
        data.append("requestType", request.source);

        const response = await axios.post(host + "api/" + getRequestTypePath(request.source) + "/approve", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.data) {
            console.log(response.data);
        } else {
            console.error('Updated failed for: ', request.requestId);
        }
    }
}

export const getLeaveDaysLeft = async (empId, currentYear, token) => {
    return await axios.get(host + `api/leaveTypes/${empId}/${currentYear}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const sendLeaveRequest = async (isHalfDay, data, token) => {
    return await axios.post(host + `api/${!isHalfDay ? 'leaveRequest' : 'halfDayLeaveRequest'}`,
        data, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    });
}

export const approveRURequest = async (requests, status, token, reason = "") => {
    for (let request of requests) {
        const data = new FormData();
        data.append("requestId", request);
        data.append("status", status)
        data.append("declineReason", reason);

        const response = await axios.post(host + "api/RURequest/approve", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.data) {
            console.log(response.data);
        } else {
            console.error('Updated failed for: ', request.requestId);
        }
    }
}