import React, { useState } from 'react';
import axios from 'axios';
import './Login.module.css';

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({ username: '', password: '', role: 'USER' });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    const url = `http://localhost:3001/${isLogin ? 'login' : 'register'}`;
    try {
      const res = await axios.post(url, form);

      if (isLogin) {
        const token = res.data.token;
        localStorage.setItem('token', token);

        const payload = JSON.parse(atob(token.split('.')[1]));
        console.log("Token:", token);
        console.log("User ID:", payload.id);
        console.log("Role:", payload.role);

        alert('Login successful!');
      } else {
        alert(res.data.message || 'Registration successful!');
        setIsLogin(true);
      }
    } catch (err) {
      alert(err.response?.data?.message || 'Something went wrong');
    }
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h2>{isLogin ? 'Login' : 'Register'}</h2>

      <input
        name="username"
        placeholder="Username"
        onChange={handleChange}
        style={{ display: 'block', margin: '10px 0' }}
      />
      <input
        name="password"
        type="password"
        placeholder="Password"
        onChange={handleChange}
        style={{ display: 'block', margin: '10px 0' }}
      />
      {!isLogin && (
        <select name="role" onChange={handleChange} style={{ margin: '10px 0' }}>
          <option value="USER">User</option>
          <option value="ADMIN">Admin</option>
          <option value="VISITOR">Visitor</option>
        </select>
      )}

      <button onClick={handleSubmit} style={{ marginBottom: '1rem' }}>
        {isLogin ? 'Login' : 'Register'}
      </button>

      <br />
      <button onClick={() => setIsLogin(!isLogin)}>
        Switch to {isLogin ? 'Register' : 'Login'}
      </button>
    </div>
  );
}

export default Login;
