import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <div className='navbar'>
      <NavLink exact to="/"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        LOGIN
      </NavLink>
      <NavLink exact to="/contacts"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        Contacts Page
      </NavLink>
      <NavLink to="/about"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        About us
      </NavLink>
      <NavLink to="/parks"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        Parks
      </NavLink>
      <NavLink to="/hotels"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        Hotels
      </NavLink>
      <NavLink to="/addhotels"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        Add Hotel
      </NavLink>
      <NavLink to="/addparks"
      style={{color:"blue",padding:"10px",}}
      activeStyle={{color:"brown"}}>
        Add Park
      </NavLink>
    </div>
    </div>
  )
}
export default Navbar