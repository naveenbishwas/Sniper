// "use client";

// import React, { useState } from "react";
// import "./beSniper.css";
// import { collection, addDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase"; // Adjust path to your Firebase config

// const BeSniper = () => {
//   const [step, setStep] = useState(1);
//   const [freelancerType, setFreelancerType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [howDoneBefore, setHowDoneBefore] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     code: "",
//     bio: "",
//     language: "",
//     occupation: "",
//     skills: "",
//     link: "",
//     work: "",
//     email: "",
//     phone: "",
//   });

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleMainSubmit = () => {
//     if (!freelancerType) {
//       alert("Please select your freelancer type");
//       return;
//     }
//     setStep(2);
//   };

//   const handlePeopleStep = () => {
//     if (!experience.trim()) {
//       alert("Please enter your work experience.");
//       return;
//     }
//     setStep(3);
//   };

//   const handleDoneBeforeStep = () => {
//     if (!howDoneBefore) {
//       alert("Please select one option");
//       return;
//     }
//     setStep(4);
//   };

//   const handleSubmitForm = async () => {
//     const {
//       name,
//       code,
//       bio,
//       language,
//       occupation,
//       skills,
//       link,
//       work,
//       email,
//       phone,
//     } = formData;

//     if (
//       !name ||
//       !code ||
//       !bio ||
//       !language ||
//       !occupation ||
//       !skills ||
//       !link ||
//       !work ||
//       !email ||
//       !phone
//     ) {
//       alert("Please fill all required fields.");
//       return;
//     }

//     const submission = {
//       freelancerType,
//       experience,
//       howDoneBefore,
//       name,
//       code,
//       bio,
//       language,
//       occupation,
//       skills,
//       link,
//       work,
//       email,
//       phone,
//       createdAt: new Date().toISOString(),
//     };

//     try {
//       await addDoc(collection(db, "freelancer-submissions"), submission);
//       alert("✅ Form submitted successfully!");

//       // Reset
//       setStep(1);
//       setFreelancerType("");
//       setExperience("");
//       setHowDoneBefore("");
//       setFormData({
//         name: "",
//         code: "",
//         bio: "",
//         language: "",
//         occupation: "",
//         skills: "",
//         link: "",
//         work: "",
//         email: "",
//         phone: "",
//       });
//     } catch (error) {
//       console.error("❌ Firebase error:", error);
//       alert("Submission failed. Please try again.");
//     }
//   };

//   return (
//     <div className="sniper-page">
//       {step === 1 && (
//         <div className="kind-of-freelancer">
//           <h3 className="question">What kind of freelancer are you?</h3>
//           <div className="option-buttons">
//             {[
//               { value: "agency-employer", label: "Agency / Employer" },
//               { value: "side-hustle", label: "Side Hustle" },
//               { value: "solo-freelancer", label: "Solo Freelancer" },
//             ].map((option) => (
//               <label
//                 key={option.value}
//                 className={`option ${
//                   freelancerType === option.value ? "selected" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="freelancerType"
//                   value={option.value}
//                   onChange={() => setFreelancerType(option.value)}
//                 />
//                 <span>{option.label}</span>
//               </label>
//             ))}
//           </div>
//           <div className="next-btn">
//             <button className="next" onClick={handleMainSubmit}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 2 && (
//         <div className="work-experience">
//           <h3 className="question">What is your work experience?</h3>
//           <div className="form-fields">
//             <input
//               type="number"
//               name="experience"
//               placeholder="e.g., 3 years"
//               value={experience}
//               onChange={(e) => setExperience(e.target.value)}
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
//         <div className="done">
//           <h3 className="question">Have you done freelance work before?</h3>
//           <div className="option-buttons">
//             {[
//               "Getting Started",
//               "Done Offline Before",
//               "Done Online Before",
//               "Both Online & Offline",
//             ].map((label, index) => (
//               <label
//                 key={index}
//                 className={`option ${
//                   howDoneBefore === label ? "selected" : ""
//                 }`}
//               >
//                 <input
//                   type="radio"
//                   name="howDoneBefore"
//                   value={label}
//                   onChange={() => setHowDoneBefore(label)}
//                 />
//                 <span>{label}</span>
//               </label>
//             ))}
//           </div>
//           <div className="next-btn">
//             <button className="next" onClick={handleDoneBeforeStep}>
//               Next
//             </button>
//           </div>
//         </div>
//       )}

//       {step === 4 && (
//         <div className="user-details-form">
//           <h3 className="question">Please fill in your details</h3>
//           <div className="form-fields">
//             <div className="form-group">
//               <label className="input-label">
//                 Full Name <span className="private-note">*Private</span>
//               </label>
//               <input
//                 type="text"
//                 name="name"
//                 placeholder="Enter your full name"
//                 value={formData.name}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">
//                 Freelancer code{" "}
//                 <span className="private-note">
//                   *Displayed Publicly and assigned by us
//                 </span>
//               </label>
//               <input
//                 type="text"
//                 name="code"
//                 placeholder="Freelancer code (assigned by us) *Displayed Publicly and assigned by us"
//                 value={formData.code}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">
//                 Bio{" "}
//                 <span className="private-note">
//                   *Do not include email or phone
//                 </span>
//               </label>
//               <textarea
//                 name="bio"
//                 placeholder="Tell us about yourself *Not let type email or phone number"
//                 value={formData.bio}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">Languages Known</label>
//               <input
//                 type="text"
//                 name="language"
//                 placeholder="Languages Known"
//                 value={formData.language}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">Occupation</label>
//               <input
//                 type="text"
//                 name="occupation"
//                 placeholder="Occupation"
//                 value={formData.occupation}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">Skills</label>
//               <input
//                 type="text"
//                 name="skills"
//                 placeholder="Skills"
//                 value={formData.skills}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">Portfolio Link</label>
//               <input
//                 type="text"
//                 name="link"
//                 placeholder="Portfolio Link"
//                 value={formData.link}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">
//                 Best Work Link{" "}
//                 <span className="private-note">*No contact info allowed</span>
//               </label>
//               <input
//                 type="text"
//                 name="work"
//                 placeholder="One of your Best Work Link *Disclaimer No contact info to be shared or the project might  get rejected"
//                 value={formData.work}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">
//                 Email <span className="private-note">*Private</span>
//               </label>
//               <input
//                 type="email"
//                 name="email"
//                 placeholder="Email Address *Private"
//                 value={formData.email}
//                 onChange={handleInputChange}
//               />
//             </div>

//             <div className="form-group">
//               <label className="input-label">
//                 Phone Number <span className="private-note">*Active</span>
//               </label>
//               <input
//                 type="tel"
//                 name="phone"
//                 placeholder="Phone Number *Active"
//                 value={formData.phone}
//                 onChange={handleInputChange}
//               />
//             </div>
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

// export default BeSniper;

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
      alert("Please select your freelancer type.");
      return;
    }
    setStep(2);
  };

  const handlePeopleStep = () => {
    if (!experience.trim()) {
      alert("Please enter your work experience.");
      return;
    }
    if (isNaN(experience) || Number(experience) < 0) {
      alert("Experience must be a valid number.");
      return;
    }
    setStep(3);
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore) {
      alert("Please select one option.");
      return;
    }
    setStep(4);
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const isValidPhone = (phone) => /^[0-9]{10}$/.test(phone);

  const isValidURL = (url) =>
    /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

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

    if (!name.trim() || name.length < 3) {
      alert("Full Name must be at least 3 letters.");
      return;
    }
    if (!/^[A-Za-z\s]+$/.test(name)) {
      alert("Full Name can only contain letters and spaces.");
      return;
    }

    if (!code.trim()) {
      alert("Freelancer Code is required.");
      return;
    }

    if (!bio.trim() || bio.length < 20 || /[\d]{10}|@|\+91/.test(bio)) {
      alert(
        "Bio must be at least 20 characters and should not contain contact info."
      );
      return;
    }

    if (!language.trim()) {
      alert("Languages Known is required.");
      return;
    }

    if (!occupation.trim()) {
      alert("Occupation is required.");
      return;
    }

    if (!skills.trim()) {
      alert("Skills are required.");
      return;
    }

    if (!link.trim() || !isValidURL(link)) {
      alert("Valid Portfolio Link is required.");
      return;
    }

    if (!work.trim() || !isValidURL(work)) {
      alert("Valid Best Work Link is required.");
      return;
    }

    if (!email.trim() || !isValidEmail(email)) {
      alert("Valid Email Address is required.");
      return;
    }

    if (!/^\d{10,15}$/.test(phone)) {
      alert("Phone number must be 10 to 15 digits.");
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
              type="number"
              name="experience"
              placeholder="e.g., 3"
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
            {[
              { name: "name", label: "Full Name *Private" },
              { name: "code", label: "Freelancer code *Public" },
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
                />
              </div>
            ))}
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
