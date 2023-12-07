import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { store } from "../redux/store";
import  {loadUser} from "../redux/actions/userAction";

export default function SignIn() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    await axios
      .post("/api/auth/signin", formData, { withCredentials: true })
      .then((res) => {
        setLoading(false);
        toast.success("Login Success!");
        store.dispatch(loadUser());
        navigate("/"); 
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }
  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center p-5 font-mono gap-5 max-w-7xl mx-auto">
      <div className="bg-slate-400 flex flex-col justify-center w-full gap-5 p-5 text-white items-center">
        <h1 className="font-semibold text-3xl sm:text-4xl text-center">
          Welcome Back!
        </h1>
        <p className="text-center font-semibold text-lg">
          If you don't have an account <br /> please register
        </p>
        <Link to={"/sign-up"}>
          <button
            type="button"
            className="border-2 border-white p-3 rounded-lg uppercase hover:opacity-80"
          >
            Sign Up
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full gap-5 p-5">
        <h1 className="font-semibold text-2xl sm:text-3xl text-center text-slate-500">
          Log In
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          method="post"
        >
          <input
            onChange={handleChange}
            className="border-2 p-3 rounded-lg"
            type="email"
            placeholder="email"
            id="email"
          />
          <input
            onChange={handleChange}
            className="border-2 p-3 rounded-lg"
            type="password"
            placeholder="password"
            id="password"
          />
          <Link to={"/forgetpassword"}>
            <span className="text-blue-700 hover:underline">
              Forget Password
            </span>
          </Link>
          <button
            disabled={loading}
            className="bg-slate-500 p-3 rounded-lg uppercase hover:opacity-90 text-white"
          >
            {loading ? "Loading..." : "Sign Ip"}
          </button>
        </form>
      </div>
    </div>
  );
}
