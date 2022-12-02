import React, { useState, useEffect } from "react";

import "./Signup.scss";
const Signup = () => {
  const intialValues = { email: "", password: "", username:"", confirm_password:"" };

  const [formValues, setFormValues] = useState(intialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const submit = () => {
    console.log(formValues);
  };

  //input change handler
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  //form submission handler 
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmitting(true);
  };

  //form validation handler
  const validate = (values) => {
    let errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!values.email) {
      errors.email = "email Cannot be blank";
    } else if (!regex.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.username) {
      errors.username = " username Cannot be blank";
    }
    if (!values.password) {
        errors.password = " password Cannot be blank";
      } else if (values.password.length < 6) {
        errors.password = "Password must be more than 6 characters";
      }
      if (!values.confirm_password) {
        errors.confirm_password = " confirm password Cannot be blank";
      } else if (values.confirm_password == values.password) {
        errors.confirm_password = "confirm Password must be matched with password";
      }

    return errors;
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmitting) {
      submit();
    }
  }, [formErrors]);

  return (
    <div className="container">
      <h1>Sign in to continue</h1>
      {Object.keys(formErrors).length === 0 && isSubmitting && (
        <span className="success-msg">Form submitted successfully</span>
      )}
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-row">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            id="email"
            value={formValues.email}
            onChange={handleChange}
            className={formErrors.email && "input-error"}
          />
          {formErrors.email && (
            <span className="error">{formErrors.email}</span>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            id="username"
            value={formValues.username}
            onChange={handleChange}
            className={formErrors.username && "input-error"}
          />
          {formErrors.username && (
            <span className="error">{formErrors.username}</span>
          )}
        </div>
        <div className="form-row">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            id="password"
            value={formValues.password}
            onChange={handleChange}
            className={formErrors.password && "input-error"}
          />
          {formErrors.password && (
            <span className="error">{formErrors.password}</span>
          )}
        </div>
        
        <div className="form-row">
          <label htmlFor="confirm_password">Confirm-Password</label>
          <input
            type="password"
            name="confirm_password"
            id="confirm_password"
            value={formValues.confirm_password}
            onChange={handleChange}
            className={formErrors.confirm_password && "input-error"}
          />
          {formErrors.confirm_password && (
            <span className="error">{formErrors.confirm_password}</span>
          )}
        </div>

        <button type="submit">Sign In</button>
      </form>
    </div>
  );
};

export default Signup;
