import React, { useState } from 'react';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username);
    console.log(password);
    fetch('/login', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
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

  const logOut = (e) => {
    e.preventDefault();
    fetch('/logout', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(),
    });
  };

  return (
    <div id="form">
      <h2 id="login-title">Login</h2>
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
        <button className="btn" type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      <button className="btn" type="button" onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Login;
