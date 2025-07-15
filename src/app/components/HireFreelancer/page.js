"use client";
import React, { useState } from "react";
import "./HireFreelancer.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useRouter } from "next/navigation";

const HireFreelancer = () => {
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
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "peopleWorking") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    }

    // else if (name === "post") {
    //   const linkValue = value.replace(/[^\w\-.:/?&=#]/g, "");
    //   setFormData((prev) => ({ ...prev, [name]: linkValue }));
    // }
    else if (name === "fullName") {
      const nameValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: nameValue }));
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

    // if (post && !/^https?:\/\/[\w\-.:/?&=#]+$/.test(post)) {
    //   errors.post = "Enter a valid URL.";
    // }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleGigSubmit = async () => {
    const { gigTopic, gigDescription } = formData;
    let newErrors = {};

    if (!gigTopic || gigTopic.trim().length < 3) {
      newErrors.gigTopic = "Topic must be at least 3 characters.";
    }

    if (!gigDescription || gigDescription.trim().length < 10) {
      newErrors.gigDescription = "Please describe your gig in more detail.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log("🔥 Sending to Firebase:", formData); // debug log
    await sendToFirebase(formData);
  };

  const router = useRouter();

  const sendToFirebase = async (data) => {
    try {
      await addDoc(collection(db, "sniper-forms"), {
        plan: firstField,
        ...data,
        createdAt: new Date().toISOString(),
      });

      // alert("✅ Form submitted successfully!");
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
            {formErrors.peopleWorking && (
              <p className="error-text">{formErrors.peopleWorking}</p>
            )}
          </div>
          <div className="next-btn">
            <button className="next" onClick={() => setStep(1)}>
              Previous
            </button>
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
            />
            {formErrors.bio && <p className="error-text">{formErrors.bio}</p>}
          </div>

          <div className="next-btn">
            <button
              className="next"
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
        <div className="post-gig">
          <h3 className="question">Post Your Gig</h3>

          <div className="form-group">
            <label htmlFor="gigTopic">Topic</label>
            <input
              type="text"
              id="gigTopic"
              name="gigTopic"
              placeholder="Enter topic"
              value={formData.gigTopic}
              onChange={handleInputChange}
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
              value={formData.gigDescription}
              onChange={handleInputChange}
              className={errors.gigDescription ? "input-error" : ""}
            ></textarea>
            {errors.gigDescription && (
              <p className="error-text">{errors.gigDescription}</p>
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
  );
};

export default HireFreelancer;
