import axios from "axios";

export const baseUrl = `http://localhost:2525/api/user/quries`;

const apiUserQueryHandle = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiUserQueryHandle;
