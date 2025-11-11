import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios";
import { useMyContext } from "../context/MyContext";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { url } = useMyContext();

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      newErrors.email = "Email is invalid";
    }
    if (!form.password) {
      newErrors.password = "Password is required";
    } else if (form.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      setIsSubmitting(true);
      try {
        const formData = {
          email: form.email,
          password: form.password,
        };
        const response = await axios.post(
          `${url}/auth/login`,
          formData,
          { withCredentials: true }
        );
        if (response.status === 200) {
          navigate("/dashboard");
        }
      } catch (error) {
        if (error.response && error.response.status === 400) {
          alert("Email is not registered.");
        }
        if (error.response && error.response.status === 401) {
          alert("Incorrect Password.");
        }
        console.log("Error: ", error);
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 relative overflow-hidden">
      <div className="relative z-10 min-h-screen flex flex-col md:flex-row">
        <div className="w-full lg:w-7/16 flex items-center justify-center p-8 lg:p-12 relative">
          <div className="relative z-10 text-center max-w-md">
            <div className="mb-8">
              <h1 className="text-2xl lg:text-3xl font-bold mb-4 leading-tight text-white">
                Welcome Back to
                <span className="block text-slate-400">Text Summarizer</span>
              </h1>
              <p className=" text-slate-300 mb-8 leading-relaxed">
                Sign in to your account and continue your journey with us.
                Access your personalized dashboard and tools.
              </p>
            </div>
          </div>
        </div>

        {/* Login form */}
        <div className="w-full lg:w-9/16 flex items-center justify-center p-4 lg:p-8 relative">
          <div className="relative z-10 w-full max-w-md lg:max-w-lg">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Sign In
              </h2>
              <p className="text-slate-300 text-sm">
                Enter your credentials to access your account
              </p>
            </div>
            <div className="relative">
              <div className="relative z-10 p-6 lg:p-8 space-y-2">
                <form
                  onSubmit={handleSubmit}
                  className="space-y-4 lg:space-y-6"
                >
                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-4 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm ${
                          errors.email
                            ? "border-red-500/50 bg-red-900/20"
                            : "border-slate-700 hover:border-slate-600 focus:bg-slate-800/60"
                        }`}
                        placeholder="Email Address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2 flex items-center">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={form.password}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-12 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm ${
                          errors.password
                            ? "border-red-500/50 bg-red-900/20"
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="Password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                      >
                        {showPassword ? (
                          <FaRegEyeSlash className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                        ) : (
                          <FaEye className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.password && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2">
                        {errors.password}
                      </p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center text-sm relative overflow-hidden group ${
                      isSubmitting
                        ? "bg-slate-600/50 cursor-not-allowed"
                        : "bg-slate-800 hover:bg-slate-700 hover:shadow-lg border border-slate-700 transform hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="relative z-10 flex items-center justify-center">
                      {isSubmitting ? <>Signing In...</> : <>Sign In</>}
                    </div>
                  </button>
                </form>

                <div className="text-center pt-4 lg:pt-6 border-t border-slate-800">
                  <p className="text-slate-300 text-sm">
                    Don't have an account?{" "}
                    <button
                      onClick={() => navigate("/signup")}
                      className="text-slate-400 hover:text-white font-semibold transition-colors duration-300 hover:underline"
                    >
                      Create one here
                    </button>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
