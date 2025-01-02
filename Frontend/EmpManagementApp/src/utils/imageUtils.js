import { isTokenExpired } from "./tokenUtils";

export const fetchImage = async (url) => {
    const token = localStorage.getItem('token');
    if (!token || isTokenExpired(token)) {
        console.log("Token expired");
        return null;
    }
    const response = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${token}`
        }
    }).catch((e) => {
        console.log("Image fetching error: ", e);
    });
    if (response) {
        const blob = await response.blob();
        return URL.createObjectURL(blob);
    }
    return null;
};