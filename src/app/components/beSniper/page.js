"use client";

import React, { useState, useEffect } from "react";
import "./beSniper.css";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { generateUniqueId } from "@/lib/generateUniqueId";
import { useRouter } from "next/navigation";

export default function BeSniperModal({ onClose }) {
  const [step, setStep] = useState(1);
  const [freelancerType, setFreelancerType] = useState("");
  const [experience, setExperience] = useState("");
  const [howDoneBefore, setHowDoneBefore] = useState("");
  const [errors, setErrors] = useState({});
  const [successMsg, setSuccessMsg] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    language: "",
    occupation: "",
    categories: "",
    link: "",
    work: "",
    email: "",
    phone: "",
  });

  // free-text value when user selects "Others"
  const [otherOccupation, setOtherOccupation] = useState("");

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const storedRole = localStorage.getItem("userRole");
    const storedId = localStorage.getItem("uniqueId");
    if (storedRole === "beSniper" && storedId) {
      setStep(1);
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleInputChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setErrors((prev) => ({ ...prev, [e.target.name]: "" }));
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
      const { freelancerType: _drop, ...rest } = prev;
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
      const { howDoneBefore: _drop, ...rest } = prev;
      return rest;
    });
    setStep(4);
  };

  const handleDetailsSubmit = async () => {
    if (isSubmitting) return;

    const newErrors = {};
    const {
      name,
      bio,
      language,
      occupation,
      categories,
      link,
      work,
      email,
      phone,
    } = formData;

    // --- VALIDATION ---
    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";

    if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
      newErrors.bio = "Bio must be 150+ characters and without contact info.";

    if (!language.trim()) newErrors.language = "Languages Known is required.";

    if (!occupation.trim()) {
      newErrors.occupation = "Occupation is required.";
    } else if (occupation === "Others") {
      if (!otherOccupation.trim() || otherOccupation.trim().length < 2) {
        newErrors.otherOccupation = "Please specify your occupation.";
      }
    }

    // if (!categories.trim()) newErrors.categories = "Category is required.";

    if (!link.trim() || !isValidURL(link))
      newErrors.link = "Enter valid Portfolio Link.";
    if (!work.trim() || !isValidURL(work))
      newErrors.work = "Enter valid Work Link.";

    if (!email.trim() || !isValidEmail(email))
      newErrors.email = "Enter valid Email.";
    if (!isValidPhone(phone))
      newErrors.phone = "Phone must be 10–15 digits (numbers only).";

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setTimeout(() => {
        const el = document.querySelector(`.input-error`);
        if (el && typeof el.scrollIntoView === "function") {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
        console.warn("Validation blocked submit:", newErrors);
      }, 0);
      return;
    }

    // --- FIRESTORE WRITES ---
    try {
      setIsSubmitting(true);

      const role = "beSniper";
      const uniqueId = await generateUniqueId(name, email, role);

      const occupationToSave =
        occupation === "Others" ? otherOccupation.trim() : occupation;
      const occupationRaw = occupation;

      const userDoc = {
        ...formData,
        occupation: occupationToSave,
        occupationRaw,
        email: email.toLowerCase(),
        name,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      };

      const beSniperDoc = {
        ...formData,
        occupation: occupationToSave,
        occupationRaw,
        freelancerType,
        experience,
        howDoneBefore,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      };

      await setDoc(doc(db, "users", email.toLowerCase()), userDoc);
      await addDoc(collection(db, "be-sniper-forms"), beSniperDoc);

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("userRole", role);

      setSuccessMsg("Submitted successfully!");
      setIsSubmitting(false);

      router.push("/components/successfull");
    } catch (error) {
      setIsSubmitting(false);
      alert("❌ Submission failed. Check console for details.");
      console.error("Firebase error:", error);
    }
  };

  const languageOptions = [
    "English",
    "Hindi",
    "Bengali",
    "Marathi",
    "Gujarati",
    "Tamil",
    "Telugu",
    "Kannada",
    "Malayalam",
    "Punjabi",
    "Urdu",
    "Spanish",
    "French",
    "German",
    "Other",
  ];

  const occupationOptions = [
    "Graphic Designers / Graphic Designing",
    "Copywriters / Copywriting",
    "Copy Editors / Copy Editing",
    "Proofreaders / Proofreading",
    "Beta Readers / Beta Reading",
    "Translators / Translation",
    "Illustrators / Illustration",
    "Ghost Writers / Ghost Writing",
    "Voice Over Artists / Voice Over",
    "Video Editors / Video Editing",
    "Typesetter / Typesetting",
    "Literary Agents / Literary Representation",
    "Social Media Managers / Social Media Management",
    "Amazon Marketing Executives / Amazon Marketing Services",
    "Full Stack Developers / Web Development",
    "Content Writers / Content Writing",
    "Emcees / Event Coordination",
    "Others",
  ];

  return (
    <>
      {/* overlay WITHOUT outside click-to-close */}
      <div className="sniper-overlay">
        <div
          className="sniper-container"
          onClick={(e) => e.stopPropagation()} // keep clicks inside from bubbling
          role="dialog"
          aria-modal="true"
          aria-labelledby="be-sniper-title"
        >
          {/* Explicit Cancel button to close */}
          <button className="close-modal" onClick={onClose} aria-label="Cancel">
            &times;
          </button>

          <div className="sniper-page">
            {/* Step 1 */}
            {/* {step === 1 && (
              <div className="kind-of-freelancer">
                <h3 id="be-sniper-title" className="question">
                  What kind of freelancer are you?
                </h3>
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
                          setErrors((prev) => ({
                            ...prev,
                            freelancerType: "",
                          }));
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
            )} */}
            {step === 1 && (
              <div className="kind-of-freelancer">
                <h3 id="be-sniper-title" className="question">
                  What kind of freelancer are you?
                </h3>

                <div className="option-grid">
                  {[
                    {
                      value: "agency-employer",
                      label: "Agency / Employer",
                      img: "/agency.jpeg",
                    },
                    {
                      value: "side-hustle",
                      label: "Side Hustle",
                      img: "/side.jpeg",
                    },
                    {
                      value: "solo-freelancer",
                      label: "Solo Freelancer",
                      img: "/solo.jpeg",
                    },
                  ].map((option) => {
                    const selected = freelancerType === option.value;
                    return (
                      <label
                        key={option.value}
                        className={`option-card ${selected ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="freelancerType"
                          value={option.value}
                          checked={selected}
                          onChange={() => setFreelancerType(option.value)}
                        />
                        <div className="card-body">
                          <img
                            src={option.img}
                            alt={option.label}
                            className="card-img"
                          />
                          <span className="card-label">{option.label}</span>
                        </div>
                        {selected && <span className="checkmark">✓</span>}
                      </label>
                    );
                  })}
                </div>

                <div className="next-btn">
                  <button className="next" onClick={handleMainSubmit}>
                    Next
                  </button>
                </div>
              </div>
            )}

            {/* Step 2 */}
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

            {/* Step 3 */}
            {/* {step === 3 && (
              <div className="done">
                <h3 className="question">
                  Have you done freelance work before?
                </h3>
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
                          setErrors((prev) => ({
                            ...prev,
                            howDoneBefore: "",
                          }));
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
            )} */}
            {step === 3 && (
              <div className="done">
                <h3 className="question">
                  Have you done freelance work before?
                </h3>

                <div className="option-grid">
                  {[
                    {
                      value: "Getting Started",
                      label: "Getting Started",
                      img: "/getting-started.jpeg",
                    },
                    {
                      value: "Done Offline Before",
                      label: "Done Offline Before",
                      img: "/done-offline.jpeg",
                    },
                    {
                      value: "Done Online Before",
                      label: "Done Online Before",
                      img: "/done-online.jpeg",
                    },
                    {
                      value: "Both Online & Offline",
                      label: "Both Online & Offline",
                      img: "/both-online-offline.jpeg",
                    },
                  ].map((opt) => {
                    const selected = howDoneBefore === opt.value;
                    return (
                      <label
                        key={opt.value}
                        className={`option-card ${selected ? "selected" : ""}`}
                      >
                        <input
                          type="radio"
                          name="howDoneBefore"
                          value={opt.value}
                          checked={selected}
                          onChange={() => {
                            setHowDoneBefore(opt.value);
                            setErrors((prev) => ({
                              ...prev,
                              howDoneBefore: "",
                            }));
                          }}
                        />
                        <div className="card-body">
                          <img
                            src={opt.img}
                            alt={opt.label}
                            className="card-img"
                          />
                          <span className="card-label">{opt.label}</span>
                        </div>
                        {selected && <span className="checkmark">✓</span>}
                      </label>
                    );
                  })}
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

            {/* Step 4 */}
            {step === 4 && (
              <div className="user-details-form">
                <div className="user-details-form-scroll">
                  <h3 className="question">Please fill in your details</h3>
                  {successMsg && <p className="success-text">{successMsg}</p>}
                  <div className="form-fields">
                    {[
                      { name: "name", label: "Full Name *Private" },
                      {
                        name: "bio",
                        label: "Bio *No contact info (Chars Limit:- Min 150)",
                      },
                      {
                        name: "language",
                        label: "Languages Known",
                        type: "select",
                        options: languageOptions,
                      },
                      {
                        name: "occupation",
                        label: "Occupation",
                        type: "select",
                        options: occupationOptions,
                      },
                      { name: "link", label: "Portfolio Link" },
                      {
                        name: "work",
                        label: "Best Work Link *No contact info",
                      },
                      { name: "email", label: "Email *Private" },
                      { name: "phone", label: "Phone Number *Active" },
                    ].map((field, idx) => (
                      <div className="form-group" key={idx}>
                        <label className="input-label">{field.label}</label>

                        {field.type === "select" ? (
                          <select
                            name={field.name}
                            value={formData[field.name] || ""}
                            onChange={(e) => {
                              handleInputChange(e);
                              if (
                                field.name === "occupation" &&
                                e.target.value !== "Others"
                              ) {
                                setOtherOccupation("");
                                setErrors((prev) => ({
                                  ...prev,
                                  otherOccupation: "",
                                }));
                              }
                            }}
                            className={errors[field.name] ? "input-error" : ""}
                            autoComplete="off"
                          >
                            <option value="">Select {field.label}</option>
                            {field.options.map((opt) => (
                              <option key={opt} value={opt}>
                                {opt}
                              </option>
                            ))}
                          </select>
                        ) : (
                          <input
                            type={field.name === "email" ? "email" : "text"}
                            name={field.name}
                            placeholder={field.label}
                            value={formData[field.name]}
                            onChange={handleInputChange}
                            className={errors[field.name] ? "input-error" : ""}
                            autoComplete="off"
                          />
                        )}

                        {errors[field.name] && (
                          <p className="error-text">{errors[field.name]}</p>
                        )}

                        {field.name === "occupation" &&
                          formData.occupation === "Others" && (
                            <div
                              className="form-group"
                              style={{ marginTop: "8px" }}
                            >
                              <label className="input-label">
                                Please specify your occupation
                              </label>
                              <input
                                type="text"
                                name="otherOccupation"
                                placeholder="e.g., Book Publicist"
                                value={otherOccupation}
                                onChange={(e) => {
                                  setOtherOccupation(e.target.value);
                                  setErrors((prev) => ({
                                    ...prev,
                                    otherOccupation: "",
                                  }));
                                }}
                                className={
                                  errors.otherOccupation ? "input-error" : ""
                                }
                                autoComplete="off"
                              />
                              {errors.otherOccupation && (
                                <p className="error-text">
                                  {errors.otherOccupation}
                                </p>
                              )}
                            </div>
                          )}
                      </div>
                    ))}
                  </div>
                  <div className="next-prev-btn">
                    <button className="next" onClick={() => setStep(3)}>
                      Prev
                    </button>
                    <button
                      className="next"
                      onClick={handleDetailsSubmit}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Submitting..." : "Submit"}
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

// --- validators (unchanged) ---
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[0-9]{10,15}$/.test(phone);
}
function isValidURL(url) {
  return /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);
}
