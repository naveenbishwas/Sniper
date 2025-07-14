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
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    name: "",
    // code: "",
    bio: "",
    language: "",
    occupation: "",
    skills: "",
    link: "",
    work: "",
    email: "",
    phone: "",
    gigTopic: "",
    gigDescription: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error when user types
  };
  const handleMainSubmit = () => {
    if (!freelancerType) {
      setErrors((prev) => ({
        ...prev,
        freelancerType: "Please select your freelancer type.",
      }));
      return;
    }

    // Clear any previous freelancerType error before proceeding
    setErrors((prev) => {
      const { freelancerType, ...rest } = prev;
      return rest;
    });

    setStep(2);
  };

  const handlePeopleStep = () => {
    const newErrors = {};

    if (!experience.trim()) {
      newErrors.experience = "Please enter your work experience.";
    } else if (isNaN(experience) || Number(experience) < 0) {
      newErrors.experience = "Experience must be a valid number.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors((prev) => ({ ...prev, ...newErrors }));
      return;
    }

    setErrors((prev) => ({ ...prev, experience: "" })); // Clear any old error
    setStep(3);
  };

  const backPeopleStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore) {
      setErrors((prev) => ({
        ...prev,
        howDoneBefore: "Please select one option.",
      }));
      return;
    }

    // Clear error before going to next step
    setErrors((prev) => {
      const { howDoneBefore, ...rest } = prev;
      return rest;
    });

    setStep(4);
  };

  const handleDetailsStep = () => {
    const newErrors = {};
    const {
      name,
      // code,
      bio,
      language,
      occupation,
      skills,
      link,
      work,
      email,
      phone,
    } = formData;

    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";
    // if (!code.trim()) newErrors.code = "Freelancer Code is required.";
    if (!bio.trim() || bio.length < 20 || /[\d]{10}|@|\+91/.test(bio))
      newErrors.bio = "Bio must be 20+ characters and without contact info.";
    if (!language.trim()) newErrors.language = "Languages Known is required.";
    if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
    if (!skills.trim()) newErrors.skills = "Skills are required.";
    if (!link.trim() || !isValidURL(link))
      newErrors.link = "Enter valid Portfolio Link.";
    if (!work.trim() || !isValidURL(work))
      newErrors.work = "Enter valid Work Link.";
    if (!email.trim() || !isValidEmail(email))
      newErrors.email = "Enter valid Email.";
    if (!isValidPhone(phone)) newErrors.phone = "Phone must be 10 digits.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    setStep(5);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const isValidURL = (url) =>
    /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

  const handleSubmitForm = async () => {
    const {
      name,
      bio,
      language,
      occupation,
      skills,
      link,
      work,
      email,
      phone,
      gigTopic,
      gigDescription,
    } = formData;

    const newErrors = {};

    if (!name.trim() || name.length < 3) {
      newErrors.name = "Full Name must be at least 3 letters.";
    } else if (!/^[A-Za-z\s]+$/.test(name)) {
      newErrors.name = "Full Name can only contain letters and spaces.";
    }

    if (!bio.trim() || bio.length < 20 || /[\d]{10}|@|\+91/.test(bio)) {
      newErrors.bio = "Bio must be 20+ characters and without contact info.";
    }

    if (!language.trim()) newErrors.language = "Languages Known is required.";
    if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
    if (!skills.trim()) newErrors.skills = "Skills are required.";
    if (!link.trim() || !isValidURL(link))
      newErrors.link = "Enter valid Portfolio Link.";
    if (!work.trim() || !isValidURL(work))
      newErrors.work = "Enter valid Work Link.";
    if (!email.trim() || !isValidEmail(email))
      newErrors.email = "Enter valid Email.";
    if (!isValidPhone(phone))
      newErrors.phone = "Phone must be 10 to 15 digits.";
    if (!gigTopic || gigTopic.trim().length < 3)
      newErrors.gigTopic = "Topic must be at least 3 characters.";
    if (!gigDescription || gigDescription.trim().length < 10)
      newErrors.gigDescription = "Please describe your gig in more detail.";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const submission = {
      freelancerType,
      experience,
      howDoneBefore,
      name,
      bio,
      language,
      occupation,
      skills,
      link,
      work,
      email,
      phone,
      gigTopic,
      gigDescription,
      createdAt: new Date().toISOString(),
    };

    try {
      await addDoc(collection(db, "freelancer-submissions"), submission);
      alert("✅ Form submitted successfully!");

      setStep(1);
      setFreelancerType("");
      setExperience("");
      setHowDoneBefore("");
      setFormData({
        name: "",
        bio: "",
        language: "",
        occupation: "",
        skills: "",
        link: "",
        work: "",
        email: "",
        phone: "",
        gigTopic: "",
        gigDescription: "",
      });
      setErrors({});
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
                } ${errors.freelancerType ? "input-error" : ""}`}
              >
                <input
                  type="radio"
                  name="freelancerType"
                  value={option.value}
                  onChange={() => {
                    setFreelancerType(option.value);
                    setErrors((prev) => ({ ...prev, freelancerType: "" }));
                  }}
                />
                <span>{option.label}</span>
              </label>
            ))}
          </div>
          {errors.freelancerType && (
            <p className="error-text">{errors.freelancerType}</p>
          )}

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
              type="number"
              name="experience"
              placeholder="e.g., 3"
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
                setErrors((prev) => ({ ...prev, experience: "" }));
              }}
              className={errors.experience ? "input-error" : ""}
            />
            {errors.experience && (
              <p className="error-text">{errors.experience}</p>
            )}
          </div>
          <div className="next-prev-btn">
            <div className="next-btn">
              <button className="next" onClick={backPeopleStep}>
                Prev
              </button>
            </div>
            <div className="next-btn">
              <button className="next" onClick={handlePeopleStep}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="done">
          <h3 className="question">Have you done freelance work before?</h3>
          <div
            className={`option-buttons ${
              errors.howDoneBefore ? "input-error" : ""
            }`}
          >
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
                  onChange={() => {
                    setHowDoneBefore(label);
                    setErrors((prev) => ({ ...prev, howDoneBefore: "" }));
                  }}
                />
                <span>{label}</span>
              </label>
            ))}
          </div>
          {errors.howDoneBefore && (
            <p className="error-text">{errors.howDoneBefore}</p>
          )}

          <div className="next-prev-btn">
            <div className="next-btn">
              <button className="next" onClick={backPeopleStep}>
                Prev
              </button>
            </div>
            <div className="next-btn">
              <button className="next" onClick={handleDoneBeforeStep}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="user-details-form">
          <h3 className="question">Please fill in your details</h3>
          <div className="form-fields">
            {[
              { name: "name", label: "Full Name *Private" },
              // { name: "code", label: "Freelancer code *Public" },
              { name: "bio", label: "Bio *No contact info" },
              { name: "language", label: "Languages Known" },
              { name: "occupation", label: "Occupation" },
              { name: "skills", label: "Skills" },
              { name: "link", label: "Portfolio Link" },
              { name: "work", label: "Best Work Link *No contact info" },
              { name: "email", label: "Email *Private" },
              { name: "phone", label: "Phone Number *Active" },
            ].map((field, idx) => (
              <div className="form-group" key={idx}>
                <label className="input-label">{field.label}</label>
                <input
                  type={field.name === "email" ? "email" : "text"}
                  name={field.name}
                  placeholder={field.label}
                  value={formData[field.name]}
                  onChange={handleInputChange}
                  className={errors[field.name] ? "input-error" : ""}
                />
                {errors[field.name] && (
                  <p className="error-text">{errors[field.name]}</p>
                )}
              </div>
            ))}
          </div>

          <div className="next-prev-btn">
            <div className="next-btn">
              <button className="next" onClick={() => setStep(3)}>
                Prev
              </button>
            </div>
            <div className="next-btn">
              <button className="next" onClick={handleDetailsStep}>
                Next
              </button>
            </div>
          </div>
        </div>
      )}

      {step === 5 && (
        <div className="post-gig">
          <h3 className="question">Post Your Gig</h3>

          <div className="form-group">
            <label htmlFor="gigTopic">Topic</label>
            <input
              type="text"
              id="gigTopic"
              name="gigTopic"
              placeholder="Enter topic"
              value={formData.gigTopic || ""}
              onChange={(e) =>
                setFormData({ ...formData, gigTopic: e.target.value })
              }
              className={errors.gigTopic ? "input-error" : ""}
            />
            {errors.gigTopic && <p className="error-text">{errors.gigTopic}</p>}
          </div>

          <div className="form-group">
            <label htmlFor="gigDescription">Describe More</label>
            <textarea
              id="gigDescription"
              name="gigDescription"
              rows="4"
              placeholder="Write details..."
              value={formData.gigDescription || ""}
              onChange={(e) =>
                setFormData({ ...formData, gigDescription: e.target.value })
              }
              className={errors.gigDescription ? "input-error" : ""}
            ></textarea>
            {errors.gigDescription && (
              <p className="error-text">{errors.gigDescription}</p>
            )}
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
