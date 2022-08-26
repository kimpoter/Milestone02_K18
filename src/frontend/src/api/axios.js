import axios from "axios";
export default axios.create({
  baseURL: `${process.env.REACT_APP_SERVER_URL}`,
  headers: {
    Authorization: `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`,
  },
  withCredentials: true,
});
