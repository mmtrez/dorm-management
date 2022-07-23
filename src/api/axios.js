import axios from "axios";

export default axios.create({
  baseURL: "https://dorm-management-api.vercel.app/api",
});
