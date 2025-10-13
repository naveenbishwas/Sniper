// "use client";

// import React, { useState, useEffect } from "react";
// import "./beSniper.css";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { generateUniqueId } from "@/lib/generateUniqueId";
// import { useRouter } from "next/navigation";

// export default function BeSniperModal({ onClose }) {
//   const [step, setStep] = useState(1);
//   const [freelancerType, setFreelancerType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [howDoneBefore, setHowDoneBefore] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successMsg, setSuccessMsg] = useState("");
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     language: [], // changed to array
//     occupation: "",
//     categories: "",
//     link: "",
//     work: "",
//     email: "",
//     phone: "",
//   });

//   const [otherOccupation, setOtherOccupation] = useState("");

//   const router = useRouter();

//   useEffect(() => {
//     document.body.style.overflow = "hidden";
//     const storedRole = localStorage.getItem("userRole");
//     const storedId = localStorage.getItem("uniqueId");
//     if (storedRole === "beSniper" && storedId) {
//       setStep(1);
//     }
//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));

//     // 👇 bio live character count logic
//     if (name === "bio") {
//       const min = 150;
//       const max = 500;
//       if (value.length < min) {
//         setBioCount(`${min - value.length} characters remaining`);
//       } else if (value.length > max) {
//         setBioCount(`${value.length - max} characters over limit`);
//       } else {
//         setBioCount(`${value.length} characters`);
//       }
//     }
//   };

//   // For multi-select language
//   const handleLanguageChange = (e) => {
//     const selected = Array.from(e.target.selectedOptions, (opt) => opt.value);
//     setFormData((prev) => ({ ...prev, language: selected }));
//     setErrors((prev) => ({ ...prev, language: "" }));
//   };

//   const handleMainSubmit = () => {
//     if (!freelancerType) {
//       setErrors((prev) => ({
//         ...prev,
//         freelancerType: "Please select your freelancer type.",
//       }));
//       return;
//     }
//     setErrors((prev) => {
//       const { freelancerType: _drop, ...rest } = prev;
//       return rest;
//     });
//     setStep(2);
//   };

//   const handlePeopleStep = () => {
//     if (!experience.trim() || isNaN(experience) || Number(experience) < 0) {
//       setErrors((prev) => ({
//         ...prev,
//         experience: "Experience must be a valid number.",
//       }));
//       return;
//     }
//     setErrors((prev) => ({ ...prev, experience: "" }));
//     setStep(3);
//   };

//   const handleDoneBeforeStep = () => {
//     if (!howDoneBefore) {
//       setErrors((prev) => ({
//         ...prev,
//         howDoneBefore: "Please select one option.",
//       }));
//       return;
//     }
//     setErrors((prev) => {
//       const { howDoneBefore: _drop, ...rest } = prev;
//       return rest;
//     });
//     setStep(4);
//   };

//   const handleDetailsSubmit = async () => {
//     if (isSubmitting) return;

//     const newErrors = {};
//     const {
//       name,
//       bio,
//       language,
//       occupation,
//       categories,
//       link,
//       work,
//       email,
//       phone,
//     } = formData;

//     // --- VALIDATION ---
//     if (!name.trim() || name.length < 3)
//       newErrors.name = "Full Name must be at least 3 letters.";
//     else if (!/^[A-Za-z\s]+$/.test(name))
//       newErrors.name = "Full Name can only contain letters and spaces.";

//     if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
//       newErrors.bio = "Bio must be 150+ characters and without contact info.";

//     if (!language.length)
//       newErrors.language = "Please select at least one language.";

//     if (!occupation.trim()) {
//       newErrors.occupation = "Occupation is required.";
//     } else if (occupation === "Others") {
//       if (!otherOccupation.trim() || otherOccupation.trim().length < 2) {
//         newErrors.otherOccupation = "Please specify your occupation.";
//       }
//     }

//     if (!link.trim() || !isValidURL(link))
//       newErrors.link = "Enter valid Portfolio Link.";
//     if (!work.trim() || !isValidURL(work))
//       newErrors.work = "Enter valid Work Link.";

//     if (!email.trim() || !isValidEmail(email))
//       newErrors.email = "Enter valid Email.";
//     if (!isValidPhone(phone))
//       newErrors.phone = "Phone must be 10–15 digits (numbers only).";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       setTimeout(() => {
//         const el = document.querySelector(`.input-error`);
//         if (el && typeof el.scrollIntoView === "function") {
//           el.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }, 0);
//       return;
//     }

//     try {
//       setIsSubmitting(true);

//       const role = "beSniper";
//       const uniqueId = await generateUniqueId(name, email, role);

//       const occupationToSave =
//         occupation === "Others" ? otherOccupation.trim() : occupation;
//       const occupationRaw = occupation;

//       const userDoc = {
//         ...formData,
//         occupation: occupationToSave,
//         occupationRaw,
//         email: email.toLowerCase(),
//         name,
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       };

//       const beSniperDoc = {
//         ...formData,
//         occupation: occupationToSave,
//         occupationRaw,
//         freelancerType,
//         experience,
//         howDoneBefore,
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       };

//       await setDoc(doc(db, "users", email.toLowerCase()), userDoc);
//       await addDoc(collection(db, "be-sniper-forms"), beSniperDoc);

//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("userRole", role);

//       setSuccessMsg("Submitted successfully!");
//       setIsSubmitting(false);

//       router.push("/components/successfull");
//     } catch (error) {
//       setIsSubmitting(false);
//       alert("❌ Submission failed. Check console for details.");
//       console.error("Firebase error:", error);
//     }
//   };

//   const languageOptions = [
//     "English",
//     "Hindi",
//     "Bengali",
//     "Marathi",
//     "Gujarati",
//     "Tamil",
//     "Telugu",
//     "Kannada",
//     "Malayalam",
//     "Punjabi",
//     "Urdu",
//     "Spanish",
//     "French",
//     "German",
//     "Other",
//   ];

//   const occupationOptions = [
//     "Graphic Designers ",
//     "Copywriters",
//     "Copy Editors",
//     "Proofreaders",
//     "Beta Readers",
//     "Translators",
//     "Illustrators",
//     "Ghost Writers",
//     "Voice Over Artists",
//     "Video Editors",
//     "Typesetter",
//     "Literary Agents resentation",
//     "Social Media Managers  Management",
//     "Amazon Marketing Executives ting Services",
//     "Full Stack Developers ent",
//     "Content Writers ing",
//     "Emcees nation",
//     "Others",
//   ];

//   return (
//     <>
//       <div className="sniper-overlay">
//         <div
//           className={`sniper-container ${step === 2 ? "narrow-container" : ""}`}
//           onClick={(e) => e.stopPropagation()}
//           role="dialog"
//           aria-modal="true"
//           aria-labelledby="be-sniper-title"
//         >
//           <button className="close-modal" onClick={onClose} aria-label="Cancel">
//             &times;
//           </button>

//           <div className="sniper-page">
//             {step === 1 && (
//               <div className="kind-of-freelancer">
//                 <h3 id="be-sniper-title" className="question">
//                   What kind of freelancer are you?
//                 </h3>

//                 <div className="option-grid">
//                   {[
//                     {
//                       value: "agency-employer",
//                       label: "Agency / Employer",
//                       img: "/agency.jpeg",
//                     },
//                     {
//                       value: "side-hustle",
//                       label: "Side Hustle",
//                       img: "/side.jpeg",
//                     },
//                     {
//                       value: "solo-freelancer",
//                       label: "Solo Freelancer",
//                       img: "/solo.jpeg",
//                     },
//                   ].map((option) => {
//                     const selected = freelancerType === option.value;
//                     return (
//                       <label
//                         key={option.value}
//                         className={`option-card ${selected ? "selected" : ""}`}
//                       >
//                         <input
//                           type="radio"
//                           name="freelancerType"
//                           value={option.value}
//                           checked={selected}
//                           onChange={() => setFreelancerType(option.value)}
//                         />
//                         <div className="card-body">
//                           <img
//                             src={option.img}
//                             alt={option.label}
//                             className="card-img"
//                           />
//                           <span className="card-label">{option.label}</span>
//                         </div>
//                         {selected && <span className="checkmark">✓</span>}
//                       </label>
//                     );
//                   })}
//                 </div>

//                 <div className="next-btn">
//                   <button className="next" onClick={handleMainSubmit}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* Step 2 */}
//             {step === 2 && (
//               <div className="work-experience step-2-narrow">
//                 <h3 className="question">What is your work experience?</h3>
//                 <div className="form-fields">
//                   <input
//                     type="number"
//                     name="experience"
//                     placeholder="e.g., 3"
//                     value={experience}
//                     onChange={(e) => {
//                       setExperience(e.target.value);
//                       setErrors((prev) => ({ ...prev, experience: "" }));
//                     }}
//                     className={errors.experience ? "input-error" : ""}
//                   />
//                   {errors.experience && (
//                     <p className="error-text">{errors.experience}</p>
//                   )}
//                 </div>
//                 <div className="next-prev-btn">
//                   <button className="next" onClick={() => setStep(1)}>
//                     Prev
//                   </button>
//                   <button className="next" onClick={handlePeopleStep}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* Step 3 */}
//             {step === 3 && (
//               <div className="done">
//                 <h3 className="question">
//                   Have you done freelance work before?
//                 </h3>

//                 <div className="option-grid">
//                   {[
//                     {
//                       value: "Getting Started",
//                       label: "Getting Started",
//                       img: "/getting-started2.png",
//                     },
//                     {
//                       value: "Done Offline Before",
//                       label: "Done Offline Before",
//                       img: "/done-offline.png",
//                     },
//                     {
//                       value: "Done Online Before",
//                       label: "Done Online Before",
//                       img: "/online3.png",
//                     },
//                     {
//                       value: "Both Online & Offline",
//                       label: "Both Online & Offline",
//                       img: "/both-online-oflline2.png",
//                     },
//                   ].map((opt) => {
//                     const selected = howDoneBefore === opt.value;
//                     return (
//                       <label
//                         key={opt.value}
//                         className={`option-card ${selected ? "selected" : ""}`}
//                       >
//                         <input
//                           type="radio"
//                           name="howDoneBefore"
//                           value={opt.value}
//                           checked={selected}
//                           onChange={() => {
//                             setHowDoneBefore(opt.value);
//                             setErrors((prev) => ({
//                               ...prev,
//                               howDoneBefore: "",
//                             }));
//                           }}
//                         />
//                         <div className="card-body">
//                           <img
//                             src={opt.img}
//                             alt={opt.label}
//                             className="card-img"
//                           />
//                           <span className="card-label">{opt.label}</span>
//                         </div>
//                         {selected && <span className="checkmark">✓</span>}
//                       </label>
//                     );
//                   })}
//                 </div>

//                 {errors.howDoneBefore && (
//                   <p className="error-text">{errors.howDoneBefore}</p>
//                 )}

//                 <div className="next-prev-btn">
//                   <button className="next" onClick={() => setStep(2)}>
//                     Prev
//                   </button>
//                   <button className="next" onClick={handleDoneBeforeStep}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}
//             {/* Step 4 */}
//             {step === 4 && (
//               <div className="user-details-form">
//                 <div className="user-details-form-scroll">
//                   <h3 className="question">Please fill in your details</h3>
//                   {successMsg && <p className="success-text">{successMsg}</p>}
//                   <div className="form-fields">
//                     {[
//                       { name: "name", label: "Full Name *Private" },
//                       {
//                         name: "bio",
//                         label: "Bio *No contact info (Chars Limit:- Min 150)",
//                       },
//                       {
//                         name: "language",
//                         label: "Languages Known",
//                         type: "checkboxes", // changed here
//                         options: languageOptions,
//                       },
//                       {
//                         name: "occupation",
//                         label: "Occupation",
//                         type: "select",
//                         options: occupationOptions,
//                       },
//                       { name: "link", label: "Portfolio Link" },
//                       {
//                         name: "work",
//                         label: "Best Work Link *No contact info",
//                       },
//                       { name: "email", label: "Email *Private" },
//                       { name: "phone", label: "Phone Number *Active" },
//                     ].map((field, idx) => (
//                       <div className="form-group" key={idx}>
//                         <label className="input-label">{field.label}</label>

//                         {field.type === "select" ? (
//                           <select
//                             name={field.name}
//                             value={formData[field.name] || ""}
//                             onChange={(e) => {
//                               handleInputChange(e);
//                               if (
//                                 field.name === "occupation" &&
//                                 e.target.value !== "Others"
//                               ) {
//                                 setOtherOccupation("");
//                                 setErrors((prev) => ({
//                                   ...prev,
//                                   otherOccupation: "",
//                                 }));
//                               }
//                             }}
//                             className={errors[field.name] ? "input-error" : ""}
//                             autoComplete="off"
//                           >
//                             <option value="">Select {field.label}</option>
//                             {field.options.map((opt) => (
//                               <option key={opt} value={opt}>
//                                 {opt}
//                               </option>
//                             ))}
//                           </select>
//                         ) : field.type === "checkboxes" ? (
//                           <div className="checkbox-group">
//                             {field.options.map((opt) => (
//                               <label key={opt} className="checkbox-item">
//                                 <input
//                                   type="checkbox"
//                                   value={opt}
//                                   checked={formData.language.includes(opt)}
//                                   onChange={(e) => {
//                                     let updated = [...formData.language];
//                                     if (e.target.checked) {
//                                       updated.push(opt);
//                                     } else {
//                                       updated = updated.filter(
//                                         (lang) => lang !== opt
//                                       );
//                                     }
//                                     setFormData((prev) => ({
//                                       ...prev,
//                                       language: updated,
//                                     }));
//                                     setErrors((prev) => ({
//                                       ...prev,
//                                       language: "",
//                                     }));
//                                   }}
//                                 />
//                                 <span>{opt}</span>
//                               </label>
//                             ))}
//                           </div>
//                         ) : (
//                           <input
//                             type={field.name === "email" ? "email" : "text"}
//                             name={field.name}
//                             placeholder={field.label}
//                             value={formData[field.name]}
//                             onChange={handleInputChange}
//                             className={errors[field.name] ? "input-error" : ""}
//                             autoComplete="off"
//                           />
//                         )}

//                         {errors[field.name] && (
//                           <p className="error-text">{errors[field.name]}</p>
//                         )}

//                         {field.name === "occupation" &&
//                           formData.occupation === "Others" && (
//                             <div
//                               className="form-group"
//                               style={{ marginTop: "8px" }}
//                             >
//                               <label className="input-label">
//                                 Please specify your occupation
//                               </label>
//                               <input
//                                 type="text"
//                                 name="otherOccupation"
//                                 placeholder="e.g., Book Publicist"
//                                 value={otherOccupation}
//                                 onChange={(e) => {
//                                   setOtherOccupation(e.target.value);
//                                   setErrors((prev) => ({
//                                     ...prev,
//                                     otherOccupation: "",
//                                   }));
//                                 }}
//                                 className={
//                                   errors.otherOccupation ? "input-error" : ""
//                                 }
//                                 autoComplete="off"
//                               />
//                               {errors.otherOccupation && (
//                                 <p className="error-text">
//                                   {errors.otherOccupation}
//                                 </p>
//                               )}
//                             </div>
//                           )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="next-prev-btn">
//                     <button className="next" onClick={() => setStep(3)}>
//                       Prev
//                     </button>
//                     <button
//                       className="next"
//                       onClick={handleDetailsSubmit}
//                       disabled={isSubmitting}
//                     >
//                       {isSubmitting ? "Submitting..." : "Submit"}
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// // --- validators ---
// function isValidEmail(email) {
//   return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// }
// function isValidPhone(phone) {
//   return /^[0-9]{10,15}$/.test(phone);
// }
// function isValidURL(url) {
//   return /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);
// }

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
  const [bioCount, setBioCount] = useState(""); // ✅ live counter

  const [formData, setFormData] = useState({
    name: "",
    bio: "",
    language: [],
    occupation: "",
    categories: "",
    link: "",
    work: "",
    email: "",
    phone: "",
  });

  const [otherOccupation, setOtherOccupation] = useState("");
  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const storedRole = localStorage.getItem("userRole");
    const storedId = localStorage.getItem("uniqueId");
    if (storedRole === "beSniper" && storedId) setStep(1);
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // ✅ live bio character count
    if (name === "bio") {
      const min = 150;
      const max = 500;
      if (value.length < min)
        setBioCount(`${min - value.length} characters remaining`);
      else if (value.length > max)
        setBioCount(`${value.length - max} characters over limit`);
      else setBioCount(`${value.length} characters`);
    }
  };

  const handleMainSubmit = () => {
    if (!freelancerType)
      return setErrors((p) => ({
        ...p,
        freelancerType: "Please select your freelancer type.",
      }));
    setErrors((p) => {
      const { freelancerType, ...rest } = p;
      return rest;
    });
    setStep(2);
  };

  const handlePeopleStep = () => {
    if (!experience.trim() || isNaN(experience) || Number(experience) < 0)
      return setErrors((p) => ({
        ...p,
        experience: "Experience must be a valid number.",
      }));
    setErrors((p) => ({ ...p, experience: "" }));
    setStep(3);
  };

  const handleDoneBeforeStep = () => {
    if (!howDoneBefore)
      return setErrors((p) => ({
        ...p,
        howDoneBefore: "Please select one option.",
      }));
    setErrors((p) => {
      const { howDoneBefore, ...rest } = p;
      return rest;
    });
    setStep(4);
  };

  const handleDetailsSubmit = async () => {
    if (isSubmitting) return;

    const newErrors = {};
    const { name, bio, language, occupation, link, work, email, phone } =
      formData;

    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";

    if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
      newErrors.bio = "Bio must be 150+ characters and without contact info.";

    if (!language.length)
      newErrors.language = "Please select at least one language.";

    if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
    else if (
      occupation === "Others" &&
      (!otherOccupation.trim() || otherOccupation.trim().length < 2)
    )
      newErrors.otherOccupation = "Please specify your occupation.";

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
        const el = document.querySelector(".input-error");
        el?.scrollIntoView({ behavior: "smooth", block: "center" });
      }, 0);
      return;
    }

    try {
      setIsSubmitting(true);
      const role = "Be A Freelancer";
      const uniqueId = await generateUniqueId(name, email, role);

      const occToSave =
        occupation === "Others" ? otherOccupation.trim() : occupation;
      const occRaw = occupation;

      const userDoc = {
        ...formData,
        occupation: occToSave,
        occupationRaw: occRaw,
        email: email.toLowerCase(),
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      };

      const beSniperDoc = {
        ...formData,
        occupation: occToSave,
        occupationRaw: occRaw,
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
    "Graphic Designers ",
    "Copywriters",
    "Copy Editors",
    "Proofreaders",
    "Beta Readers",
    "Translators",
    "Illustrators",
    "Ghost Writers",
    "Voice Over Artists",
    "Video Editors",
    "Typesetter",
    "Literary Agents resentation",
    "Social Media Managers  Management",
    "Amazon Marketing Executives ting Services",
    "Full Stack Developers ent",
    "Content Writers ing",
    "Emcees nation",
    "Others",
  ];

  return (
    <>
      <div className="sniper-overlay">
        <div
          className={`sniper-container ${step === 2 ? "narrow-container" : ""}`}
          onClick={(e) => e.stopPropagation()}
          role="dialog"
          aria-modal="true"
          aria-labelledby="be-sniper-title"
        >
          <button className="close-modal" onClick={onClose} aria-label="Cancel">
            &times;
          </button>

          <div className="sniper-page">
            {/* ✅ Steps 1-3 unchanged */}
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
              <div className="work-experience step-2-narrow">
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
                      img: "/getting-started2.png",
                    },
                    {
                      value: "Done Offline Before",
                      label: "Done Offline Before",
                      img: "/done-offline.png",
                    },
                    {
                      value: "Done Online Before",
                      label: "Done Online Before",
                      img: "/online3.png",
                    },
                    {
                      value: "Both Online & Offline",
                      label: "Both Online & Offline",
                      img: "/both-online-oflline2.png",
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

            {/* ✅ Step 4 — full form with language & occupation */}
            {step === 4 && (
              <div className="user-details-form">
                <div className="user-details-form-scroll">
                  <h3 className="question">Please fill in your details</h3>
                  {successMsg && <p className="success-text">{successMsg}</p>}

                  <div className="form-fields">
                    {/* Name */}
                    <div className="form-group">
                      <label className="input-label">Full Name *Private</label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className={errors.name ? "input-error" : ""}
                      />
                      {errors.name && (
                        <p className="error-text">{errors.name}</p>
                      )}
                    </div>

                    {/* Bio */}
                    <div className="form-group">
                      <label className="input-label">
                        Bio *No contact info (Min 150, Max 500)
                      </label>
                      <textarea
                        name="bio"
                        rows={4}
                        value={formData.bio}
                        onChange={handleInputChange}
                        className={errors.bio ? "input-error" : ""}
                      />
                      {bioCount && (
                        <p
                          style={{
                            fontSize: "12px",
                            marginTop: "4px",
                            color:
                              formData.bio.length < 150
                                ? "orange"
                                : formData.bio.length > 500
                                ? "red"
                                : "green",
                          }}
                        >
                          {bioCount}
                        </p>
                      )}
                      {errors.bio && <p className="error-text">{errors.bio}</p>}
                    </div>

                    {/* Languages */}
                    <div className="form-group">
                      <label className="input-label">Languages Known</label>
                      <div className="checkbox-group">
                        {languageOptions.map((opt) => (
                          <label key={opt} className="checkbox-item">
                            <input
                              type="checkbox"
                              value={opt}
                              checked={formData.language.includes(opt)}
                              onChange={(e) => {
                                let updated = [...formData.language];
                                if (e.target.checked) updated.push(opt);
                                else
                                  updated = updated.filter(
                                    (lang) => lang !== opt
                                  );
                                setFormData((prev) => ({
                                  ...prev,
                                  language: updated,
                                }));
                                setErrors((prev) => ({
                                  ...prev,
                                  language: "",
                                }));
                              }}
                            />
                            <span>{opt}</span>
                          </label>
                        ))}
                      </div>
                      {errors.language && (
                        <p className="error-text">{errors.language}</p>
                      )}
                    </div>

                    {/* Occupation */}
                    <div className="form-group">
                      <label className="input-label">Occupation</label>
                      <select
                        name="occupation"
                        value={formData.occupation}
                        onChange={(e) => {
                          handleInputChange(e);
                          if (e.target.value !== "Others")
                            setOtherOccupation("");
                        }}
                        className={errors.occupation ? "input-error" : ""}
                      >
                        <option value="">Select Occupation</option>
                        {occupationOptions.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                      {errors.occupation && (
                        <p className="error-text">{errors.occupation}</p>
                      )}

                      {formData.occupation === "Others" && (
                        <div style={{ marginTop: "8px" }}>
                          <label className="input-label">
                            Please specify your occupation
                          </label>
                          <input
                            type="text"
                            name="otherOccupation"
                            placeholder="e.g., Book Publicist"
                            value={otherOccupation}
                            onChange={(e) => setOtherOccupation(e.target.value)}
                            className={
                              errors.otherOccupation ? "input-error" : ""
                            }
                          />
                          {errors.otherOccupation && (
                            <p className="error-text">
                              {errors.otherOccupation}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Other fields */}
                    {[
                      { name: "link", label: "Portfolio Link" },
                      { name: "work", label: "Best Work Link" },
                      { name: "email", label: "Email *Private" },
                      { name: "phone", label: "Phone Number *Active" },
                    ].map((field, i) => (
                      <div className="form-group" key={i}>
                        <label className="input-label">{field.label}</label>
                        <input
                          type={field.name === "email" ? "email" : "text"}
                          name={field.name}
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

// --- validators ---
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}
function isValidPhone(phone) {
  return /^[0-9]{10,15}$/.test(phone);
}
function isValidURL(url) {
  return /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);
}
