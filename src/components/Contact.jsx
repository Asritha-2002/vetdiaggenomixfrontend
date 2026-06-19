
import Navbar from "../pages/Navbar";

import BookAppointment from "../pages/BookAppointment";
import Footer from "../pages/Footer";
import ContactHero from "./contact/ContactHero";
import LocationsSection from "./contact/LocationsSection";
import SEO from "./SEO"
const Contact = () => {


  return (
   <>
   <SEO
        title="About Us | Vetdiag Genomix - Veterinary Diagnostic Lab Vijayawada"
        description="Learn about Vetdiag Genomix, Andhra Pradesh's first veterinary diagnostic center, our mission, and our team of experts."
        path="/about"
      />
    <div>
      <Navbar />
      
        {/* Hero Section */}
      <ContactHero/>
        {/* Locations Section */}

<LocationsSection/>

<BookAppointment/>
<Footer/>
      
    </div></>
  );
};

export default Contact;