"use client";
import React, { useState } from "react";
import "./HireFreelancer.css";

const HireFreelancer = () => {
  const [firstField, setFirstField] = useState("");

  const handleMainSubmit = () => {};
  return (
    <div className="hiring-page">
      <>
        <h3 className="question">What do you plan to hire service for?</h3>
        <div className="option-buttons">
          <label
            className={`option ${firstField === "personal" ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="firstField"
              value="personal"
              onChange={() => setFirstField("personal")}
            />
            <span>Personal</span>
          </label>

          <label className={`option ${firstField === "job" ? "selected" : ""}`}>
            <input
              type="radio"
              name="firstField"
              value="job"
              onChange={() => setFirstField("job")}
            />
            <span>Job</span>
          </label>

          <label
            className={`option ${firstField === "business" ? "selected" : ""}`}
          >
            <input
              type="radio"
              name="firstField"
              value="business"
              onChange={() => setFirstField("business")}
            />
            <span>Business</span>
          </label>
        </div>

        <div className="next-btn">
          <button className="next" onClick={handleMainSubmit}>
            Next
          </button>
        </div>
      </>
    </div>
  );
};

export default HireFreelancer;
