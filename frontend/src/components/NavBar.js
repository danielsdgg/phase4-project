import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
        <div className='navbar'>
      <NavLink exact to="/"
      style={{color:"white", backgroundColor:"red", float:"left", textDecoration:"none", padding:"10px",}}
      activeStyle={{color:"white"}}>
        LOGIN
      </NavLink>
      <NavLink to="/hotels"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        HOTELS
      </NavLink>      
      <NavLink to="/parks"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        PARKS
      </NavLink>
      <NavLink to="/rangers"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        RANGERS
      </NavLink>
      <NavLink to="/about"
      style={{color:"white",padding:"10px", backgroundColor:"lightgoldenrodyellow", float:"right",textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        ABOUT US
      </NavLink>
      <NavLink to="/addhotels"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        ADD HOTELS
      </NavLink>
      <NavLink to="/addparks"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        ADD PARKS
      </NavLink>
      <NavLink to="/addrangers"
      style={{color:"white",padding:"10px", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        ADD RANGERS
      </NavLink>
      <NavLink exact to="/contacts"
      style={{color:"white",padding:"10px", float:"right", textDecoration:"none",}}
      activeStyle={{color:"white"}}>
        CONTACTS PAGE
      </NavLink>
    </div>
    </div>
  )
}
export default Navbar