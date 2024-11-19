export const fetchImage = async (url) => {
    const token = localStorage.getItem('token');
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