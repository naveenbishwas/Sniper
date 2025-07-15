"use client";

import React, { useState } from "react";
import "./beSniper.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const BeSniper = () => {
  const [step, setStep] = useState(1);
  const [freelancerType, setFreelancerType] = useState("");
  const [experience, setExperience] = useState("");
  const [howDoneBefore, setHowDoneBefore] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");

  const [formData, setFormData] = useState({
    name: "",
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
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleMainSubmit = () => {
    if (!freelancerType) {
      setErrors((prev) => ({
        ...prev,
        freelancerType: "Please select your freelancer type.",
      }));
      return;
    }

    setErrors((prev) => {
      const { freelancerType, ...rest } = prev;
      return rest;
    });

    setStep(2);
  };

  const handlePeopleStep = () => {
    if (!experience.trim() || isNaN(experience) || Number(experience) < 0) {
      setErrors((prev) => ({
        ...prev,
        experience: "Experience must be a valid number.",
      }));
      return;
    }

    setErrors((prev) => ({ ...prev, experience: "" }));
    setStep(3);
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore) {
      setErrors((prev) => ({
        ...prev,
        howDoneBefore: "Please select one option.",
      }));
      return;
    }

    setErrors((prev) => {
      const { howDoneBefore, ...rest } = prev;
      return rest;
    });

    setStep(4);
  };

  const router = useRouter();

  const handleDetailsSubmit = async () => {
    const newErrors = {};
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
    } = formData;

    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";

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

    try {
      await addDoc(collection(db, "be-sniper-forms"), {
        freelancerType,
        experience,
        howDoneBefore,
        ...formData,
        createdAt: new Date().toISOString(),
      });

      setSuccessMsg("✅ Form submitted successfully!");
      router.push("/components/successfull");

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
      });
    } catch (error) {
      alert("❌ Submission failed. Try again.");
      console.error("Firebase error:", error);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const isValidURL = (url) =>
    /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

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
            <button className="next" onClick={() => setStep(1)}>
              Prev
            </button>
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
            ].map((label) => (
              <label
                key={label}
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
            <button className="next" onClick={() => setStep(2)}>
              Prev
            </button>
            <button className="next" onClick={handleDoneBeforeStep}>
              Next
            </button>
          </div>
        </div>
      )}

      {step === 4 && (
        <div className="user-details-form">
          <h3 className="question">Please fill in your details</h3>
          {successMsg && <p className="success-text">{successMsg}</p>}
          <div className="form-fields">
            {[
              { name: "name", label: "Full Name *Private" },
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
            <button className="next" onClick={() => setStep(3)}>
              Prev
            </button>
            <button className="next" onClick={handleDetailsSubmit}>
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default BeSniper;
