import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function SignUp() {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post("/api/auth/signup", formData, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = response.data;
      if (!data.success) {
        setLoading(false);
        setError(data.message);
        return;
      } 
      else {
        setSuccessMsg(data.message);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
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
          <button type="button" className="border-2 border-white p-3 rounded-lg uppercase hover:opacity-80">
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
          />
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
            {loading ? "Loading..." : "Sign Up"}
          </button>
        </form>
        {error && <p className="text-red-500 mt-5">{error}</p>}
      
        {successMsg && <p className="text-green-500 mt-5">{successMsg}</p>}
      </div>
    </div>
  );
}
