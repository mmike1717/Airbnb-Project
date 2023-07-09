import React, { useState } from "react";
import * as sessionActions from "../../store/session";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import "./LoginForm.css";

function LoginFormModal() {
  const dispatch = useDispatch();
  const [credential, setCredential] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const { closeModal } = useModal();

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential, password }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  const submitDemoUser = (e) => {
    e.preventDefault();
    setErrors({});
    return dispatch(sessionActions.login({ credential: "Demo-lition", password: "password" }))
      .then(closeModal)
      .catch(async (res) => {
        const data = await res.json();
        if (data && data.errors) {
          setErrors(data.errors);
        }
      });
  };

  let disableLogIn = true;
  credential.length > 3 && password.length > 5 ? disableLogIn = false : disableLogIn = true



  return (
    <>
      <h1 id='logInHeader'>Log In</h1>
      <div className='LogInErrors'>
      {errors.credential && (
        <p>{errors.credential}</p>
      )}
      </div>
      <form className="logInForm" onSubmit={handleSubmit}>
        <label>
          {/* Username or Email */}
          <input
            className='inputBox'
            type="text"
            placeholder='Username or Email'
            value={credential}
            onChange={(e) => setCredential(e.target.value)}
            required
          />
        </label>
        <label >
          {/* Password */}
          <input
            className='inputBox'
            type="password"
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>
        <button className='LogInButton' disabled={disableLogIn} type="submit">Log In</button>
        <button className='DemoUserButton' onClick={submitDemoUser} type="submit">Demo User</button>
      </form>
    </>
  );
}

export default LoginFormModal;
