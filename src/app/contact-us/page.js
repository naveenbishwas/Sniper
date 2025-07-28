// app/contact/page.jsx
"use client";
import Footer from "../components/footer/page";
import Header from "../components/header/page";
import "./contact-us.css";
import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    contact: "",
    age: "",
    profession: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully!");
  };

  return (
    <>
      <Header />
      <div className="contact-wrapper">
        <h1 className="contact-title">GET IN TOUCH</h1>
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="firstName"
            placeholder="First Name"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="lastName"
            placeholder="Last Name"
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            onChange={handleChange}
            required
          />
          <input
            type="tel"
            name="contact"
            placeholder="Contact Number"
            onChange={handleChange}
            required
          />
          <input
            type="number"
            name="age"
            placeholder="Age"
            onChange={handleChange}
          />
          <input
            type="text"
            name="profession"
            placeholder="Profession"
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
}
