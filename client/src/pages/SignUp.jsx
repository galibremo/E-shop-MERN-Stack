import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

export default function SignUp() {
  const [formData, setFormData] = useState({
    name:"",
    email:"",
    password:""
  });
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/signup", formData)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
      setFormData({
        name:"",
        email:"",
        password:""
      });
  }
  return (
    <div className="min-h-screen flex flex-col sm:flex-row justify-center p-5 font-mono gap-5 max-w-7xl mx-auto">
      <div className="bg-slate-400 flex flex-col justify-center w-full gap-5 p-5 text-white items-center">
        <h1 className="font-semibold text-3xl sm:text-4xl text-center">
          Welcome Back!
        </h1>
        <p className="text-center font-semibold text-lg">
          To keep connected with us please <br /> login with your account
        </p>
        <Link to={"/sign-in"}>
          <button
            type="button"
            className="border-2 border-white p-3 rounded-lg uppercase hover:opacity-80"
          >
            Sign in
          </button>
        </Link>
      </div>
      <div className="flex flex-col justify-center w-full gap-5 p-5">
        <h1 className="font-semibold text-2xl sm:text-3xl text-center text-slate-500">
          Create Account
        </h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-5"
          method="post"
        >
          <input
            onChange={handleChange}
            className="border-2 p-3 rounded-lg"
            type="name"
            placeholder="name"
            id="name"
            value={formData.name}
          />
          <input
            onChange={handleChange}
            className="border-2 p-3 rounded-lg"
            type="email"
            placeholder="email"
            id="email"
            value={formData.email}
          />
          <input
            onChange={handleChange}
            className="border-2 p-3 rounded-lg"
            type="password"
            placeholder="password"
            id="password"
            value={formData.password}
          />
          <button
            disabled={loading}
            className="bg-slate-500 p-3 rounded-lg uppercase hover:opacity-90 text-white"
          >
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
      </div>
    </div>
  );
}
