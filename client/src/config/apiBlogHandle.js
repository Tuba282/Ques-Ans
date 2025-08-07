import axios from "axios"

export const baseUrl = `http://localhost:2525/api/blogs`
// export const baseUrl = `https://full-fledge-server.vercel.app/api/auth`

export const apiBlogHandle = axios.create({
    baseURL: baseUrl,
    headers: {
        'Content-Type': 'application/json',
    },
})