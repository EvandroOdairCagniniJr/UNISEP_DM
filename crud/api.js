import axios from "axios";

const api = axios.create({
    baseURL: "http://172.18.0.142:8080",
});
 
export default api;