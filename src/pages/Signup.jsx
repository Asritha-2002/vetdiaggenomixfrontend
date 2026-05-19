import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import { validateForm } from "../utils/validation";
import toast from "react-hot-toast";
import axios from "axios"; // ✅ Added axios import

const BASE_URL = import.meta.env.VITE_BASE_URL;

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // ✅ SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    const validationErrors = validateForm(formData);
    setErrors(validationErrors);

    const allTouched = Object.keys(formData).reduce((acc, key) => {
      acc[key] = true;
      return acc;
    }, {});
    setTouched(allTouched);

    if (Object.keys(validationErrors).length > 0) return;

    setLoading(true);

    try {
      const response = await axios.post(
        `${BASE_URL}/user/register`, // ✅ Updated URL to match your backend route
        formData
      );

      // ✅ Display the backend response message
      toast.success(
        response.data.message || "Registration successful. Verification email sent."
      );

      setFormData(initialState);
      setTouched({});
      setErrors({});
    } catch (err) {
      console.error("API Error:", err);
      toast.error(
        err.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);

    setTouched((prev) => ({ ...prev, [name]: true }));

    const validationErrors = validateForm(updatedData);

    setErrors((prev) => ({
      ...prev,
      [name]: validationErrors[name],
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[450px] p-8 flex flex-col items-center">
        
        <div className="bg-[#457358] rounded-full p-3">
          <User size={30} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Create Your Account
        </h1>

        <form onSubmit={handleSubmit} className="w-full space-y-4">

          {/* Name */}
          <div>
            <label className="text-sm font-semibold">Full Name</label>
            <div className={`relative flex items-center border rounded-lg ${errors.name && touched.name ? "border-red-500" : "border-gray-300"}`}>
              <User size={18} className="absolute left-3 text-gray-400" />
              <input
                name="name"
                value={formData.name}
                type="text"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-sm outline-none rounded-lg"
              />
            </div>
            {touched.name && errors.name && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.name}</span>
            )}
          </div>

          {/* Email */}
          <div>
            <label className="text-sm font-semibold">Email</label>
            <div className={`relative flex items-center border rounded-lg ${errors.email && touched.email ? "border-red-500" : "border-gray-300"}`}>
              <Mail size={18} className="absolute left-3 text-gray-400" />
              <input
                name="email"
                value={formData.email}
                type="email"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-sm outline-none rounded-lg"
              />
            </div>
            {touched.email && errors.email && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.email}</span>
            )}
          </div>

          {/* Phone */}
          <div>
            <label className="text-sm font-semibold">Phone</label>
            <div className={`relative flex items-center border rounded-lg ${errors.phone && touched.phone ? "border-red-500" : "border-gray-300"}`}>
              <Phone size={18} className="absolute left-3 text-gray-400" />
              <input
                name="phone"
                value={formData.phone}
                type="tel"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-sm outline-none rounded-lg"
              />
            </div>
            {touched.phone && errors.phone && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.phone}</span>
            )}
          </div>

          {/* Password */}
          <div>
            <label className="text-sm font-semibold">Password</label>
            <div className={`relative flex items-center border rounded-lg ${errors.password && touched.password ? "border-red-500" : "border-gray-300"}`}>
              <Lock size={18} className="absolute left-3 text-gray-400" />
              <input
                name="password"
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-2 text-sm outline-none rounded-lg"
              />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 text-gray-400">
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold">Confirm Password</label>
            <div className={`relative flex items-center border rounded-lg ${errors.confirmPassword && touched.confirmPassword ? "border-red-500" : "border-gray-300"}`}>
              <Lock size={18} className="absolute left-3 text-gray-400" />
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                type="password"
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-2 text-sm outline-none rounded-lg"
              />
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#002b0a] text-white font-bold py-2.5 rounded-lg mt-4 hover:bg-[#457358] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating..." : "Create Your Account"}
          </button>
        </form>

        <p className="text-lg mt-6 text-gray-600 font-semibold">
          Already have an account?
          <NavLink to="/sign-in" className="text-[#457358] hover:underline cursor-pointer ml-1">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;