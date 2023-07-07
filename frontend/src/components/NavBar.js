import React from 'react';
import { NavLink } from 'react-router-dom';

function Navbar() {
  return (
    <div>
  <div className="navbar" style={{ backgroundColor: "lightblue", padding: "10px" }}>
    <NavLink exact to="/" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Log In
    </NavLink>
    <NavLink exact to="/contacts" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Contacts Page
    </NavLink>
    <NavLink to="/about" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      About us
    </NavLink>
    <NavLink to="/parks" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Parks
    </NavLink>
    <NavLink to="/rangers" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Rangers
    </NavLink>
    <NavLink to="/hotels" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Hotels
    </NavLink>
    <NavLink to="/addhotels" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Add Hotel
    </NavLink>
    <NavLink to="/addparks" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Add Park
    </NavLink>
    <NavLink to="/addrangers" style={{ color: "blue", padding: "10px", textDecoration: "none" }} activeStyle={{ color: "brown" }}>
      Add Rangers
    </NavLink>
  </div>
</div>
  )
}
export default Navbar