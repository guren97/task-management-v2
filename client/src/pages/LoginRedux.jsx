import Button from "../ui/Button.jsx";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { login, reset } from "../slice/authSlice.jsx";
import Spinner from "../components/Spinner.jsx";

const Register = () => {
  const [formData, setFormData] = useState({
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
    if (isSuccess || user) navigate("/");
    dispatch(reset());
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
    if (formData.password !== formData.confirm_password) {
      toast.error("Password do not match");
    } else {
      const userData = { ...formData };
      dispatch(login(userData));
    }
  };

  return (
    <>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-start">
          <h1 className="text-2xl font-bold mb-4 items-center">Register</h1>
        </div>
        <div className="p-4 mb-4 w-full"></div>
        <form className="w-full max-w-md mx-auto" onSubmit={onSubmit}>
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
    </>
  );
};

export default Register;
