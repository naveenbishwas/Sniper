"use client";

import React, { useState } from "react";
import "./beSniper.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase"; // Adjust path to your Firebase config

const BeSniper = () => {
  const [step, setStep] = useState(1);
  const [freelancerType, setFreelancerType] = useState("");
  const [experience, setExperience] = useState("");
  const [howDoneBefore, setHowDoneBefore] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    code: "",
    bio: "",
    language: "",
    occupation: "",
    skills: "",
    link: "",
    work: "",
    email: "",
    phone: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleMainSubmit = () => {
    if (!freelancerType) {
      alert("Please select your freelancer type");
      return;
    }
    setStep(2);
  };

  const handlePeopleStep = () => {
    if (!experience.trim()) {
      alert("Please enter your work experience.");
      return;
    }
    setStep(3);
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore) {
      alert("Please select one option");
      return;
    }
    setStep(4);
  };

  const handleSubmitForm = async () => {
    const {
      name,
      code,
      bio,
      language,
      occupation,
      skills,
      link,
      work,
      email,
      phone,
    } = formData;

    if (
      !name ||
      !code ||
      !bio ||
      !language ||
      !occupation ||
      !skills ||
      !link ||
      !work ||
      !email ||
      !phone
    ) {
      alert("Please fill all required fields.");
      return;
    }

    const submission = {
      freelancerType,
      experience,
      howDoneBefore,
      name,
      code,
      bio,
      language,
      occupation,
      skills,
      link,
      work,
      email,
      phone,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "freelancer-submissions"), submission);
      alert("✅ Form submitted successfully!");

      // Reset
      setStep(1);
      setFreelancerType("");
      setExperience("");
      setHowDoneBefore("");
      setFormData({
        name: "",
        code: "",
        bio: "",
        language: "",
        occupation: "",
        skills: "",
        link: "",
        work: "",
        email: "",
        phone: "",
      });
    } catch (error) {
      console.error("❌ Firebase error:", error);
      alert("Submission failed. Please try again.");
    }
  };

  return (
    <div className="sniper-page">
      {step === 1 && (
        <div className="kind-of-freelancer">
          <h3 className="question">What kind of freelancer are you?</h3>
          <div className="option-buttons">
            {[
              { value: "agency-employer", label: "Agency / Employer" },
              { value: "side-hustle", label: "Side Hustle" },
              { value: "solo-freelancer", label: "Solo Freelancer" },
            ].map((option) => (
              <label
                key={option.value}
                className={`option ${
                  freelancerType === option.value ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="freelancerType"
                  value={option.value}
                  onChange={() => setFreelancerType(option.value)}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          <div className="next-btn">
            <button className="next" onClick={handleMainSubmit}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 2 && (
        <div className="work-experience">
          <h3 className="question">What is your work experience?</h3>
          <div className="form-fields">
            <input
              type="text"
              name="experience"
              placeholder="e.g., 3 years"
              value={experience}
              onChange={(e) => setExperience(e.target.value)}
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
        <div className="done">
          <h3 className="question">Have you done freelance work before?</h3>
          <div className="option-buttons">
            {[
              "Getting Started",
              "Done Offline Before",
              "Done Online Before",
              "Both Online & Offline",
            ].map((label, index) => (
              <label
                key={index}
                className={`option ${
                  howDoneBefore === label ? "selected" : ""
                }`}
              >
                <input
                  type="radio"
                  name="howDoneBefore"
                  value={label}
                  onChange={() => setHowDoneBefore(label)}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          <div className="next-btn">
            <button className="next" onClick={handleDoneBeforeStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="user-details-form">
          <h3 className="question">Please fill in your details</h3>
          <div className="form-fields">
            <div className="form-group">
              <label className="input-label">
                Full Name <span className="private-note">*Private</span>
              </label>
              <input
                type="text"
                name="name"
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Freelancer code{" "}
                <span className="private-note">
                  *Displayed Publicly and assigned by us
                </span>
              </label>
              <input
                type="text"
                name="code"
                placeholder="Freelancer code (assigned by us) *Displayed Publicly and assigned by us"
                value={formData.code}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Bio{" "}
                <span className="private-note">
                  *Do not include email or phone
                </span>
              </label>
              <textarea
                name="bio"
                placeholder="Tell us about yourself *Not let type email or phone number"
                value={formData.bio}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Languages Known</label>
              <input
                type="text"
                name="language"
                placeholder="Languages Known"
                value={formData.language}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Occupation</label>
              <input
                type="text"
                name="occupation"
                placeholder="Occupation"
                value={formData.occupation}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Skills</label>
              <input
                type="text"
                name="skills"
                placeholder="Skills"
                value={formData.skills}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">Portfolio Link</label>
              <input
                type="text"
                name="link"
                placeholder="Portfolio Link"
                value={formData.link}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Best Work Link{" "}
                <span className="private-note">*No contact info allowed</span>
              </label>
              <input
                type="text"
                name="work"
                placeholder="One of your Best Work Link *Disclaimer No contact info to be shared or the project might  get rejected"
                value={formData.work}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Email <span className="private-note">*Private</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Email Address *Private"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>

            <div className="form-group">
              <label className="input-label">
                Phone Number <span className="private-note">*Active</span>
              </label>
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number *Active"
                value={formData.phone}
                onChange={handleInputChange}
              />
            </div>
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

export default BeSniper;
