import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleAdminLogin = () => {
    return fetch('/login_admin', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid admin credentials');
        }
      })
      .catch((error) => {
        console.error('Admin login failed:', error);
        throw error; // Rethrow the error to proceed to user login
      });
  };

  const handleUserLogin = () => {
    return fetch('/login_user', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ username, password }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Invalid username or password');
        }
      })
      .catch((error) => {
        console.error('User login failed:', error);
        throw error; // Rethrow the error to handle the case of no user found
      });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleAdminLogin()
      .then((data) => {
        console.log(data);
        history.push('/admin_dashboard');
      })
      .catch((error) => {
        console.error('Admin login failed. Trying user login...');
        handleUserLogin()
          .then((data) => {
            console.log(data);
            history.push('/hotels');
          })
          .catch((error) => {
            console.error('User login failed:', error);
            // Handle login failure, e.g., display an error message
          });
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
    })
      .then((response) => {
        if (response.ok) {
          alert('You have been logged out');
          return response.json();
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

