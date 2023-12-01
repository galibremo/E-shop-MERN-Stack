import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";


export default function Resetpassword() {
  const [formData, setFormData] = useState();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const {id,token}=useParams();

  function handleChange(event) {
    const { id, value } = event.target;
    setFormData({
      ...formData,
      [id]: value,
    });
  }
  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setLoading(true);
      const response = await axios.post(`/api/auth/resetpassword/${id}/${token}`,formData);
      const data = response.data;
      if (!data.success) {
        setError(data.message);
        setLoading(false);
        return;
      }
      else {
        setSuccess(data.message);
      }
      setLoading(false);
      setError(null);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  }

  return (
    <div className="p-3 max-w-lg mx-auto">
      <h1 className="text-3xl text-center font-semibold my-7">
        Reset Password
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="password"
          placeholder="password"
          className="border p-3 rounded-lg"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Updating..." : "Update"}
        </button>
      </form>
      {error || success ? (
        <p className={`text-${error ? "red-500" : "green-500"} mt-5`}>
          {error || success}
        </p>
      ) : null}
    </div>
  );
}