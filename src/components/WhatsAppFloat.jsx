import { useLocation } from "react-router-dom";

import whatsapp from "../assets/home/whatsapp.png";
export const WhatsAppFloat = () => {
  const location = useLocation();

  // hide on admin routes
  if (location.pathname.startsWith("/admin")) return null;

  const phoneNumber = "91XXXXXXXXXX";

  return (
    <a
      href={`https://wa.me/${6301867331}`}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-5 right-5 z-50"
    >
      <img src={whatsapp} className="w-14 h-14 hover:scale-110 transition" />
    </a>
  );
};