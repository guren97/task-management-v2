import { useState } from "react";
import Button from "../ui/Button.jsx";
import axios from "axios";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
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
        "http://localhost:5000/api/v1/users",
        formData
      );
      console.log(response.data); // Data returned by the server after successful POST
      return response;
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  };

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex justify-start">
        <h1 className="text-2xl font-bold mb-4 items-center">Register</h1>
      </div>

      <form className="w-full max-w-md mx-auto" onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="username" className="block text-sm mb-1">
            Username
          </label>
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={formData.username}
            onChange={handleChange}
            className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
          />
        </div>
        {/* Add responsive classes to adjust layout on smaller screens */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="first_name" className="block text-sm mb-1">
              First Name
            </label>
            <input
              type="text"
              id="first_name"
              placeholder="First Name"
              value={formData.first_name}
              onChange={handleChange}
              className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
            />
          </div>
          <div>
            <label htmlFor="last_name" className="block text-sm mb-1">
              Last Name
            </label>
            <input
              type="text"
              id="last_name"
              placeholder="Last Name"
              value={formData.last_name}
              onChange={handleChange}
              className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
            />
          </div>
        </div>
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

export default Register;
