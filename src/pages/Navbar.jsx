import React, { useState, useRef, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import logo from "../assets/navbar-images/logo.png";
import profile from "../assets/navbar-images/profile.png";
import shoppingbag from "../assets/navbar-images/shopping-bag.png";
import { useNavigate } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import axios from "axios";
const BASE_URL = import.meta.env.VITE_BASE_URL;

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);
  const navRef = useRef([]);
  const indicatorRef = useRef(null);
  const location = useLocation();

  const [mobileMenu, setMobileMenu] = useState("");
  const [mobileSubMenu, setMobileSubMenu] = useState("");
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();
  const HOME_INDEX = 0;
  const ABOUT_INDEX = 1;
  const SERVICES_INDEX = 2;
  const SHOP_INDEX = 3;
  const CONTACT_INDEX = 4;

  const links = [
    { name: "Home", path: "/" },
    { name: "About", path: "/about" },
  ];

  const serviceRoutes = [
    "/services/cbc",
    "/services/kft",
    "/services/lft",
    "/services/pcr",
    "/services/rtpcr",
    "/services/cbp",
    "/services/act",
    "/services/plt",
    "/services/pet",
  ];

  useEffect(() => {
    let activeIndex = -1;

    if (location.pathname === "/") {
      activeIndex = 0;
    } else if (location.pathname === "/about") {
      activeIndex = 1;
    } else if (serviceRoutes.includes(location.pathname)) {
      activeIndex = 2;
    } else if (
      location.pathname.startsWith("/shop") ||
      location.pathname.startsWith("/product")
    ) {
      activeIndex = 3;
    } else if (location.pathname === "/contact") {
      activeIndex = 4;
    }

    const el = navRef.current[activeIndex];

    if (el && indicatorRef.current) {
      const parent = el.closest("header");
      const parentLeft = parent.getBoundingClientRect().left;
      const elLeft = el.getBoundingClientRect().left;

      indicatorRef.current.style.left = elLeft - parentLeft + "px";
      indicatorRef.current.style.width = el.offsetWidth + "px";
    }
  }, [location.pathname]);

  const fetchCartCount = async () => {
    try {
      const token = localStorage.getItem("token");

      if (!token) return;

      const res = await axios.get(`${BASE_URL}/cart`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const items = res.data.data?.items || [];

      const totalQty = items.reduce((sum, item) => sum + item.quantity, 0);

      setCartCount(totalQty);
    } catch (error) {
      console.error("Cart count fetch error:", error);
    }
  };
  useEffect(() => {
    fetchCartCount();
  }, [location.pathname]);

  return (
    <header className="fixed top-0 left-0 w-full bg-white border-b border-[#b50b0b] z-50">
      {/* INDICATOR */}
      <span
        ref={indicatorRef}
        className="hidden md:block absolute top-0 h-[5px] bg-[#b50b0b] rounded-b-full transition-all duration-300 z-50"
      ></span>

      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center py-3">
          {/* LOGO */}
          <NavLink to="/">
            <img
              src={logo}
              className="w-[180px] md:w-[220px] lg:w-[250px] cursor-pointer"
              alt="logo"
            />
          </NavLink>

          {/* DESKTOP */}
          <div className="hidden xl:flex items-center ml-auto gap-16">
            <nav className="flex items-center">
              <ul className="flex gap-6 items-center">
                {links.map((link, index) => (
                  <li
                    key={link.path}
                    ref={(el) => (navRef.current[index] = el)}
                    data-path={link.path}
                    className="px-2 py-1"
                  >
                    <NavLink
                      to={link.path}
                      className={({ isActive }) =>
                        isActive ? "text-[#b50b0b]" : "hover:text-[#b50b0b]"
                      }
                    >
                      {link.name}
                    </NavLink>
                  </li>
                ))}

                {/* SERVICES — MEGA MENU */}
                <li
                  ref={(el) => (navRef.current[2] = el)}
                  className="relative group px-2 py-1"
                >
                  <span className="flex items-center gap-1 cursor-pointer">
                    Services
                    <ChevronDown size={16} className="mt-1" />
                  </span>

                  {/* MEGA DROPDOWN PANEL (hover controlled) */}
                  <div
                    className="absolute top-8 left-1/2 -translate-x-1/2 hidden group-hover:grid
                    grid-cols-5 gap-6 bg-white shadow-xl rounded-lg p-6
                    w-[95vw] max-w-6xl border border-gray-100 text-sm"
                  >
                    {/* ---------- HEMATOLOGY ---------- */}
                    <div>
                      <h4 className="font-semibold text-[#b50b0b] mb-2 pb-2 border-b border-gray-200">
                        Hematology
                      </h4>
                      <ul className="space-y-1.5">
                        <li>
                          <NavLink
                            to="/services/cbc"
                            className="block py-1 hover:text-[#b50b0b]"
                          >
                            Complete Blood Count
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* ---------- BIOCHEMISTRY ---------- */}
                    <div>
                      <h4 className="font-semibold text-[#b50b0b] mb-2 pb-2 border-b border-gray-200">
                        Biochemistry
                      </h4>
                      <ul className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                        <li>
                          <NavLink to="/services/kft" className="block py-1 hover:text-[#b50b0b]">
                            Kidney Function Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/lft" className="block py-1 hover:text-[#b50b0b]">
                            Liver Function Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/ast" className="block py-1 hover:text-[#b50b0b]">
                            AST / ALT / ALP / Total Protein / Albumin / Bilirubin
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/urea" className="block py-1 hover:text-[#b50b0b]">
                            Serum Creatinine / Urea / Uric Acid
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/t3" className="block py-1 hover:text-[#b50b0b]">
                            Canine Specific T3
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/tsh" className="block py-1 hover:text-[#b50b0b]">
                            Canine Specific TSH
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/t4" className="block py-1 hover:text-[#b50b0b]">
                            Free T4
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/totalt4" className="block py-1 hover:text-[#b50b0b]">
                            Total T4
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/thyroidProfile" className="block py-1 hover:text-[#b50b0b]">
                            Complete Thyroid Profile (Free T4, Total T4, T3, TSH)
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/ldh" className="block py-1 hover:text-[#b50b0b]">
                            LDH - Lactate Dehydrogenase
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/rbs" className="block py-1 hover:text-[#b50b0b]">
                            Random Blood Sugar
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/sl" className="block py-1 hover:text-[#b50b0b]">
                            Serum Lipase
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/sa" className="block py-1 hover:text-[#b50b0b]">
                            Serum Analysis
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/b12" className="block py-1 hover:text-[#b50b0b]">
                            Vitamin B12
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/d" className="block py-1 hover:text-[#b50b0b]">
                            Vitamin D
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/troponinI" className="block py-1 hover:text-[#b50b0b]">
                            Cardiac Troponin I
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/troponinT" className="block py-1 hover:text-[#b50b0b]">
                            Cardiac Troponin T
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/progesterone" className="block py-1 hover:text-[#b50b0b]">
                            Progesterone Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/crp" className="block py-1 hover:text-[#b50b0b]">
                            C-Reactive Protein (CRP)
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/calcium" className="block py-1 hover:text-[#b50b0b]">
                            Serum Calcium Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/sodium" className="block py-1 hover:text-[#b50b0b]">
                            Serum Sodium Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/potassium" className="block py-1 hover:text-[#b50b0b]">
                            Serum Potassium Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/ldh" className="block py-1 hover:text-[#b50b0b]">
                            Lactate Dehydrogenase (LDH)
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/cpl" className="block py-1 hover:text-[#b50b0b]">
                            Canine Pancreatic Lipase (cPL)
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* ---------- MOLECULAR BIOLOGY - RT PCR ---------- */}
                    <div>
                      <h4 className="font-semibold text-[#b50b0b] mb-2 pb-2 border-b border-gray-200">
                        Molecular Biology - RT PCR
                      </h4>
                      <ul className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                        <li>
                          <NavLink to="/services/cdv" className="block py-1 hover:text-[#b50b0b]">
                            Canine Distemper Virus - RT-PCR
                          </NavLink>
                        </li>

                        <li className="pt-2 font-medium text-gray-700">
                          Canine Tick Fever Panel - Babesia gibsoni 4
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfpbc" className="block py-1 hover:text-[#b50b0b]">
                            Babesia Canis
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfpbr" className="block py-1 hover:text-[#b50b0b]">
                            Babesia Rossi
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfpbv" className="block py-1 hover:text-[#b50b0b]">
                            Babesia Vogeli
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfphc" className="block py-1 hover:text-[#b50b0b]">
                            Hepatozoon Canis
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfpec" className="block py-1 hover:text-[#b50b0b]">
                            Ehrlichia Canis
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/ctfpap" className="block py-1 hover:text-[#b50b0b]">
                            Anaplasma Platys
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to="/services/ap" className="block py-1 hover:text-[#b50b0b]">
                            Anaplasma Phagocytophilum
                          </NavLink>
                        </li>

                        <li className="pt-2 font-medium text-gray-700">
                          Feline Panel - Mycoplasma haemofelis
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/fiv" className="block py-1 hover:text-[#b50b0b]">
                            Feline Immunodeficiency Virus
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/felv" className="block py-1 hover:text-[#b50b0b]">
                            Feline Leukemia Virus
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/babesiafelis" className="block py-1 hover:text-[#b50b0b]">
                            Feline Babesia felis
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/anaplasmaphagocytophilum" className="block py-1 hover:text-[#b50b0b]">
                            Feline Anaplasma phagocytophilum
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/calicivirus" className="block py-1 hover:text-[#b50b0b]">
                            Feline Calicivirus
                          </NavLink>
                        </li>
                        <li className="pl-3">
                          <NavLink to="/services/fip" className="block py-1 hover:text-[#b50b0b]">
                            Feline Infectious Peritonitis
                          </NavLink>
                        </li>

                        <li>
                          <NavLink to="/services/cpv" className="block py-1 hover:text-[#b50b0b]">
                            Canine Parvovirus
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/leptospira" className="block py-1 hover:text-[#b50b0b]">
                            Leptospira
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* ---------- HISTOPATHOLOGY ---------- */}
                    <div>
                      <h4 className="font-semibold text-[#b50b0b] mb-2 pb-2 border-b border-gray-200">
                        Histopathology
                      </h4>
                      <ul className="space-y-1.5 max-h-96 overflow-y-auto pr-2">
                        <li>
                          <NavLink to="/services/histopathology" className="block py-1 hover:text-[#b50b0b]">
                            Histopathology Examination
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/biopsy" className="block py-1 hover:text-[#b50b0b]">
                            Biopsy
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/fnac" className="block py-1 hover:text-[#b50b0b]">
                            Fine Needle Aspiration Cytology
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/abst" className="block py-1 hover:text-[#b50b0b]">
                            Culture & Antibiotic Sensitivity Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/abstAnaerobic" className="block py-1 hover:text-[#b50b0b]">
                            Culture & Antibiotic Sensitivity Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/sse" className="block py-1 hover:text-[#b50b0b]">
                            Skin Scraping Examination
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/fungalCulture" className="block py-1 hover:text-[#b50b0b]">
                            Fungal Culture Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/bacterialCulture" className="block py-1 hover:text-[#b50b0b]">
                            Bacterial Culture Test
                          </NavLink>
                        </li>
                      </ul>
                    </div>

                    {/* ---------- OTHER TESTS ---------- */}
                    <div>
                      <h4 className="font-semibold text-[#b50b0b] mb-2 pb-2 border-b border-gray-200">
                        Other Tests
                      </h4>
                      <ul className="space-y-1.5">
                        <li>
                          <NavLink to="/services/pcr" className="block py-1 hover:text-[#b50b0b]">
                            Polymerase Chain Reaction
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/rtpcr" className="block py-1 hover:text-[#b50b0b]">
                            Polymerase Chain Reaction
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/cbp" className="block py-1 hover:text-[#b50b0b]">
                            Complete Blood Picture
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/act" className="block py-1 hover:text-[#b50b0b]">
                            Aerobic Culture Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/plt" className="block py-1 hover:text-[#b50b0b]">
                            Pancreatic Lipase Test
                          </NavLink>
                        </li>
                        <li>
                          <NavLink to="/services/pet" className="block py-1 hover:text-[#b50b0b]">
                            Pancreatic Elastase
                          </NavLink>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>

                {/* SHOP */}
                <li
                  ref={(el) => (navRef.current[3] = el)}
                  data-path="/shop"
                  className="px-2 py-1"
                >
                  <NavLink
                    to="/shop"
                    className={({ isActive }) =>
                      isActive ? "text-[#b50b0b]" : "hover:text-[#b50b0b]"
                    }
                  >
                    Shop
                  </NavLink>
                </li>

                {/* CONTACT */}
                <li
                  ref={(el) => (navRef.current[4] = el)}
                  data-path="/contact"
                  className="px-2 py-1"
                >
                  <NavLink
                    to="/contact"
                    className={({ isActive }) =>
                      isActive ? "text-[#b50b0b]" : "hover:text-[#b50b0b]"
                    }
                  >
                    Contact
                  </NavLink>
                </li>
              </ul>
            </nav>

            {/* RIGHT */}
            <div className="flex items-center gap-4">
              <button className="bg-[#b50b0b] text-white px-4 py-2 rounded cursor:pointer">
                <NavLink to="/book-appointment">Book Appointment</NavLink>
              </button>

              <div
                className="relative cursor-pointer"
                onClick={() => navigate("/cart")}
              >
                <img src={shoppingbag} className="w-8" alt="cart" />
                <span className="absolute -top-2 -right-2 bg-[#b50b0b] text-white text-xs px-2 py-1 rounded-full">
                  {cartCount}
                </span>
              </div>
              <div
                onClick={() => {
                  const isAdmin = localStorage.getItem("isAdmin") === "true";

                  if (isAdmin) {
                    navigate("/admin");
                  } else {
                    navigate("/profile");
                  }
                }}
                className="cursor-pointer"
              >
                <img
                  src={profile}
                  className="w-10 h-10 rounded-full"
                  alt="profile"
                />
              </div>
            </div>
          </div>

          {/* MOBILE ICON */}
          <div className="xl:hidden ml-auto flex gap-5">
            <div className="relative">
              <img src={shoppingbag} className="w-8" alt="cart" />
              <span className="absolute -top-2 -right-2 bg-[#b50b0b] text-white text-xs px-2 rounded-full">
                0
              </span>
            </div>
            <button onClick={() => setMobileOpen(true)} className="text-2xl">
              ☰
            </button>
          </div>
        </div>
      </div>

      {/* MOBILE SIDEBAR (unchanged — accordion is still the right pattern at narrow widths) */}
      <div
        className={`fixed top-0 right-0 h-full w-[280px] bg-white shadow-lg z-50 transform transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex justify-end p-4">
          <button onClick={() => setMobileOpen(false)}>✕</button>
        </div>

        <div className="px-4">
          <NavLink to="/">
            <img src={logo} className="w-[180px]" alt="logo" />
          </NavLink>
        </div>

        <div className="flex items-center gap-3 px-4 mt-4">
          <NavLink to="/profile">
            <img
              src={profile}
              className="w-10 h-10 rounded-full"
              alt="profile"
            />
          </NavLink>
        </div>

        <ul className="mt-6 space-y-4 px-5 overflow-y-auto max-h-[calc(100vh-260px)]">
          {links.map((link) => (
            <li key={link.path}>
              <NavLink to={link.path} onClick={() => setMobileOpen(false)}>
                {link.name}
              </NavLink>
            </li>
          ))}

          <li>
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => setServiceOpen(!serviceOpen)}
            >
              <span>Services {serviceOpen ? "▾" : "▸"}</span>
            </div>

            <div
              className={`overflow-hidden transition-all duration-300 ${
                serviceOpen ? "max-h-[800px]" : "max-h-0"
              }`}
            >
              <ul className="ml-3 mt-2 space-y-2 text-sm">
                {/* ================= HEMATOLOGY ================= */}
                <li>
                  <div
                    onClick={() =>
                      setMobileMenu(
                        mobileMenu === "hematology" ? "" : "hematology",
                      )
                    }
                    className="flex justify-between cursor-pointer"
                  >
                    Hematology
                    <span>{mobileMenu === "hematology" ? "▾" : "▸"}</span>
                  </div>

                  {mobileMenu === "hematology" && (
                    <ul className="ml-4">
                      <li>
                        <NavLink
                          to="/services/cbc"
                          onClick={() => setMobileOpen(false)}
                        >
                          Complete Blood Count
                        </NavLink>
                      </li>
                    </ul>
                  )}
                </li>

                {/* ================= BIOCHEMISTRY ================= */}
                <li>
                  <div
                    onClick={() =>
                      setMobileMenu(
                        mobileMenu === "biochemistry" ? "" : "biochemistry",
                      )
                    }
                    className="flex justify-between cursor-pointer"
                  >
                    Biochemistry
                    <span>{mobileMenu === "biochemistry" ? "▾" : "▸"}</span>
                  </div>

                  {mobileMenu === "biochemistry" && (
                    <ul className="ml-4">
                      <NavLink to="/services/kft" className="block py-1">
                        Kidney Function Test
                      </NavLink>

                      <NavLink to="/services/lft" className="block py-1">
                        Liver Function Test
                      </NavLink>

                      <NavLink to="/services/ast" className="block py-1">
                        AST / ALT / ALP / Total Protein / Albumin / Bilirubin
                      </NavLink>

                      <NavLink to="/services/urea" className="block py-1">
                        Serum Creatinine / Urea / Uric Acid
                      </NavLink>

                      <NavLink to="/services/t3" className="block py-1">
                        Canine Specific T3
                      </NavLink>

                      <NavLink to="/services/tsh" className="block py-1">
                        Canine Specific TSH
                      </NavLink>

                      <NavLink to="/services/t4" className="block py-1">
                        Free T4
                      </NavLink>
                      <NavLink to="/services/totalt4" className="block py-1">
                        Total T4
                      </NavLink>
                      <NavLink
                        to="/services/thyroidProfile"
                        className="block py-1"
                      >
                        Complete Thyroid Profile (Free T4, Total T4, T3, TSH)
                      </NavLink>

                      <NavLink to="/services/ldh" className="block py-1">
                        LDH - Lactate Dehydrogenase
                      </NavLink>

                      <NavLink to="/services/rbs" className="block py-1">
                        Random Blood Sugar
                      </NavLink>

                      <NavLink to="/services/sl" className="block py-1">
                        Serum Lipase
                      </NavLink>

                      <NavLink to="/services/sa" className="block py-1">
                        Serum Analysis
                      </NavLink>
                      <NavLink to="/services/b12" className="block py-1">
                        Vitamin B12
                      </NavLink>

                      <NavLink to="/services/d" className="block py-1">
                        Vitamin D
                      </NavLink>
                      <NavLink to="/services/troponinI" className="block py-1">
                        Cardiac Troponin I
                      </NavLink>
                      <NavLink to="/services/troponinT" className="block py-1">
                        Cardiac Troponin T
                      </NavLink>
                      <NavLink
                        to="/services/progesterone"
                        className="block py-1"
                      >
                        Progesterone Test
                      </NavLink>
                      <NavLink to="/services/crp" className="block py-1">
                        C-Reactive Protein (CRP)
                      </NavLink>
                      <NavLink to="/services/calcium" className="block py-1">
                        Serum Calcium Test
                      </NavLink>
                      <NavLink to="/services/sodium" className="block py-1">
                        Serum Sodium Test
                      </NavLink>
                      <NavLink to="/services/potassium" className="block py-1">
                        Serum Potassium Test
                      </NavLink>
                      <NavLink to="/services/ldh" className="block py-1">
                        Lactate Dehydrogenase
                      </NavLink>
                      <NavLink to="/services/cpl" className="block py-1">
                        Canine Pancreatic Lipase
                      </NavLink>
                    </ul>
                  )}
                </li>

                {/* ================= MOLECULAR ================= */}
                <li>
                  <div
                    onClick={() =>
                      setMobileMenu(
                        mobileMenu === "molecular" ? "" : "molecular",
                      )
                    }
                    className="flex justify-between cursor-pointer"
                  >
                    Molecular Biology
                    <span>{mobileMenu === "molecular" ? "▾" : "▸"}</span>
                  </div>

                  {mobileMenu === "molecular" && (
                    <ul className="ml-4">
                      <NavLink to="/services/cdv">
                        Canine Distemper Virus - RT-PCR
                      </NavLink>

                      {/* TICK PANEL */}
                      <li>
                        <div
                          onClick={() =>
                            setMobileSubMenu(
                              mobileSubMenu === "tick" ? "" : "tick",
                            )
                          }
                          className="flex justify-between cursor-pointer"
                        >
                          Tick Fever Panel
                          <span>{mobileSubMenu === "tick" ? "▾" : "▸"}</span>
                        </div>

                        {mobileSubMenu === "tick" && (
                          <ul className="ml-4">
                            <NavLink to="/services/ctfpbc" className="block py-1">
                              Babesia Canis
                            </NavLink>
                            <NavLink to="/services/ctfpbr" className="block py-1">
                              Babesia Rossi
                            </NavLink>
                            <NavLink to="/services/ctfpbv" className="block py-1">
                              Babesia Vogeli
                            </NavLink>
                            <NavLink to="/services/ctfphc" className="block py-1">
                              Hepatozoon Canis
                            </NavLink>
                            <NavLink to="/services/ctfpec" className="block py-1">
                              Ehrlichia Canis
                            </NavLink>
                            <NavLink to="/services/ctfpap" className="block py-1">
                              Anaplasma Platys
                            </NavLink>
                          </ul>
                        )}
                      </li>

                      <li>
                        <div
                          onClick={() =>
                            setMobileSubMenu(
                              mobileSubMenu === "feline" ? "" : "feline",
                            )
                          }
                          className="flex justify-between cursor-pointer"
                        >
                          Feline Panel-Mycoplasma haemofelis
                          <span>{mobileSubMenu === "feline" ? "▾" : "▸"}</span>
                        </div>

                        {mobileSubMenu === "feline" && (
                          <ul className="ml-4">
                            <NavLink to="/services/fiv" className="block py-1">
                              Feline Immunodeficiency Virus
                            </NavLink>
                            <NavLink to="/services/felv" className="block py-1">
                              Feline Leukemia Virus
                            </NavLink>

                            <NavLink
                              to="/services/babesiafelis"
                              className="block py-1"
                            >
                              Feline Babesia felis
                            </NavLink>

                            <NavLink
                              to="/services/anaplasmaphagocytophilum"
                              className="block py-1"
                            >
                              Feline Anaplasma phagocytophilum
                            </NavLink>

                            <NavLink
                              to="/services/calicivirus"
                              className="block py-1"
                            >
                              Feline Calicivirus
                            </NavLink>
                            <NavLink to="/services/fip" className="block py-1">
                              Feline Infectious Peritonitis
                            </NavLink>
                          </ul>
                        )}
                      </li>

                      <NavLink to="/services/ap">
                        Anaplasma Phagocytophilum
                      </NavLink>
                      <NavLink to="/services/cpv">CPV</NavLink>
                      <NavLink to="/services/leptospira">Leptospira</NavLink>
                    </ul>
                  )}
                </li>

                {/* ================= HISTOPATHOLOGY ================= */}
                <li>
                  <div
                    onClick={() =>
                      setMobileMenu(
                        mobileMenu === "histopathology" ? "" : "histopathology",
                      )
                    }
                    className="flex justify-between cursor-pointer"
                  >
                    Histopathology
                    <span>{mobileMenu === "histopathology" ? "▾" : "▸"}</span>
                  </div>

                  {mobileMenu === "histopathology" && (
                    <ul className="ml-4">
                      <NavLink
                        to="/services/histopathology"
                        className="block py-1"
                      >
                        Histopathology Examination
                      </NavLink>
                      <NavLink to="/services/biopsy" className="block py-1">
                        Biopsy
                      </NavLink>

                      <NavLink to="/services/fnac" className="block py-1">
                        Fine Needle Aspiration Cytology
                      </NavLink>
                      <NavLink to="/services/abst" className="block py-1">
                        Culture & Antibiotic Sensitivity Test
                      </NavLink>
                      <NavLink
                        to="/services/abstAnaerobic"
                        className="block py-1"
                      >
                        Culture & Antibiotic Sensitivity Test
                      </NavLink>
                      <NavLink to="/services/sse" className="block py-1">
                        Skin Scraping Examination
                      </NavLink>
                      <NavLink
                        to="/services/fungalCulture"
                        className="block py-1"
                      >
                        Fungal Culture Test
                      </NavLink>

                      <NavLink
                        to="/services/bacterialCulture"
                        className="block py-1"
                      >
                        Bacterial Culture Test
                      </NavLink>
                    </ul>
                  )}
                </li>
                <li>
                  <NavLink to="/services/pcr" className="block py-1">
                    Polymerase Chain Reaction
                  </NavLink>
                  <NavLink to="/services/rtpcr" className="block py-1">
                    Polymerase Chain Reaction
                  </NavLink>
                  <NavLink to="/services/cbp" className="block py-1">
                    Complete Blood Picture
                  </NavLink>
                  <NavLink to="/services/act" className="block py-1">
                    Aerobic Culture Test
                  </NavLink>

                  <NavLink to="/services/plt" className="block py-1">
                    Pancreatic Lipase Test
                  </NavLink>

                  <NavLink to="/services/pet" className="block py-1">
                    Pancreatic Elastase
                  </NavLink>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <NavLink
              to="/shop"
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) => (isActive ? "text-[#b50b0b]" : "")}
            >
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" onClick={() => setMobileOpen(false)}>
              Contact
            </NavLink>
          </li>
        </ul>

        <div className="px-4 mt-6">
          <NavLink
            to="/book-appointment"
            className="w-full bg-[#b50b0b] text-white py-2 px-4 rounded cursor-pointer"
          >
            Book Appointment
          </NavLink>
        </div>

        <div className="flex gap-4 px-4 mt-6">
          <FontAwesomeIcon icon={faFacebook} className="text-3xl" />
          <FontAwesomeIcon icon={faTwitter} className="text-3xl" />
          <FontAwesomeIcon icon={faInstagram} className="text-3xl" />
        </div>
      </div>

      {/* OVERLAY */}
      {mobileOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40"
          onClick={() => setMobileOpen(false)}
        ></div>
      )}
    </header>
  );
};

export default Navbar;