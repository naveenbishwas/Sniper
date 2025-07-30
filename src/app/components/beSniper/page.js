// // "use client";

// // import React, { useState, useEffect } from "react";
// // import "./beSniper.css";
// // import { collection, addDoc, doc, getDoc, setDoc } from "firebase/firestore";
// // import { db } from "@/lib/firebase";
// // import { useRouter } from "next/navigation";

// // export default function BeSniperModal({ onClose }) {
// //   const [step, setStep] = useState(1);
// //   const [freelancerType, setFreelancerType] = useState("");
// //   const [experience, setExperience] = useState("");
// //   const [howDoneBefore, setHowDoneBefore] = useState("");
// //   const [errors, setErrors] = useState({});
// //   const [successMsg, setSuccessMsg] = useState("");

// //   const [formData, setFormData] = useState({
// //     name: "",
// //     bio: "",
// //     language: "",
// //     occupation: "",
// //     skills: "",
// //     link: "",
// //     work: "",
// //     email: "",
// //     phone: "",
// //   });

// //   const router = useRouter();

// //   useEffect(() => {
// //     document.body.style.overflow = "hidden";
// //     return () => {
// //       document.body.style.overflow = "auto";
// //     };
// //   }, []);

// //   const handleInputChange = (e) => {
// //     setFormData({ ...formData, [e.target.name]: e.target.value });
// //     setErrors({ ...errors, [e.target.name]: "" });
// //   };

// //   const generateUniqueId = async (name) => {
// //     const cleanedName = name.toLowerCase().replace(/\s/g, "");
// //     const randomNum = Math.floor(100 + Math.random() * 900);
// //     const uniqueId = `${cleanedName}${randomNum}`;

// //     const docRef = doc(db, "uniqueUserIds", uniqueId);
// //     const docSnap = await getDoc(docRef);

// //     if (docSnap.exists()) {
// //       return generateUniqueId(name);
// //     }

// //     await setDoc(docRef, {
// //       uniqueId,
// //       createdAt: new Date().toISOString(),
// //       email: formData.email,
// //       name: formData.name,
// //     });

// //     return uniqueId;
// //   };

// //   const handleMainSubmit = () => {
// //     if (!freelancerType) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         freelancerType: "Please select your freelancer type.",
// //       }));
// //       return;
// //     }

// //     setErrors((prev) => {
// //       const { freelancerType, ...rest } = prev;
// //       return rest;
// //     });

// //     setStep(2);
// //   };

// //   const handlePeopleStep = () => {
// //     if (!experience.trim() || isNaN(experience) || Number(experience) < 0) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         experience: "Experience must be a valid number.",
// //       }));
// //       return;
// //     }

// //     setErrors((prev) => ({ ...prev, experience: "" }));
// //     setStep(3);
// //   };

// //   const handleDoneBeforeStep = () => {
// //     if (!howDoneBefore) {
// //       setErrors((prev) => ({
// //         ...prev,
// //         howDoneBefore: "Please select one option.",
// //       }));
// //       return;
// //     }

// //     setErrors((prev) => {
// //       const { howDoneBefore, ...rest } = prev;
// //       return rest;
// //     });

// //     setStep(4);
// //   };

// //   const handleDetailsSubmit = async () => {
// //     const newErrors = {};
// //     const {
// //       name,
// //       bio,
// //       language,
// //       occupation,
// //       skills,
// //       link,
// //       work,
// //       email,
// //       phone,
// //     } = formData;

// //     if (!name.trim() || name.length < 3)
// //       newErrors.name = "Full Name must be at least 3 letters.";
// //     else if (!/^[A-Za-z\s]+$/.test(name))
// //       newErrors.name = "Full Name can only contain letters and spaces.";

// //     if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
// //       newErrors.bio = "Bio must be 150+ characters and without contact info.";

// //     if (!language.trim()) newErrors.language = "Languages Known is required.";
// //     if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
// //     if (!skills.trim()) newErrors.skills = "Skills are required.";

// //     if (!link.trim() || !isValidURL(link))
// //       newErrors.link = "Enter valid Portfolio Link.";
// //     if (!work.trim() || !isValidURL(work))
// //       newErrors.work = "Enter valid Work Link.";

// //     if (!email.trim() || !isValidEmail(email))
// //       newErrors.email = "Enter valid Email.";
// //     if (!isValidPhone(phone)) newErrors.phone = "Phone must be 10 digits.";

// //     if (Object.keys(newErrors).length > 0) {
// //       setErrors(newErrors);
// //       return;
// //     }

// //     try {
// //       const uniqueId = await generateUniqueId(formData.name);

// //       await addDoc(collection(db, "be-sniper-forms"), {
// //         freelancerType,
// //         experience,
// //         howDoneBefore,
// //         ...formData,
// //         uniqueId,
// //         createdAt: new Date().toISOString(),
// //       });

// //       localStorage.setItem("uniqueId", uniqueId);
// //       localStorage.setItem("userRole", "beSniper");

// //       router.push("/components/successfull");
// //     } catch (error) {
// //       alert("❌ Submission failed. Try again.");
// //       console.error("Firebase error:", error);
// //     }
// //   };

// //   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
// //   const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
// //   const isValidURL = (url) =>
// //     /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

// //   return (
// //     <>
// //       <div className="modal-overlay" onClick={onClose}>
// //         <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
// //           <div className="sniper-page">
// //             <button className="close-modal" onClick={onClose}>
// //               &times;
// //             </button>

// //             {/* Step 1 */}
// //             {step === 1 && (
// //               <div className="kind-of-freelancer">
// //                 <h3 className="question">What kind of freelancer are you?</h3>
// //                 <div className="option-buttons">
// //                   {[
// //                     { value: "agency-employer", label: "Agency / Employer" },
// //                     { value: "side-hustle", label: "Side Hustle" },
// //                     { value: "solo-freelancer", label: "Solo Freelancer" },
// //                   ].map((option) => (
// //                     <label
// //                       key={option.value}
// //                       className={`option ${
// //                         freelancerType === option.value ? "selected" : ""
// //                       } ${errors.freelancerType ? "input-error" : ""}`}
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="freelancerType"
// //                         value={option.value}
// //                         onChange={() => {
// //                           setFreelancerType(option.value);
// //                           setErrors((prev) => ({
// //                             ...prev,
// //                             freelancerType: "",
// //                           }));
// //                         }}
// //                       />
// //                       <span>{option.label}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //                 {errors.freelancerType && (
// //                   <p className="error-text">{errors.freelancerType}</p>
// //                 )}
// //                 <div className="next-btn">
// //                   <button className="next" onClick={handleMainSubmit}>
// //                     Next
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 2 */}
// //             {step === 2 && (
// //               <div className="work-experience">
// //                 <h3 className="question">What is your work experience?</h3>
// //                 <div className="form-fields">
// //                   <input
// //                     type="number"
// //                     name="experience"
// //                     placeholder="e.g., 3"
// //                     value={experience}
// //                     onChange={(e) => {
// //                       setExperience(e.target.value);
// //                       setErrors((prev) => ({ ...prev, experience: "" }));
// //                     }}
// //                     className={errors.experience ? "input-error" : ""}
// //                   />
// //                   {errors.experience && (
// //                     <p className="error-text">{errors.experience}</p>
// //                   )}
// //                 </div>
// //                 <div className="next-prev-btn">
// //                   <button className="next" onClick={() => setStep(1)}>
// //                     Prev
// //                   </button>
// //                   <button className="next" onClick={handlePeopleStep}>
// //                     Next
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 3 */}
// //             {step === 3 && (
// //               <div className="done">
// //                 <h3 className="question">
// //                   Have you done freelance work before?
// //                 </h3>
// //                 <div className="option-buttons">
// //                   {[
// //                     "Getting Started",
// //                     "Done Offline Before",
// //                     "Done Online Before",
// //                     "Both Online & Offline",
// //                   ].map((label) => (
// //                     <label
// //                       key={label}
// //                       className={`option ${
// //                         howDoneBefore === label ? "selected" : ""
// //                       }`}
// //                     >
// //                       <input
// //                         type="radio"
// //                         name="howDoneBefore"
// //                         value={label}
// //                         onChange={() => {
// //                           setHowDoneBefore(label);
// //                           setErrors((prev) => ({
// //                             ...prev,
// //                             howDoneBefore: "",
// //                           }));
// //                         }}
// //                       />
// //                       <span>{label}</span>
// //                     </label>
// //                   ))}
// //                 </div>
// //                 {errors.howDoneBefore && (
// //                   <p className="error-text">{errors.howDoneBefore}</p>
// //                 )}
// //                 <div className="next-prev-btn">
// //                   <button className="next" onClick={() => setStep(2)}>
// //                     Prev
// //                   </button>
// //                   <button className="next" onClick={handleDoneBeforeStep}>
// //                     Next
// //                   </button>
// //                 </div>
// //               </div>
// //             )}

// //             {/* Step 4 */}
// //             {step === 4 && (
// //               <div className="user-details-form">
// //                 <div className="user-details-form-scroll">
// //                   <h3 className="question">Please fill in your details</h3>
// //                   {successMsg && <p className="success-text">{successMsg}</p>}
// //                   <div className="form-fields">
// //                     {[
// //                       { name: "name", label: "Full Name *Private" },
// //                       {
// //                         name: "bio",
// //                         label: "Bio *No contact info (Chars Limit:- Min 150)",
// //                       },
// //                       { name: "language", label: "Languages Known" },
// //                       { name: "occupation", label: "Occupation" },
// //                       { name: "skills", label: "Skills" },
// //                       { name: "link", label: "Portfolio Link" },
// //                       {
// //                         name: "work",
// //                         label: "Best Work Link *No contact info",
// //                       },
// //                       { name: "email", label: "Email *Private" },
// //                       { name: "phone", label: "Phone Number *Active" },
// //                     ].map((field, idx) => (
// //                       <div className="form-group" key={idx}>
// //                         <label className="input-label">{field.label}</label>
// //                         <input
// //                           type={field.name === "email" ? "email" : "text"}
// //                           name={field.name}
// //                           placeholder={field.label}
// //                           value={formData[field.name]}
// //                           onChange={handleInputChange}
// //                           className={errors[field.name] ? "input-error" : ""}
// //                         />
// //                         {errors[field.name] && (
// //                           <p className="error-text">{errors[field.name]}</p>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                   <div className="next-prev-btn">
// //                     <button className="next" onClick={() => setStep(3)}>
// //                       Prev
// //                     </button>
// //                     <button className="next" onClick={handleDetailsSubmit}>
// //                       Submit
// //                     </button>
// //                   </div>
// //                 </div>
// //               </div>
// //             )}
// //           </div>
// //         </div>
// //       </div>
// //     </>
// //   );
// // }

// "use client";

// import React, { useState, useEffect } from "react";
// import "./beSniper.css";
// import { collection, addDoc, doc, setDoc } from "firebase/firestore";
// import { db } from "@/lib/firebase";
// import { generateUniqueId } from "@/lib/generateUniqueId"; // ✅ NEW IMPORT
// import { useRouter } from "next/navigation";

// export default function BeSniperModal({ onClose }) {
//   const [step, setStep] = useState(1);
//   const [freelancerType, setFreelancerType] = useState("");
//   const [experience, setExperience] = useState("");
//   const [howDoneBefore, setHowDoneBefore] = useState("");
//   const [errors, setErrors] = useState({});
//   const [successMsg, setSuccessMsg] = useState("");

//   const [formData, setFormData] = useState({
//     name: "",
//     bio: "",
//     language: "",
//     occupation: "",
//     skills: "",
//     link: "",
//     work: "",
//     email: "",
//     phone: "",
//   });

//   const router = useRouter();

//   // useEffect(() => {
//   //   document.body.style.overflow = "hidden";
//   //   return () => {
//   //     document.body.style.overflow = "auto";
//   //   };
//   // }, []);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     const storedRole = localStorage.getItem("userRole");
//     const storedId = localStorage.getItem("uniqueId");

//     if (storedRole === "beSniper" && storedId) {
//       setStep(1); // ✅ Automatically start from Step 1 for Google login
//     }

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   const handleInputChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors({ ...errors, [e.target.name]: "" });
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
//       const { freelancerType, ...rest } = prev;
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
//       const { howDoneBefore, ...rest } = prev;
//       return rest;
//     });

//     setStep(4);
//   };

//   const handleDetailsSubmit = async () => {
//     const newErrors = {};
//     const {
//       name,
//       bio,
//       language,
//       occupation,
//       skills,
//       link,
//       work,
//       email,
//       phone,
//     } = formData;

//     if (!name.trim() || name.length < 3)
//       newErrors.name = "Full Name must be at least 3 letters.";
//     else if (!/^[A-Za-z\s]+$/.test(name))
//       newErrors.name = "Full Name can only contain letters and spaces.";

//     if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
//       newErrors.bio = "Bio must be 150+ characters and without contact info.";

//     if (!language.trim()) newErrors.language = "Languages Known is required.";
//     if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
//     if (!skills.trim()) newErrors.skills = "Skills are required.";

//     if (!link.trim() || !isValidURL(link))
//       newErrors.link = "Enter valid Portfolio Link.";
//     if (!work.trim() || !isValidURL(work))
//       newErrors.work = "Enter valid Work Link.";

//     if (!email.trim() || !isValidEmail(email))
//       newErrors.email = "Enter valid Email.";
//     if (!isValidPhone(phone)) newErrors.phone = "Phone must be 10 digits.";

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     try {
//       const role = "beSniper";
//       const uniqueId = await generateUniqueId(name, email, role);

//       // ✅ Save in users collection
//       await setDoc(doc(db, "users", email), {
//         email,
//         name,
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       });

//       // ✅ Save full form data in be-sniper-forms
//       await addDoc(collection(db, "be-sniper-forms"), {
//         ...formData,
//         freelancerType,
//         experience,
//         howDoneBefore,
//         role,
//         uniqueId,
//         createdAt: new Date().toISOString(),
//       });

//       localStorage.setItem("uniqueId", uniqueId);
//       localStorage.setItem("userRole", role);

//       router.push("/components/successfull");
//     } catch (error) {
//       alert("❌ Submission failed. Try again.");
//       console.error("Firebase error:", error);
//     }
//   };

//   const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
//   const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
//   const isValidURL = (url) =>
//     /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

//   return (
//     <>
//       <div className="modal-overlay" onClick={onClose}>
//         <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
//           <div className="sniper-page">
//             <button className="close-modal" onClick={onClose}>
//               &times;
//             </button>

//             {/* Step 1 */}
//             {step === 1 && (
//               <div className="kind-of-freelancer">
//                 <h3 className="question">What kind of freelancer are you?</h3>
//                 <div className="option-buttons">
//                   {[
//                     { value: "agency-employer", label: "Agency / Employer" },
//                     { value: "side-hustle", label: "Side Hustle" },
//                     { value: "solo-freelancer", label: "Solo Freelancer" },
//                   ].map((option) => (
//                     <label
//                       key={option.value}
//                       className={`option ${
//                         freelancerType === option.value ? "selected" : ""
//                       } ${errors.freelancerType ? "input-error" : ""}`}
//                     >
//                       <input
//                         type="radio"
//                         name="freelancerType"
//                         value={option.value}
//                         onChange={() => {
//                           setFreelancerType(option.value);
//                           setErrors((prev) => ({
//                             ...prev,
//                             freelancerType: "",
//                           }));
//                         }}
//                       />
//                       <span>{option.label}</span>
//                     </label>
//                   ))}
//                 </div>
//                 {errors.freelancerType && (
//                   <p className="error-text">{errors.freelancerType}</p>
//                 )}
//                 <div className="next-btn">
//                   <button className="next" onClick={handleMainSubmit}>
//                     Next
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* Step 2 */}
//             {step === 2 && (
//               <div className="work-experience">
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
//                 <div className="option-buttons">
//                   {[
//                     "Getting Started",
//                     "Done Offline Before",
//                     "Done Online Before",
//                     "Both Online & Offline",
//                   ].map((label) => (
//                     <label
//                       key={label}
//                       className={`option ${
//                         howDoneBefore === label ? "selected" : ""
//                       }`}
//                     >
//                       <input
//                         type="radio"
//                         name="howDoneBefore"
//                         value={label}
//                         onChange={() => {
//                           setHowDoneBefore(label);
//                           setErrors((prev) => ({
//                             ...prev,
//                             howDoneBefore: "",
//                           }));
//                         }}
//                       />
//                       <span>{label}</span>
//                     </label>
//                   ))}
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
//                       { name: "language", label: "Languages Known" },
//                       { name: "occupation", label: "Occupation" },
//                       { name: "skills", label: "Skills" },
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
//                         <input
//                           type={field.name === "email" ? "email" : "text"}
//                           name={field.name}
//                           placeholder={field.label}
//                           value={formData[field.name]}
//                           onChange={handleInputChange}
//                           className={errors[field.name] ? "input-error" : ""}
//                         />
//                         {errors[field.name] && (
//                           <p className="error-text">{errors[field.name]}</p>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                   <div className="next-prev-btn">
//                     <button className="next" onClick={() => setStep(3)}>
//                       Prev
//                     </button>
//                     <button className="next" onClick={handleDetailsSubmit}>
//                       Submit
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

  const handleDetailsSubmit = async () => {
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

    if (!name.trim() || name.length < 3)
      newErrors.name = "Full Name must be at least 3 letters.";
    else if (!/^[A-Za-z\s]+$/.test(name))
      newErrors.name = "Full Name can only contain letters and spaces.";

    if (!bio.trim() || bio.length < 150 || /[\d]{10}|@|\+91/.test(bio))
      newErrors.bio = "Bio must be 150+ characters and without contact info.";

    if (!language.trim()) newErrors.language = "Languages Known is required.";
    if (!occupation.trim()) newErrors.occupation = "Occupation is required.";
    if (!categories.trim()) newErrors.categories = "Category is required.";

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
      const role = "beSniper";
      const uniqueId = await generateUniqueId(name, email, role);

      await setDoc(doc(db, "users", email), {
        email,
        name,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      });

      await addDoc(collection(db, "be-sniper-forms"), {
        ...formData,
        freelancerType,
        experience,
        howDoneBefore,
        role,
        uniqueId,
        createdAt: new Date().toISOString(),
      });

      localStorage.setItem("uniqueId", uniqueId);
      localStorage.setItem("userRole", role);

      router.push("/components/successfull");
    } catch (error) {
      alert("❌ Submission failed. Try again.");
      console.error("Firebase error:", error);
    }
  };

  const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const isValidPhone = (phone) => /^[0-9]{10,15}$/.test(phone);
  const isValidURL = (url) =>
    /^(https?:\/\/)?([\w\d\-]+\.){1,}([a-zA-Z]{2,})(\/.*)?$/.test(url);

  const categoryOptions = [
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
  ];

  return (
    <>
      <div className="modal-overlay" onClick={onClose}>
        <div className="modal-wrapper" onClick={(e) => e.stopPropagation()}>
          <div className="sniper-page">
            <button className="close-modal" onClick={onClose}>
              &times;
            </button>

            {/* Step 1 */}
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
            {step === 3 && (
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
                      { name: "language", label: "Languages Known" },
                      { name: "occupation", label: "Occupation" },
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

                    {/* CATEGORIES DROPDOWN */}
                    <div className="form-group">
                      <label className="input-label">Category</label>
                      <select
                        name="categories"
                        value={formData.categories}
                        onChange={handleInputChange}
                        className={errors.categories ? "input-error" : ""}
                      >
                        <option value="">Select Category</option>
                        {categoryOptions.map((cat, idx) => (
                          <option key={idx} value={cat}>
                            {cat}
                          </option>
                        ))}
                      </select>
                      {errors.categories && (
                        <p className="error-text">{errors.categories}</p>
                      )}
                    </div>
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
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
