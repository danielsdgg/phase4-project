import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

 
 
  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('/register', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password, phone_number: phoneNumber }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
        console.log('Response:', error.response);
      });
  };

return (
    <div id="form">
      <h2 id="login-title">Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-outline">
          <input
            type="text"
            className="form-control"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <label className="form-label">Username</label>
        </div>
        <div className="form-outline">
          <input
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="form-label">Password</label>
        </div>
        <div className="form-outline">
          <input
            type="text"
            className="form-control"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />
          <label className="form-label">Phone Number</label>
        </div>
        <button className="btn" type="submit">Sign Up</button>
        
      </form>
    </div>
  );
};

export default Login;
