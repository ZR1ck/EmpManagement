import axios from "axios";

const host = "http://localhost:8080/"

export const getReward = async (token, year = '', month = '', managerId) => {

    if (year === '' && month === '') {
        return await axios.get(host + `api/reward/all?managerId=${managerId}`, {
            headers: {
                Authorization: `Bearer ${token}`,
            }
        });
    }
    return await axios.get(host + `api/reward/date?managerId=${managerId}&year=${year}&month=${month}`, {
        headers: {
            Authorization: `Bearer ${token}`,
        }
    });
}

export const getRewardPDF = async (token, ids, managerId) => {
    try {
        const promises = ids.map((id) =>
            axios.get(host + `api/reward/generate-reward-pdf/${id}?managerId=${managerId}`, {
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

            // Lấy tên file từ header Content-Disposition
            const contentDisposition = response.headers['content-disposition'];
            let filename = 'file_' + index + '.pdf';  // Giá trị mặc định nếu không có tên file trong header

            if (contentDisposition) {
                const matches = /filename="(.+)"/.exec(contentDisposition);
                if (matches && matches[1]) {
                    filename = matches[1];  // Lấy tên file từ Content-Disposition
                }
            }

            link.download = filename;
            link.click();
        });

    } catch (error) {
        console.error('Error downloading files:', error);
    }
}