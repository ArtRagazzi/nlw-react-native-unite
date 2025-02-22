import axios from "axios"

export const api = axios.create({
    baseURL:"http://192.168.15.67:3333"
})

api.get("/user/4")