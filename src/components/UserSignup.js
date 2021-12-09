import { useReducer, useState } from "react";

import "./UserSignup.css";

const initialState = {
  userName: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  investmentInterest: false,
};

const reducer = (previousState = {}, updatedState = {}) => {
  return { ...previousState, ...updatedState };
};

const useSetState = (initialState = {}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  const setState = updatedState => dispatch(updatedState);

  return [state, setState];
};

const UserSignup = () => {
  const [state, setState] = useSetState(initialState);

  const handleSubmit = event => {
    event.preventDefault();

    clearForm();
  };

  const clearForm = () => {
    setState(initialState);
  };

  const handleChange = event => {
    setState({
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div id="user-signup">
      <h2>Form Component with State</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="userName">Username</label>
        <input
          id="userName"
          name="userName"
          type="text"
          value={state.userName}
          required
          onChange={handleChange}
        />
        <label htmlFor="email">Email address</label>
        <input
          id="email"
          name="email"
          type="email"
          value={state.email}
          required
          onChange={handleChange}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="password"
          value={state.password}
          required
          onChange={handleChange}
        />
        <label htmlFor="passwordConfirmation">Confirm password</label>
        <input
          id="passwordConfirmation"
          name="passwordConfirmation"
          type="password"
          value={state.passwordConfirmation}
          required
          onChange={handleChange}
        />
        <label htmlFor="investmentInterest">
          <input
            id="investmentInterest"
            name="investmentInterest"
            type="checkbox"
            checked={state.investmentInterest}
            onChange={handleChange}
          />
          Are you interested in making an angel investment?
        </label>
        <input type="Submit" />
      </form>
    </div>
  );
};

export default UserSignup;
