import React, { useState } from 'react';
import API from '../api';
import { toast } from 'react-toastify';

const Register = () => {
  const [formData, setFormData] = useState({ name: '', email: '', password: '',age:"" });

  const handleSubmit = async (data) => {
    data.preventDefault();
    try {
      await API.post('/signup', formData);
      toast.success('Registration successful!');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Error during registration');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
    <div>
      <label>Name :</label>
      <input
        type="text"
        placeholder="Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      </div>
      <div>
       <label>Email :</label>
      <input
        type="email"
        placeholder="Email"
        value={formData.email}
        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
        required
      />
      </div>
      <div>
      <label>Password :</label>
      <input
        type="password"
        placeholder="Password"
        value={formData.password}
        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
        required
      /></div>
      
      <div>
          <label>Age :</label>
       <input
        type="Age"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />
      </div>
      
      <div>
      <button type="submit">Register</button>
      </div>
    </form>
  );
};

export default Register;
