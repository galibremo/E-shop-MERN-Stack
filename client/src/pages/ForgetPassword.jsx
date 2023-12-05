import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Forgetpassword() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);
    axios
      .post("/api/auth/forgetpassword", formData)
      .then((res) => {
        setLoading(false);
        toast.success(res.data.message);
      })
      .catch((error) => {
        setLoading(false);
        toast.error(error.response.data.message);
      });
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Forget Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="email"
          className="border p-3 rounded-lg"
          id="email"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Send"}
        </button>
      </form>
    </div>
  );
}
