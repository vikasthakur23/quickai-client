import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL || "https://quickai-server-fp2s.onrender.com";

export default axios;
