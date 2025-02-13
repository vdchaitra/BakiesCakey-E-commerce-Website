import React, { useContext, useState } from 'react';
import './ForgetPassword.css';
import { assets } from '../../assets/assets';
import { StoreContext } from '../../context/StoreContext';
import axios from 'axios';

const ForgetPassword = ({ setShowForgetPassword }) => {
  const { url } = useContext(StoreContext);

  const [data, setData] = useState({
    email: ""
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setData(data => ({ ...data, [name]: value }));
  }

  const onSubmit = async (event) => {
    event.preventDefault();
    const newUrl = `${url}/forgetpassword`;

    try {
      const response = await axios.post(newUrl, data);
      if (response.data.Status === "success") {
        alert("Password reset link sent to your email.");
        setShowForgetPassword(false);
      } else {
        alert(response.data.Status);
      }
    } catch (error) {
      alert("An error occurred. Please try again.");
    }
  }

  return (
    <div className='forget_password_popup'>
      <form onSubmit={onSubmit} className="forget_password_popup_container">
        <div className="forget_password_popup_title">
          <h2>Forget Password</h2>
          <img onClick={() => setShowForgetPassword(false)} src={assets.cross_icon} alt="close" />
        </div>
        <div className="forget_password_popup_inputs">
          <input
            name='email'
            onChange={onChangeHandler}
            value={data.email}
            type="email"
            placeholder='Your email'
            required
          />
        </div>
        <button type='submit'>Send Reset Link</button>
      </form>
    </div>
  )
}

export default ForgetPassword;
