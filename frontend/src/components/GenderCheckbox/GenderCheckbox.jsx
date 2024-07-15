import React from "react";
import "./GenderCheckbox.css";

const GenderCheckbox = ({ setGenderFunction, selectedGender, genderError }) => {
  return (
    <div className="gender-checkboxes">
      <div className="checkboxes">
        <div className="checkbox">
          <input
            type="checkbox"
            checked={selectedGender === "male"}
            onChange={() => setGenderFunction("male")}
          />
          <p>Male</p>
        </div>
        <div className="checkbox">
          <input
            type="checkbox"
            checked={selectedGender === "female"}
            onChange={() => setGenderFunction("female")}
          />
          <p>Female</p>
        </div>
      </div>
      <p className="gender-error">{genderError.length > 0 && genderError}</p>
    </div>
  );
};

export default GenderCheckbox;
