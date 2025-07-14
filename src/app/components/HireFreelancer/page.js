// "use client";
// import React, { useState } from "react";
// import "./HireFreelancer.css";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";

// const HireFreelancer = () => {
//   const [firstField, setFirstField] = useState("");
//   const [step, setStep] = useState(1);
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phone: "",
//     bio: "",
//     post: "",
//     peopleWorking: "",
//   });

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;

//     // Restrict number fields to digits only
//     if (name === "phone" || name === "peopleWorking") {
//       const numericValue = value.replace(/\D/g, "");
//       setFormData((prev) => ({ ...prev, [name]: numericValue }));
//     } else if (name === "post") {
//       // Allow only URL-safe characters
//       const linkValue = value.replace(/[^\w\-.:/?&=#]/g, "");
//       setFormData((prev) => ({ ...prev, [name]: linkValue }));
//     } else if (name === "fullName") {
//       // Allow only letters and spaces
//       const nameValue = value.replace(/[^A-Za-z\s]/g, "");
//       setFormData((prev) => ({ ...prev, [name]: nameValue }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const handleFirstField = () => {
//     if (!firstField) {
//       alert("Please select what you plan to hire service for.");
//       return;
//     }
//     setStep(firstField === "personal" ? 3 : 2);
//   };

//   const handlePeopleStep = () => {
//     const people = formData.peopleWorking.trim();
//     if (!people || isNaN(people) || Number(people) <= 0) {
//       alert("Please enter a valid number of people.");
//       return;
//     }
//     setStep(3);
//   };

//   const validateForm = () => {
//     const { fullName, email, phone, bio, post } = formData;

//     if (!fullName.trim() || fullName.length < 3) {
//       alert("Full Name must be at least 3 letters.");
//       return false;
//     }
//     if (!/^[A-Za-z\s]+$/.test(fullName)) {
//       alert("Full Name can only contain letters and spaces.");
//       return false;
//     }

//     if (!email.trim() || !/^\S+@\S+\.\S+$/.test(email)) {
//       alert("Please enter a valid email address.");
//       return false;
//     }

//     if (!/^\d{10,15}$/.test(phone)) {
//       alert("Phone number must be 10–15 digits.");
//       return false;
//     }

//     if (!bio.trim() || bio.length < 20) {
//       alert("Bio must be at least 20 characters.");
//       return false;
//     }

//     if (post && !/^https?:\/\/[\w\-.:/?&=#]+$/.test(post)) {
//       alert("Please enter a valid URL in the Post field.");
//       return false;
//     }

//     return true;
//   };

//   const handleSubmitForm = () => {
//     if (!validateForm()) return;
//     sendToFirebase(formData);
//   };

//   const sendToFirebase = async (data) => {
//     try {
//       await addDoc(collection(db, "sniper-forms"), {
//         plan: firstField,
//         ...data,
//         createdAt: new Date().toISOString(),
//       });

//       alert("✅ Form submitted successfully!");
//       setStep(1);
//       setFirstField("");
//       setFormData({
//         fullName: "",
//         email: "",
//         phone: "",
//         bio: "",
//         post: "",
//         peopleWorking: "",
//       });
//     } catch (error) {
//       console.error("❌ Firebase error:", error);
//       alert("Failed to submit. Try again.");
//     }
//   };

//   return (
//     <div className="hiring-page">
//       {step === 1 && (
//         <div className="plan">
//           <h3 className="question">What do you plan to hire service for?</h3>
//           <div className="option-buttons">
//             {["personal", "job", "business"].map((value) => (
//               <label
//                 key={value}
//                 className={`option ${firstField === value ? "selected" : ""}`}
//               >
//                 <input
//                   type="radio"
//                   name="firstField"
//                   value={value}
//                   onChange={() => setFirstField(value)}
//                 />
//                 <span>{value.charAt(0).toUpperCase() + value.slice(1)}</span>
//               </label>
//             ))}
//           </div>

//           <div className="next-btn">
//             <button className="next" onClick={handleFirstField}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="how-many-people">
//           <h3 className="question">How many people work at your company?</h3>
//           <div className="form-fields">
//             <input
//               type="text"
//               name="peopleWorking"
//               placeholder="e.g., 5"
//               value={formData.peopleWorking}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="next-btn">
//             <button className="next" onClick={handlePeopleStep}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 3 && (
//         <div className="user-details-form">
//           <h3 className="question">Please fill in your details</h3>
//           <div className="form-fields">
//             <input
//               type="text"
//               name="fullName"
//               placeholder="Full Name"
//               value={formData.fullName}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="email"
//               name="email"
//               placeholder="Your Email"
//               value={formData.email}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="tel"
//               name="phone"
//               placeholder="Phone Number"
//               value={formData.phone}
//               onChange={handleInputChange}
//               required
//             />
//             <textarea
//               name="bio"
//               placeholder="Tell us about yourself (min. 20 characters)"
//               value={formData.bio}
//               onChange={handleInputChange}
//               required
//             />
//             <input
//               type="text"
//               name="post"
//               placeholder="Post a gig (Optional, add valid URL)"
//               value={formData.post}
//               onChange={handleInputChange}
//             />
//           </div>

//           <div className="next-btn">
//             <button className="next" onClick={handleSubmitForm}>
//               Submit
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default HireFreelancer;

"use client";
import React, { useState } from "react";
import "./HireFreelancer.css";
import { collection, addDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

const HireFreelancer = () => {
  const [firstField, setFirstField] = useState("");
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    bio: "",
    post: "",
    peopleWorking: "",
  });
  const [formErrors, setFormErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "phone" || name === "peopleWorking") {
      const numericValue = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: numericValue }));
    } else if (name === "post") {
      const linkValue = value.replace(/[^\w\-.:/?&=#]/g, "");
      setFormData((prev) => ({ ...prev, [name]: linkValue }));
    } else if (name === "fullName") {
      const nameValue = value.replace(/[^A-Za-z\s]/g, "");
      setFormData((prev) => ({ ...prev, [name]: nameValue }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    setFormErrors((prev) => ({ ...prev, [name]: "" }));
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
    const { fullName, email, phone, bio, post } = formData;
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

    if (post && !/^https?:\/\/[\w\-.:/?&=#]+$/.test(post)) {
      errors.post = "Enter a valid URL.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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

  const sendToFirebase = async (data) => {
    try {
      await addDoc(collection(db, "sniper-forms"), {
        plan: firstField,
        ...data,
        createdAt: new Date().toISOString(),
      });

      alert("✅ Form submitted successfully!");
      setStep(1);
      setFirstField("");
      setFormData({
        fullName: "",
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
              required
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
              required
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
              required
            />
            {formErrors.phone && (
              <p className="error-text">{formErrors.phone}</p>
            )}

            <textarea
              name="bio"
              placeholder="Tell us about yourself (min. 20 characters)"
              value={formData.bio}
              onChange={handleInputChange}
              required
            />
            {formErrors.bio && <p className="error-text">{formErrors.bio}</p>}

            <input
              type="text"
              name="post"
              placeholder="Post a gig (Optional, add valid URL)"
              value={formData.post}
              onChange={handleInputChange}
            />
            {formErrors.post && <p className="error-text">{formErrors.post}</p>}
          </div>

          <div className="next-btn">
            <button
              className="next"
              onClick={() => setStep(firstField === "personal" ? 1 : 2)}
            >
              Previous
            </button>
            <button className="next" onClick={handleSubmitForm}>
              Submit
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

export default HireFreelancer;
