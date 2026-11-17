import axios from "axios";

const api = axios.create({
    baseURL: "http://54.232.189.113:8080"
});

export default api;
