import React, {useState} from 'react'
import contactsec1 from "../../assets/hero-sections-contact/contactsectionbgc-1.png";
import loclogo from "../../assets/location-contact/logo.png";
import telephone from "../../assets/location-contact/telephone.png"
import address from "../../assets/location-contact/address.png"
import mail from "../../assets/location-contact/mail.png"
import time from "../../assets/location-contact/time.png"
import { MapPin, Clock, Phone, Mail } from "lucide-react";

const LocationsSection = () => {
     const [activeLocation, setActiveLocation] = useState("Vijayawada");

  const locations = [
    {
      name: "Vijayawada",
      mapEmbed : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22276.62988354043!2d80.6603204!3d16.4916112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb67d66f4829%3A0xec9ce81b957a393!2sVetdiag%20Genomix%20Pvt.Ltd!5e1!3m2!1sen!2sin!4v1777264314418!5m2!1sen!2sin",
      address: "SB House, D.No. 74-7-6/2, Donka Rd, JD Nagar, Patamata, Vijayawada, Andhra Pradesh 520010",
      start:"Mon - Sat: 08:00 AM - 08:00 PM",
      close:"Sun: 08:00 AM - 01:00 PM",
      contact:"+91 6301867331",
      alternate:"+91 6281789372",
      mail:"admin@vetdiaggenomix.com"
    },
    {
      name: "Yalamanchili",
      mapEmbed : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22276.62988354043!2d80.6603204!3d16.4916112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb67d66f4829%3A0xec9ce81b957a393!2sVetdiag%20Genomix%20Pvt.Ltd!5e1!3m2!1sen!2sin!4v1777264314418!5m2!1sen!2sin",
      address: "456 NH Road, Yalamanchili, Andhra Pradesh, India",
      start:"Mon - Sat: 08:00 AM - 08:00 PM",
      close:"Sun: 08:00 AM - 01:00 PM",
      contact:"+91 6301867331",
      alternate:"+91 6281789372",
      mail:"admin@vetdiaggenomix.com"
    },
    {
      name: "Visakhapatnam",
      mapEmbed : "https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d22276.62988354043!2d80.6603204!3d16.4916112!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a35fb67d66f4829%3A0xec9ce81b957a393!2sVetdiag%20Genomix%20Pvt.Ltd!5e1!3m2!1sen!2sin!4v1777264314418!5m2!1sen!2sin",
      address: "789 Beach Road, Visakhapatnam, Andhra Pradesh, India",
      start:"Mon - Sat: 08:00 AM - 08:00 PM",
      close:"Sun: 08:00 AM - 01:00 PM",
      contact:"+91 6301867331",
      alternate:"+91 6281789372",
      mail:"admin@vetdiaggenomix.com"
    },
  ];

  const activeData = locations.find((loc) => loc.name === activeLocation);
  return (
    <section
  className="relative w-full h-auto bg-cover bg-center py-10"
  style={{ backgroundImage: `url(${contactsec1})` }}
>
  <div className="relative max-w-7xl mx-auto px-4">
    <div className="text-center mb-5">
      <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold mb-2">
        <span className="text-[#b50b0b]">Our</span> Locations
      </h1>
      <p className="text-base md:text-xl mt-2">
        Visit any of our conveniently located branches in India
      </p>
    </div>

    {/* Tabs */}
    <div className="flex justify-center">
      <ul className="inline-flex bg-[#f5f3f7] rounded-md mb-6">
        {locations.map((loc, index) => (
          <li
            key={loc.name}
            className={`cursor-pointer px-1 md:px-4 py-2 relative ${
              activeLocation === loc.name
                ? "bg-[#b50b0b] text-white"
                : "bg-[#f5f3f7] text-black"
            } ${
              index !== locations.length - 1
                ? "after:content-[''] after:absolute after:right-0 after:top-1/4 after:h-1/2 after:w-[1px] after:bg-[#e6e4e8]"
                : ""
            } rounded-md`}
            onClick={() => setActiveLocation(loc.name)}
          >
            {loc.name}
          </li>
        ))}
      </ul>
    </div>

  <div className="max-w-7xl mx-auto md:px-30 py-4">
  {/* Inner Card Container */}
  <div className="bg-[#f8f8f8] p-2 lg:p-6 rounded-lg flex flex-col lg:flex-row gap-6 items-stretch justify-center border border-[#C0C0C0]">
    
    {/* Google Map */}
    <div className="lg:w-1/2 w-full  mx-h-[550px] md:h-[480px] rounded-lg overflow-hidden shadow-lg border border-[#babfc4]">
      <iframe
        title={activeData.name}
        src={activeData.mapEmbed}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>

    {/* Address Card */}
    <div className="lg:w-1/2 w-full mx-h-[550px] md:mx-h-[480px] bg-white p-6 rounded-lg shadow-lg flex flex-col justify-start border border-[#babfc4]">
      <img src={loclogo} alt="" className="w-[220px] mb-2" />
      <h2 className="text-xl md:text-2xl font-bold mb-5">
        {activeData.name} 
      </h2>

      <div className="flex flex-col gap-4">
  <div className="flex  items-start gap-3">
    
    <MapPin className="text-[#b50b0b]" size={20} />
    <p className="break-words">{activeData.address}</p>
  </div>
  <hr className="border-0 h-[1px] bg-[#e5e5e5]"/>
  
  <div className="flex flex-wrap items-start gap-3">
    <Clock className="text-[#b50b0b] mt-1" size={20} />
    <div className="break-words">
      <p>{activeData.start}</p>
      <p>{activeData.close}</p>
    </div>
  </div>
  <hr className="border-0 h-[1px] bg-[#e5e5e5]"/>

  <div className="flex flex-wrap items-start gap-3">
    <Phone className="text-[#b50b0b] mt-1" size={20} />
    <div className="break-words">
      <p>{activeData.contact}</p>
      <p>{activeData.alternate}</p>
    </div>
  </div>
  <hr className="border-0 h-[1px] bg-[#e5e5e5]"/>

  <div className="flex flex-wrap items-start gap-3">
    <Mail className="text-[#b50b0b] mt-0.5" size={20} />
    <p className="break-words">{activeData.mail}</p>
  </div>
</div>
    </div>

  </div>
</div>
  </div>
</section>
  )
}

export default LocationsSection