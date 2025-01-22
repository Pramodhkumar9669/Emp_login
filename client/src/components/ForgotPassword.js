import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.post('/forgot-password', { email });
      toast.success('Password reset link sent to your email!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during request');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
 <label>Email :</label>
    <input
      type="email"
      placeholder="Email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
      required
    />
    </div>
    <div>
    <button type="submit">Send Reset Link</button>
    </div>
  </form>
  );
};

export default ForgotPassword;
