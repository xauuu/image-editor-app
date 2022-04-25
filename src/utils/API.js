import axios from "axios";

export default axios.create({
  baseURL: "http://192.168.123.86:8000",
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "multipart/form-data",
  }
});