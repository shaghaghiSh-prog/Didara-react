import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { MdRestartAlt } from "react-icons/md";
import { Clock } from "lucide-react";
import customAlert from "../utils/customAlert";

const VerificationCodeInput = ({ code, setCode, disabled }) => {
  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newCode = [...code];
      newCode[index] = value;
      setCode(newCode);

      if (value && index < 4) {
        const nextInput = document.getElementById(`code-${index + 1}`);
        nextInput?.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex space-x-2 flex-row-reverse">
      {code.map((digit, index) => (
        <input
          key={index}
          id={`code-${index}`}
          type="text"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          disabled={disabled} 
          className={`w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b560] ${disabled ? 'bg-gray-200' : ''}`}
        />
      ))}
    </div>
  );
};


function Verify() {
  const [timeLeft, setTimeLeft] = useState(20);
  const [isExpired, setIsExpired] = useState(false);
  const [code, setCode] = useState(["", "", "", "", ""]);
  const navigate = useNavigate();
  const location = useLocation();
  const [verifyToken, setVerifyToken] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [name, setName] = useState("");
  const [lastName, setLastName] = useState("");

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timerId);
    } else {
      setIsExpired(true);
    }
  }, [timeLeft]);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleResendCode = () => {
    navigate("/Login");
  };

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const tokenParam = searchParams.get("token");
    if (tokenParam) {
      setVerifyToken(tokenParam);
    } else {
      setErrorMsg("No verify token provided. Please try logging in again.");
    }
  }, [location]);

  const isFirstTime =
    !localStorage.getItem("name") || !localStorage.getItem("lastName");

  const submitVerification = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrorMsg(null);
    const verificationCode = code.join(""); // Join the OTP array into a string

    try {
      const response = await axios.post(
        "https://api.didaraoptic.com/authentication/verify",
        {
          verify_token: verifyToken,
          otp: verificationCode, // Use joined OTP
          name: isFirstTime ? name : undefined,
          lastName: isFirstTime ? lastName : undefined,
        }
      );

      if (response.data && response.data.ok) {
        if (isFirstTime) {
          localStorage.setItem("name", name);
          localStorage.setItem("lastName", lastName);
        }
        
        customAlert( "ورود شما با موفقیت ثبت شد!" , "success");
        navigate("/");
      } else {
        setErrorMsg("Unexpected response from server. Please try again.");
      }
    } catch (err) {
      if (err.response) {
        setErrorMsg(err.response.data.message || "An error occurred during verification. Please try again.");
      } else {
        setErrorMsg("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-4/12 relative">
        <h2 className="text-xl font-semibold mb-4">تایید OTP</h2>
        <form onSubmit={submitVerification}>
          {isFirstTime && (
            <>
              <div className="mb-7">
                <label className="block mb-2 text-sm float-right font-medium text-gray-700">نام</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b560]"
                  placeholder="نام..."
                  required
                />
              </div>
              <div className="mb-7">
                <label className="block mb-2 text-sm float-right font-medium text-gray-700">نام خانوادگی</label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#d1b560]"
                  placeholder="نام خانوادگی..."
                  required
                />
              </div>
            </>
          )}
          <div className="mb-4">
            <label
              htmlFor="verificationCode"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              کد تایید
            </label>
            <VerificationCodeInput code={code} setCode={setCode} disabled={isExpired} />
            {isExpired ? (
              <button
                onClick={handleResendCode}
                className="flex items-center ml-2 bg-center -mt-10 content-center mr-3 p-2 rounded bg-red-500"
              >
                <MdRestartAlt className="mr-2" />
                <span className="whitespace-nowrap">دریافت مجدد کد</span>
              </button>
            ) : (
              <div className="flex items-center ml-2 bg-center w-24 -mt-10 content-center mr-3 p-2 rounded bg-green-500">
                <span className="text-white">{formatTime(timeLeft)}</span>
                <Clock className="strong mr-2 text-red-100" size={14} />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-[#d1b560] text-white py-2 px-4 rounded-md hover:bg-[#c1a550] transition duration-300"
            disabled={isLoading || !verifyToken || isExpired} // Disable if expired
          >
            {isLoading ? "در حال تایید..." : "تایید"}
          </button>
        </form>
        {errorMsg && <p className="text-red-500 mt-2">{errorMsg}</p>}
      </div>
    </div>
  );
}

export default Verify;

