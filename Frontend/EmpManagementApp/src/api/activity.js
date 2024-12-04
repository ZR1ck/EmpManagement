import axios from "axios";

const host = "http://localhost:8080/" //process.env.REACT_APP_API_URL;

export const getAllApprovalRequest = async (id, token) => {
    if (!id) {
        throw new Error("Manager ID is required");
    }
    const response = await axios.get(host + `api/activity/approval`, {
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

export const updateApprovalRequestStatus = async (ids, status, token) => {
    for (let id of ids) {
        const data = new FormData();
        data.append("activityApprovalId", id);
        data.append("status", status)

        const response = await axios.post(host + "api/activity/update", data, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });

        if (response.data) {
            console.log(response.data);
        } else {
            console.error('Updated failed for: ', id);
        }
    }
}

export const getOnGoingActivities = async (token) => {
    return await axios.get(host + "api/activity/ongoing", {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getActivityById = async (token, id) => {
    return await axios.get(host + `api/activity/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const sendActivityApprovalRequest = async (token, data) => {
    return await axios.post(host + `api/activity/approvalRequest`, data, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    })
}