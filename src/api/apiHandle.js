import axios from "axios"

// export const BASE_URL="http://localhost:3006/api"
export const BASE_URL="https://blogera.herokuapp.com/api"

export const publicRequest=axios.create({
    baseURL:BASE_URL
})