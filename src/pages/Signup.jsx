import React, { useState } from "react";
import { User, Mail, Phone, Lock, Eye, EyeOff } from "lucide-react";
import { NavLink } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import bg from "../assets/hero-sections-contact/contactsectionbgc-1.png";

const BASE_URL = import.meta.env.VITE_BASE_URL;

// ─── Validation Rules ──────────────────────────────────────────────────────────
const validators = {
  name: (v) => {
    if (!v.trim()) return "Full name is required";
    if (!/^[a-zA-Z\s]{2,50}$/.test(v.trim())) return "Name must be 2–50 letters only";
    return "";
  },
  email: (v) => {
    if (!v.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return "Enter a valid email address";
    return "";
  },
  phone: (v) => {
    if (!v.trim()) return "Phone number is required";
    if (!/^[6-9]\d{9}$/.test(v.trim())) return "Enter a valid 10-digit Indian mobile number";
    return "";
  },
  password: (v) => {
    if (!v) return "Password is required";
    if (v.length < 8) return "Password must be at least 8 characters";
    if (!/[A-Z]/.test(v)) return "Must contain at least one uppercase letter";
    if (!/[0-9]/.test(v)) return "Must contain at least one number";
    if (!/[!@#$%^&*]/.test(v)) return "Must contain at least one special character (!@#$%^&*)";
    return "";
  },
  confirmPassword: (v, formData) => {
    if (!v) return "Please confirm your password";
    if (v !== formData.password) return "Passwords do not match";
    return "";
  },
};

const Signup = () => {
  const initialState = {
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  };

  const [formData, setFormData]       = useState(initialState);
  const [errors, setErrors]           = useState({});
  const [touched, setTouched]         = useState({});
  const [showPassword, setShowPassword]             = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading]         = useState(false);

  const validate = (name, value, data = formData) => {
    return validators[name] ? validators[name](value, data) : "";
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const updatedData = { ...formData, [name]: value };
    setFormData(updatedData);
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({
      ...prev,
      [name]: validate(name, value, updatedData),
      // re-validate confirmPassword if password changes
      ...(name === "password"
        ? { confirmPassword: validate("confirmPassword", updatedData.confirmPassword, updatedData) }
        : {}),
    }));
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    setErrors((prev) => ({ ...prev, [name]: validate(name, value) }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Touch all fields and validate
    const allTouched = Object.keys(formData).reduce((acc, k) => ({ ...acc, [k]: true }), {});
    setTouched(allTouched);

    const allErrors = Object.keys(formData).reduce((acc, k) => {
      acc[k] = validate(k, formData[k]);
      return acc;
    }, {});
    setErrors(allErrors);

    if (Object.values(allErrors).some(Boolean)) return;

    setLoading(true);
    try {
      const response = await axios.post(`${BASE_URL}/register`, formData);
      toast.success(response.data.message || "Registration successful. Verification email sent.");
      setFormData(initialState);
      setTouched({});
      setErrors({});
    } catch (err) {
      toast.error(err.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const fields = [
    {
      name: "name",
      label: "Full Name",
      type: "text",
      placeholder: "Enter your full name",
      Icon: User,
    },
    {
      name: "email",
      label: "Email Address",
      type: "email",
      placeholder: "Enter your email address",
      Icon: Mail,
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "tel",
      placeholder: "Enter your 10-digit mobile number",
      Icon: Phone,
    },
  ];

  return (
    <div
      style={{ backgroundImage: `url(${bg})` }}
      className="min-h-screen flex items-center justify-center p-4 bg-cover bg-center"
    >
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-[450px] px-8 py-10 flex flex-col items-center">

        {/* Icon */}
        <div className="mb-4 bg-[#b50b0b] rounded-full p-3">
          <User size={30} className="text-white" />
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-1">Create Your Account</h1>
        <p className="text-center text-sm mb-5 px-6 leading-relaxed text-gray-500">
          Join us today! Fill in your details below to get started.
        </p>

        <form onSubmit={handleSubmit} className="w-full space-y-4">

          {/* Text fields */}
          {fields.map(({ name, label, type, placeholder, Icon }) => (
            <div key={name}>
              <label className="text-sm font-semibold text-gray-800 ml-1">{label}</label>
              <div className={`relative group mt-1 flex items-center border rounded-lg transition-colors ${
                errors[name] && touched[name]
                  ? "border-red-500"
                  : "border-gray-300 focus-within:border-[#b50b0b] focus-within:ring-1 focus-within:ring-[#b50b0b]"
              }`}>
                <span className="absolute left-3 text-gray-400 group-focus-within:text-[#b50b0b] transition-colors">
                  <Icon size={18} />
                </span>
                <input
                  name={name}
                  value={formData[name]}
                  type={type}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  placeholder={placeholder}
                  className="w-full pl-10 pr-4 py-2.5 text-sm outline-none rounded-lg placeholder-gray-400"
                />
              </div>
              {touched[name] && errors[name] && (
                <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors[name]}</span>
              )}
            </div>
          ))}

          {/* Password */}
          <div>
            <label className="text-sm font-semibold text-gray-800 ml-1">Password</label>
            <div className={`relative group mt-1 flex items-center border rounded-lg transition-colors ${
              errors.password && touched.password
                ? "border-red-500"
                : "border-gray-300 focus-within:border-[#b50b0b] focus-within:ring-1 focus-within:ring-[#b50b0b]"
            }`}>
              <span className="absolute left-3 text-gray-400 group-focus-within:text-[#b50b0b] transition-colors">
                <Lock size={18} />
              </span>
              <input
                name="password"
                value={formData.password}
                type={showPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Min 8 chars, uppercase, number, special char"
                className="w-full pl-10 pr-10 py-2.5 text-sm outline-none rounded-lg placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 text-gray-400 hover:text-[#b50b0b] transition-colors cursor-pointer"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.password && errors.password && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.password}</span>
            )}
          </div>

          {/* Confirm Password */}
          <div>
            <label className="text-sm font-semibold text-gray-800 ml-1">Confirm Password</label>
            <div className={`relative group mt-1 flex items-center border rounded-lg transition-colors ${
              errors.confirmPassword && touched.confirmPassword
                ? "border-red-500"
                : "border-gray-300 focus-within:border-[#b50b0b] focus-within:ring-1 focus-within:ring-[#b50b0b]"
            }`}>
              <span className="absolute left-3 text-gray-400 group-focus-within:text-[#b50b0b] transition-colors">
                <Lock size={18} />
              </span>
              <input
                name="confirmPassword"
                value={formData.confirmPassword}
                type={showConfirmPassword ? "text" : "password"}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Re-enter your password"
                className="w-full pl-10 pr-10 py-2.5 text-sm outline-none rounded-lg placeholder-gray-400"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 text-gray-400 hover:text-[#b50b0b] transition-colors cursor-pointer"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {touched.confirmPassword && errors.confirmPassword && (
              <span className="text-[10px] text-red-500 block mt-0.5 ml-1">{errors.confirmPassword}</span>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#b50b0b] hover:bg-[#8e0909] text-white font-bold py-3 rounded-lg transition-colors mt-2 disabled:opacity-50 cursor-pointer"
          >
            {loading ? "Creating Account..." : "Create Your Account"}
          </button>
        </form>

        <p className="text-md text-gray-700 mt-4 font-semibold">
          Already have an account?{" "}
          <NavLink to="/sign-in" className="text-[#b50b0b] hover:underline cursor-pointer">
            Sign In
          </NavLink>
        </p>
      </div>
    </div>
  );
};

export default Signup;