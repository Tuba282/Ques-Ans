import axios from "axios"

export const baseUrl = `http://localhost:2525/api/quries`
// export const baseUrl = `https://ques-ans-teal.vercel.app/api/upload`
// export const baseUrl = `https://full-fledge-server.vercel.app/api/upload`

const apiUploadHandle = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})

export default apiUploadHandle