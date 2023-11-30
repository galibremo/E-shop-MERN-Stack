import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function Activation() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    try {
      if (activation_token) {
        const sendRequest = async () => {
          const response = await axios.post("/api/auth/activation", {
            activation_token,
          });
          console.log(response.data);
        };
        sendRequest();
      }
    } catch (error) {
      setError(true)
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? (
        <p className="text-red-500">Your token is expired!</p>
      ) : (
        <p className="text-green-500">
          Your account has been created suceessfully!
        </p>
      )}
    </div>
  );
}
