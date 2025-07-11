"use client";
import React, { useState } from "react";
import "./HireFreelancer.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const HireFreelancer = () => {
  const [firstField, setFirstField] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    bio: "",
    post: "",
    peopleWorking: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFirstField = () => {
    if (!firstField) {
      alert("Please select a service type.");
      return;
    }

    if (firstField === "personal") {
      setStep(3); // go directly to form
    } else {
      setStep(2); // show how-many-people field
    }
  };

  const handlePeopleStep = () => {
    if (!formData.peopleWorking.trim()) {
      alert("Please enter how many people work in your company.");
      return;
    }
    setStep(3); // go to form step
  };

  const handleSubmitForm = () => {
    const { name, email, phone, bio } = formData;
    if (!name || !email || !phone || !bio) {
      alert("Please fill in all required fields.");
      return;
    }
    sendToFirebase(formData);
  };

  const sendToFirebase = async (data) => {
    try {
      await addDoc(collection(db, "sniper-forms"), {
        plan: firstField,
        ...data,
        createdAt: new Date().toISOString(),
      });

      alert("✅ Form submitted successfully!");
      // Reset
      setStep(1);
      setFirstField("");
      setFormData({
        name: "",
        email: "",
        phone: "",
        bio: "",
        post: "",
        peopleWorking: "",
      });
    } catch (error) {
      console.error("❌ Firebase error:", error);
      alert("Failed to submit. Try again.");
    }
  };

  return (
    <div className="hiring-page">
      {step === 1 && (
        <div className="plan">
          <h3 className="question">What do you plan to hire service for?</h3>
          <div className="option-buttons">
            {["personal", "job", "business"].map((value) => (
              <label
                key={value}
                className={`option ${firstField === value ? "selected" : ""}`}
              >
                <input
                  type="radio"
                  name="firstField"
                  value={value}
                  onChange={() => setFirstField(value)}
                />
                <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
              </label>
            ))}
          </div>

          <div className="next-btn">
            <button className="next" onClick={handleFirstField}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="how-many-people">
          <h3 className="question">How many people work at your company?</h3>
          <div className="form-fields">
            <input
              type="text"
              name="peopleWorking"
              placeholder="e.g., 5"
              value={formData.peopleWorking}
              onChange={handleInputChange}
            />
          </div>

          <div className="next-btn">
            <button className="next" onClick={handlePeopleStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="user-details-form">
          <h3 className="question">Please fill in your details</h3>
          <div className="form-fields">
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleInputChange}
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleInputChange}
            />
            <input
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleInputChange}
            />
            <textarea
              name="bio"
              placeholder="Tell us about yourself"
              value={formData.bio}
              onChange={handleInputChange}
            />
            <input
              type="text"
              name="post"
              placeholder="Post a gig (Optional)"
              value={formData.post}
              onChange={handleInputChange}
            />
          </div>

          <div className="next-btn">
            <button className="next" onClick={handleSubmitForm}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HireFreelancer;
