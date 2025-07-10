"use client";

import React, { useState } from "react";
import "./beSniper.css";

const BeSniper = () => {
  const [firstField, setFirstField] = useState("");

  const handleMainSubmit = () => {};
  return (
    <div className="sniper-page">
      <>
        <h3 className="question">What kind of freelancer are you?</h3>
        <div className="option-buttons">
          <label
            className={`option ${
              firstField === "agency-employer" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="firstField"
              value="agency-employer"
              onChange={() => setFirstField("agency-employer")}
            />
            <span>Agency / Employer</span>
          </label>

          <label
            className={`option ${
              firstField === "side-hustle" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="firstField"
              value="side-hustle"
              onChange={() => setFirstField("side-hustle")}
            />
            <span>Side Hustle</span>
          </label>

          <label
            className={`option ${
              firstField === "solo-freelancer" ? "selected" : ""
            }`}
          >
            <input
              type="radio"
              name="firstField"
              value="solo-freelancer"
              onChange={() => setFirstField("solo-freelancer")}
            />
            <span>Solo Freelancer</span>
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

export default BeSniper;
