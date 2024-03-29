import axios from "axios";

const API_URL = "http://localhost:5000/api/v1/users";

const userRegister = async (userData) => {
  try {
    const config = {
      headers: { "Content-Type": `application/json` },
    };
    const response = await axios.post(API_URL, userData, config);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data; // Return the entire response, not just response.data.data
  } catch (error) {
    // Handle errors here
    console.error("Registration error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const userLogin = async (userData) => {
  try {
    const config = {
      headers: { "Content-Type": `application/json` },
    };
    const response = await axios.post(`${API_URL}/login`, userData, config);
    if (response.data) {
      localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data; // Return the entire response, not just response.data.data
  } catch (error) {
    // Handle errors here
    console.error("Login error:", error);
    throw error; // Re-throw the error to be handled by the caller
  }
};

const authService = { userRegister, userLogin };
export default authService;
