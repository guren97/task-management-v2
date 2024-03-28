import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../ui/Button.jsx";

import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((formData) => ({
      ...formData,
      [e.target.id]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/v1/users/login",
        formData
      );
      navigate("/dashboard");
      console.log(response.data); // Data returned by the server after successful POST
      return response;
    } catch (error) {
      navigate("/login");
      console.error("Error Logging in user:", error);

      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold mb-4 items-center">Login</h1>
      </div>

      <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
            autoComplete="off"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="password" className="block text-sm mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
          />
        </div>
        <Button type="submit">Register</Button>
      </form>
    </div>
  );
};

export default Login;
