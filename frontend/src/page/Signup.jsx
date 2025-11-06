import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaRegEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";
import axios from "axios"

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const navigate = useNavigate();

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const newErrors = {};
    if (!form.firstname.trim()) {
      newErrors.firstname = "First name is required";
    }
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
    if (!form.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
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
          username: form.username,
          fName: form.firstname,
          lName: form.lastname,
          email: form.email,
          password: form.password,
        };
        const response = await axios.post(`http://localhost:3000/auth/signup`, formData);
        console.log(response)

        if (response.status === 200) {
          navigate("/login");
        }
      } catch (error) {
        if (error.response.status === 400) {
          console.log(error.response.data);
          alert(error.response.data.message);
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
        {/* Welcome Section */}
        <div className="w-full lg:w-7/16 flex items-center justify-center p-8 lg:p-12 relative">
          {/* Glass background for welcome section */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
          
          <div className="relative z-10 text-center max-w-md " >
            <div className="mb-8">
              <h1 className="text-3xl lg:text-4xl font-bold mb-4 leading-tight text-white">
                Welcome to
                <span className="block text-slate-400">
                  Text Summarizer
                </span>
              </h1>
              <p className="text-md text-slate-300 mb-8 leading-relaxed">
                Join thousands of users who trust us with their digital security. Create your account and start your journey today.
              </p>
            </div>
            
            <div className="space-y-4">
              <div className="flex items-center justify-center space-x-3 group">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">256-bit encryption</span>
              </div>
              <div className="flex items-center justify-center space-x-3 group">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse delay-500"></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">24/7 support</span>
              </div>
              <div className="flex items-center justify-center space-x-3 group">
                <div className="w-2 h-2 bg-slate-500 rounded-full animate-pulse delay-1000"></div>
                <span className="text-sm text-slate-300 group-hover:text-white transition-colors">GDPR compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Signup Form Section */}
        <div className="w-full lg:w-9/16 flex items-center justify-center p-4 lg:p-8 relative">
          {/* Glass background for form section */}
          <div className="absolute inset-0 bg-slate-900/30 backdrop-blur-sm"></div>
          
          <div className="relative z-10 w-full max-w-md lg:max-w-lg">
            <div className="text-center mb-6 lg:mb-8">
              <h2 className="text-2xl lg:text-3xl font-bold text-white mb-2">
                Create Your Account
              </h2>
              <p className="text-slate-300 text-sm ">
                Fill in your details to get started
              </p>
            </div>

            {/* Form with glassmorphism effect */}
            <div className="relative">
              {/* Form background with glass effect */}
              <div className="absolute inset-0 bg-slate-900/40 backdrop-blur-md rounded-2xl border border-slate-800 shadow-2xl"></div>
              
              <div className="relative z-10 p-6 lg:p-8 space-y-2">
                <form onSubmit={handleSubmit} className="space-y-4 lg:space-y-6">
                  <div>
                    <div className="relative">
                      <input
                        type="text"
                        name="username"
                        value={form.username}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-4 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.username 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600 focus:bg-slate-800/60"
                        }`}
                        placeholder="Username"
                      />
                    </div>
                    {errors.username && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2 flex items-center">
                        {errors.username}
                      </p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        type="text"
                        name="firstname"
                        value={form.firstname}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.firstname 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="First Name"
                      />
                      {errors.firstname && (
                        <p className="text-red-400 text-xs lg:text-sm mt-2">
                          {errors.firstname}
                        </p>
                      )}
                    </div>

                    <div>
                      <input
                        type="text"
                        name="lastname"
                        value={form.lastname}
                        onChange={handleChange}
                        className={`w-full px-4 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.lastname 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="Last Name"
                      />
                      {errors.lastname && (
                        <p className="text-red-400 text-xs lg:text-sm mt-2">
                          {errors.lastname}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <div className="relative">
                      <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-4 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.email 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="Email Address"
                      />
                    </div>
                    {errors.email && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2">
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
                        className={`w-full pl-4 pr-12 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.password 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="Create a strong password"
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

                  {/* Confirm Password */}
                  <div>
                    <div className="relative">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        name="confirmPassword"
                        value={form.confirmPassword}
                        onChange={handleChange}
                        className={`w-full pl-4 pr-12 py-3 bg-slate-800/50 border backdrop-blur-sm rounded-xl transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-slate-600 focus:border-slate-600 text-white placeholder-slate-400 text-sm  ${
                          errors.confirmPassword 
                            ? "border-red-500/50 bg-red-900/20" 
                            : "border-slate-700 hover:border-slate-600"
                        }`}
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center group"
                      >
                        {showConfirmPassword ? (
                          <FaRegEyeSlash className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                        ) : (
                          <FaEye className="h-4 w-4 lg:h-5 lg:w-5 text-slate-400 group-hover:text-slate-300 transition-colors" />
                        )}
                      </button>
                    </div>
                    {errors.confirmPassword && (
                      <p className="text-red-400 text-xs lg:text-sm mt-2">
                        {errors.confirmPassword}
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full py-3 px-4 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center text-sm  relative overflow-hidden group ${
                      isSubmitting
                        ? "bg-slate-600/50 cursor-not-allowed"
                        : "bg-slate-800 hover:bg-slate-700 hover:shadow-lg border border-slate-700 transform hover:-translate-y-0.5"
                    }`}
                  >
                    <div className="absolute inset-0 bg-slate-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <div className="relative z-10 flex items-center justify-center text-sm">
                      {isSubmitting ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 lg:h-5 lg:w-5 border-b-2 border-white mr-2"></div>
                          Creating Account...
                        </>
                      ) : (
                        <>
                          Create Account
                        </>
                      )}
                    </div>
                  </button>
                </form>

                {/* Sign In Link */}
                <div className="text-center pt-4 lg:pt-6 border-t border-slate-800">
                  <p className="text-slate-300 text-sm ">
                    Already have an account?{" "}
                    <button
                      onClick={() => navigate("/login")}
                      className="text-slate-400 hover:text-white font-semibold transition-colors duration-300 hover:underline"
                    >
                      Sign in here
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

export default Signup;