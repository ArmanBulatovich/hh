import axios from "axios";

const tokenFromLocalStorage = localStorage.getItem("token");
export const expressService = axios.create({
    baseURL: "https://seahorse-app-w3duo.ondigitalocean.app/tech-hunter/",
    headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
});