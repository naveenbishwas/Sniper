"use client";
import React, { useState } from "react";
import "./HireFreelancer.css";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import { generateUniqueId } from "@/lib/generateUniqueId";
// Keeping these imports in case you use them later; safe to remove if unused.
// import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

const HireFreelancer = ({ onClose }) => {
  const [firstField, setFirstField] = useState("");
  const [step, setStep] = useState(1);
  const [errors, setErrors] = useState({});
  const [formErrors, setFormErrors] = useState({});

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    peopleWorking: "",
    gigTopic: "",
    gigDescription: "",
    gigDeadline: "",
    gigBudget: "",
    category: "",
  });

  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (["phone", "peopleWorking", "gigBudget"].includes(name)) {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name === "fullName") {
      const nameValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: nameValue }));
    } else if (name === "gigDescription") {
      const emailRegex = /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i;
      const phoneRegex = /\b\d{10,}\b/;
      if (emailRegex.test(value) || phoneRegex.test(value)) {
        setErrors((prev) => ({
          ...prev,
          gigDescription: "Email IDs or phone numbers are not allowed.",
        }));
        return;
      }
      setFormData((prev) => ({ ...prev, [name]: value }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
    setFormErrors((prev) => ({ ...prev, [name]: "" }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFirstField = () => {
    if (!firstField) {
      setFormErrors({ firstField: "Please select a service type." });
      return;
    }
    setFormErrors({});
    setStep(firstField === "personal" ? 3 : 2);
  };

  const handlePeopleStep = () => {
    if (!formData.peopleWorking || Number(formData.peopleWorking) <= 0) {
      setFormErrors({ peopleWorking: "Enter a valid number of people." });
      return;
    }
    setFormErrors({});
    setStep(3);
  };

  const validateForm = () => {
    const { fullName, email, phone, bio } = formData;
    let errors = {};
    if (!fullName.trim() || fullName.length < 3) {
      errors.fullName = "Full Name must be at least 3 letters.";
    }
    if (!/^[A-Za-z\s]+$/.test(fullName)) {
      errors.fullName = "Only letters and spaces allowed.";
    }
    if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
      errors.email = "Enter a valid email address.";
    }
    if (!/^\d{10,15}$/.test(phone)) {
      errors.phone = "Phone number must be 10–15 digits.";
    }
    if (!bio.trim() || bio.length < 20) {
      errors.bio = "Bio must be at least 20 characters.";
    }
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGigSubmit = async () => {
    const { gigTopic, gigDescription, gigDeadline, gigBudget, category } =
      formData;
    let newErrors = {};
    if (!gigTopic || gigTopic.trim().length < 3) {
      newErrors.gigTopic = "Topic must be at least 3 characters.";
    }
    if (
      !gigDescription ||
      gigDescription.trim().length < 150 ||
      gigDescription.trim().length > 250
    ) {
      newErrors.gigDescription =
        "Please describe your gig in 150–250 characters.";
    }
    if (!category) newErrors.category = "Please select a category.";
    if (!gigDeadline) newErrors.gigDeadline = "Please select a deadline.";
    if (!gigBudget || isNaN(gigBudget) || Number(gigBudget) <= 0) {
      newErrors.gigBudget = "Enter a valid numeric budget.";
    }
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    try {
      const role = "HireFreelancer";
      const { fullName, email } = formData;
      const uniqueId = await generateUniqueId(fullName, email, role);

      await setDoc(doc(db, "users", email), {
        name: fullName,
        email,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      });

      await addDoc(collection(db, "sniper-forms"), {
        plan: firstField,
        ...formData,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("userRole", role);
      router.push("/components/successfull");

      setStep(1);
      setFirstField("");
      setErrors({});
      setFormErrors({});
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        bio: "",
        peopleWorking: "",
        gigTopic: "",
        gigDescription: "",
        gigDeadline: "",
        gigBudget: "",
        category: "",
      });
    } catch (error) {
      console.error("❌ Firebase error:", error);
      alert("Failed to submit. Try again.");
    }
  };

  return (
    // ⬇️ Removed onClick={onClose} here so outside clicks DON'T close the modal
    <div className="modal-overlay">
      {/* Keeping stopPropagation is fine; it prevents any future overlay handlers from firing */}
      <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
        <div
          className="hiring-page"
          role="dialog"
          aria-modal="true"
          aria-labelledby="hire-title"
        >
          {/* Close only via this button */}
          <button
            className="close-modal"
            onClick={onClose}
            aria-label="Close modal"
          >
            &times;
          </button>

          {step === 1 && (
            <div className="plan fade-in">
              <h3 id="hire-title" className="question">
                What do you plan to hire service for?
              </h3>
              <div className="option-buttons">
                {["personal", "job", "business"].map((value) => (
                  <label
                    key={value}
                    className={`option ${
                      firstField === value ? "selected" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      name="firstField"
                      value={value}
                      onChange={() => setFirstField(value)}
                    />
                    <span>
                      {value.charAt(0).toUpperCase() + value.slice(1)}
                    </span>
                  </label>
                ))}
              </div>
              {formErrors.firstField && (
                <p className="error-text">{formErrors.firstField}</p>
              )}
              <div className="next-btn">
                <button className="next" onClick={handleFirstField}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 2 && (
            <div className="how-many-people fade-in">
              <h3 className="question">
                How many people work at your company?
              </h3>
              <div className="form-fields">
                <input
                  type="text"
                  name="peopleWorking"
                  placeholder="e.g., 5"
                  value={formData.peopleWorking}
                  onChange={handleInputChange}
                />
                {formErrors.peopleWorking && (
                  <p className="error-text">{formErrors.peopleWorking}</p>
                )}
              </div>
              <div className="next-btn">
                <button className="next back" onClick={() => setStep(1)}>
                  Previous
                </button>
                <button className="next" onClick={handlePeopleStep}>
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="user-details-form fade-in">
              <h3 className="question">Please fill in your details</h3>
              <div className="form-fields">
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                />
                {formErrors.fullName && (
                  <p className="error-text">{formErrors.fullName}</p>
                )}
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleInputChange}
                />
                {formErrors.email && (
                  <p className="error-text">{formErrors.email}</p>
                )}
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
                {formErrors.phone && (
                  <p className="error-text">{formErrors.phone}</p>
                )}
                <textarea
                  name="bio"
                  placeholder="Tell us about yourself (min. 20 characters)"
                  value={formData.bio}
                  onChange={handleInputChange}
                ></textarea>
                {formErrors.bio && (
                  <p className="error-text">{formErrors.bio}</p>
                )}
              </div>
              <div className="next-btn">
                <button
                  className="next back"
                  onClick={() => setStep(firstField === "personal" ? 1 : 2)}
                >
                  Previous
                </button>
                <button
                  className="next"
                  onClick={() => {
                    if (validateForm()) setStep(4);
                  }}
                >
                  Next
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="post-gig fade-in">
              <h3 className="question">Post Your Gig</h3>
              <div className="form-group">
                <label htmlFor="gigTopic">Topic</label>
                <input
                  type="text"
                  id="gigTopic"
                  name="gigTopic"
                  value={formData.gigTopic}
                  onChange={handleInputChange}
                  className={errors.gigTopic ? "input-error" : ""}
                />
                {errors.gigTopic && (
                  <p className="error-text">{errors.gigTopic}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="gigDescription">Describe</label>
                <textarea
                  id="gigDescription"
                  name="gigDescription"
                  rows="4"
                  value={formData.gigDescription}
                  onChange={handleInputChange}
                  className={errors.gigDescription ? "input-error" : ""}
                ></textarea>
                {errors.gigDescription && (
                  <p className="error-text">{errors.gigDescription}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className={errors.category ? "input-error" : ""}
                >
                  <option value="">Select a category</option>
                  <option value="graphic-designing">Graphic Designing</option>
                  <option value="copywriting">Copywriting</option>
                  <option value="proofreading">Proofreading</option>
                  <option value="translation">Translation</option>
                  <option value="voice-over">Voice Over</option>
                  <option value="video-editing">Video Editing</option>
                  <option value="web-development">Web Development</option>
                  <option value="content-writing">Content Writing</option>
                  <option value="social-media-management">
                    Social Media Management
                  </option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="gigDeadline">Deadline</label>
                <input
                  type="date"
                  id="gigDeadline"
                  name="gigDeadline"
                  value={formData.gigDeadline}
                  onChange={handleInputChange}
                  className={errors.gigDeadline ? "input-error" : ""}
                />
                {errors.gigDeadline && (
                  <p className="error-text">{errors.gigDeadline}</p>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="gigBudget">Budget (INR)</label>
                <input
                  type="text"
                  id="gigBudget"
                  name="gigBudget"
                  value={formData.gigBudget}
                  onChange={handleInputChange}
                  className={errors.gigBudget ? "input-error" : ""}
                />
                {errors.gigBudget && (
                  <p className="error-text">{errors.gigBudget}</p>
                )}
              </div>
              <div className="next-btn">
                <button className="next" onClick={handleGigSubmit}>
                  Submit
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default HireFreelancer;
