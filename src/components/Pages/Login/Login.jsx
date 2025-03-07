import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [phoneNumber, setPhoneNumber] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const submitLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    console.log("Submitting login with phone number:", phoneNumber);
    try {
      const response = await axios.post("https://api.didaraoptic.com/authentication/login", {
        login: phoneNumber,
      });
      console.log("Full API response:", response);
      console.log("Login API response data:", response.data);
      
      if (response.data && response.data.ok && response.data.data) {
        const { status, verify_token } = response.data.data;
        console.log("Login successful, redirecting to verify page");

        // Store login status and token in localStorage
        localStorage.setItem("userLoggedIn", "true");
        localStorage.setItem("verify_token", verify_token);
        
        navigate(`/verify?token=${verify_token}&status=${status}`);
      } else {
        console.error("Unexpected response structure:", response.data);
        setErrorMsg("Unexpected response from server. Please try again or contact support.");
      }
    } catch (err) {
      console.error("Login error:", err);
      if (err.response) {
        console.error("Error response:", err.response.data);
        setErrorMsg(err.response.data.message || "An error occurred. Please try again.");
      } else if (err.request) {
        console.error("No response received:", err.request);
        setErrorMsg("No response from server. Please check your internet connection.");
      } else {
        console.error("Error setting up request:", err.message);
        setErrorMsg("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-96 relative">
        <h2 className="text-xl font-semibold mb-4">ورود به حساب کاربری</h2>
        <form onSubmit={submitLogin}>
          <div className="mb-7">
            <label className="block mb-2 text-sm float-right font-medium text-gray-700">شماره موبایل</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b560]"
              placeholder="شماره تماس..."
              required
              dir="rtl"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-[#d1b560] text-white py-2 px-4 rounded-md hover:bg-[#c1a550] transition duration-300"
            disabled={isLoading}
          >
            {isLoading ? "در حال بررسی..." : "بررسی"}
          </button>
        </form>
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default Login;





