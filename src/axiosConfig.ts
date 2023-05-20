import axios from "axios";

const tokenFromLocalStorage = localStorage.getItem("token");
export const expressService = axios.create({
    baseURL: "https://orca-app-p95he.ondigitalocean.app/tech-hunter/",
    headers: { Authorization: `Bearer ${tokenFromLocalStorage}` }
});