import axios from "axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { useParams } from "react-router-dom";

export default function SellerActivation() {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);

  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post("/api/shop/activation", {
            activation_token,
          })
          .then((response) => {            
          })
          .catch((error) => {
            setError(error.response.data.message);
          });
      };
      sendRequest();
    }
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      {error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <p className="text-green-500">
          Your account has been created suceessfully!
        </p>
      )}
    </div>
  );
}
