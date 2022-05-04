import axios from "axios";
// import dotenv from 'dotenv';
// dotenv.config();
export default axios.create({
  baseURL: process.env.REACT_APP_API || "http://localhost:3001/api",
  // baseURL: 'http://localhost:3001/api',
});
