import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';


let isFilled = false;

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: ""
  });

  const history = useHistory();

  function handleSubmit(event) {
    isFilled = true
    event.preventDefault();

    fetch(`/login`, {
      method: "POST",
      headers: {
        "Content-type": "application/json"
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(data => {
      setFormData({
        username: "",
        password: ""
      });

      if (isFilled === true) {
        history.push('/about');
      }
    });
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setFormData(formData => ({ ...formData, [name]: value }));
  }

  return (
    <>
      <h2 style={{textAlign:"center", color:"whitesmoke"}} id='login-title'>LOG IN</h2>
      <form id='login-form' onSubmit={handleSubmit}>
        {/* name input  */}
        <div className="form-outline">
          <input type="text" style={{height:"20px", padding:"5px"}} id="input1" className="form-control" name="username" placeholder='Username' value={formData.username} onChange={handleChange}/> <br></br><br></br>
          
        
        {/* Password input  */}
        
          <input type="password" style={{height:"20px", padding:"5px"}} id="input2" className="form-control" name="password" placeholder='Password' value={formData.password} onChange={handleChange}/><br></br><br></br>
        
        {/* Submit button */}
        <button type="submit" className="btn3">Log in</button>
        </div>
      </form>
    </>
  );
}
export default Login;