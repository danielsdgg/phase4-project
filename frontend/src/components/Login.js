import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory()
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
      .then((response) => {
        if (response.ok){
          alert("Logged in successfully")
          return response.json()
        }

      })
      .then((data) => {
        console.log(data);
      }) 
      
      .catch((error) => {
        console.error('Error:', error);
        console.log('Response:', error.response);
      });

      history.push('/hotels')
      
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
    })
      .then((response) => {
        if (response.ok){
          alert("User has been logged out")
          return response.json()
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.error('Error:', error);
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
        <button className="btn5" type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      <button className="btn6" type="button" onClick={logOut}>Log Out</button>
    </div>
  );
};

export default Login;
