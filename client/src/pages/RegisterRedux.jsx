import Button from "../ui/Button.jsx";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { register, reset } from "../slice/authSlice.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    first_name: "",
    last_name: "",
    email: "",
    password: "",
  });

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // Correct import of useSelector
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth || {} // Ensure state.auth is defined and provide default value if undefined
  );

  useEffect(() => {
    if (isError) toast.error(message); // Ensure message is correctly spelled
    if (isSuccess || user) dispatch(reset());
  }, [user, isLoading, isError, isSuccess, message, dispatch, navigate]); // Add missing dependencies

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value.trim(), // Ensure trimming is done properly
    });
  };

  //Remove if register function and loaders and com-plete
  console.log(formData);

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { ...formData };
    dispatch(register(userData));
  };

  // const config = {
  //   headers: { "Content-Type": `application/json` },
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //   try {
  //     const response = await axios.post(
  //       "http://localhost:5000/api/v1/users",
  //       formData,
  //       config
  //     );
  //     if (!response.data.ok) {
  //       setError(response.data.message);
  //       return;
  //     }
  //     console.log(response.data);
  //   } catch (error) {
  //     setError("Server Error");
  //   }
  // };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold mb-4 items-center">Register</h1>
        </div>
        <div className="p-4 mb-4 w-full"></div>
        <form className="w-full max-w-md mx-auto" onSubmit={onSubmit}>
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
          {/* <div className="mb-4">
            <label htmlFor="password" className="block text-sm mb-1">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={formData.confirm_password}
              onChange={handleChange}
              className="border rounded-sm p-2 w-full focus:placeholder:text-slate-300 focus:outline-none hover:border-slate-500"
            />
          </div> */}
          <Button type="submit">Register</Button>
        </form>
      </div>
    </>
  );
};

export default Register;
