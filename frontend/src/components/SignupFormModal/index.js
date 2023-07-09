import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import * as sessionActions from "../../store/session";
import "./SignupForm.css";

function SignupFormModal() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password === confirmPassword) {
      setErrors({});
      return dispatch(
        sessionActions.signup({
          email,
          username,
          firstName,
          lastName,
          password,
        })
      )
        .then(closeModal)
        .catch(async (res) => {
          const data = await res.json();
          if (data && data.errors) {
            setErrors(data.errors);
          }
        });
    }
    return setErrors({
      confirmPassword: "Confirm Password field must be the same as the Password field"
    });
  };

  let signUpDisable = true;
  !email.length || !firstName.length || !lastName.length || !confirmPassword.length ? signUpDisable = true : signUpDisable = false
  !username.length || username.length < 4 ? signUpDisable = true : signUpDisable = false
  !password.length || password.length < 6 ? signUpDisable = true : signUpDisable = false

  return (
    <>
      <h1 id='H1ForSignUp'>Sign Up</h1>
      {errors.email && <div className="SignUpErrors">{errors.email}</div>}
      {errors.username && <div className="SignUpErrors">{errors.username}</div>}
      {errors.firstName && <div className="SignUpErrors">{errors.firstName}</div>}
      {errors.lastName && <div className="SignUpErrors">{errors.lastName}</div>}
      {errors.password && <div className="SignUpErrors">{errors.password}</div>}
      {errors.confirmPassword && (
        <div className="SignUpErrors">{errors.confirmPassword}</div>
      )}
      <form className="SignUpFormPopup" onSubmit={handleSubmit}>
        <input
          className="SignUpInputs"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <input
          className="SignUpInputs"
          placeholder="Username"
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <input
          className="SignUpInputs"
          placeholder="First Name"
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
        />

        <input
          className="SignUpInputs"
          placeholder="Last Name"
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
        />

        <input
          className="SignUpInputs"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <input
          className="SignUpInputs"
          placeholder="Confirm Password"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />

        <button disabled={signUpDisable} type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormModal;
