import axios from "axios";

export const baseUrl = `http://localhost:2525/api/admin/quries`;

const apiAdminQueryHandle = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default apiAdminQueryHandle;
