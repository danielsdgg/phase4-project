import React, { useState, useEffect } from 'react';
import './App.css';
import HotelList from './components/HotelList';
import ParkList from './components/ParkList';
import Navbar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import AddPark from './components/AddPark';
import AddHotel from './components/AddHotel';
import Contacts from './components/Contacts';

function App() {
  const [hotels, setHotels] = useState([])
  const [parks, setParks] = useState([])

  // fetch hotels data
  useEffect(() => {
    fetch("/hotels")
    .then(r => r.json())
    .then(data => setHotels(data))
  }, [])

  // fetch parks data
  useEffect(() => {
    fetch("/parks")
    .then(r => r.json())
    .then(data => setParks(data))
  }, [])

    // Add park
  const addPark = (park) => {
    fetch("/parks", {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(park)
    })
    .then(r => console.log(r))
  }

  // Add hotel
  const addHotel = (hotel) => {
    fetch("/hotels", {
      method:"POST",
      headers:{
        "Accept": "application/json",
        "Content-Type":"application/json"
      },
      body:JSON.stringify(hotel)
    })
    .then(r => console.log(r))
  }



  return (
    <div className="App">
      <header style={{textAlign:"center", backgroundColor:"lightgreen", fontSize:"35px"}}>Jambo-Journeys App</header>
      <Navbar />
    <Switch>
    <Route path="/parks">
    <ParkList parks = {parks}/>
    </Route>
    <Route path="/hotels">
    <HotelList hotels={hotels}/>
    </Route>
    <Route path="/about">
    <About/>
    </Route>
    <Route path="/addparks">
    <AddPark addPark={addPark}/>
    </Route>
    <Route path="/addhotels">
    <AddHotel addHotel={addHotel}/>
    </Route>
    <Route path="/contacts">
    <Contacts/>
    </Route>
      <Route exact path="/">
    <Login />
    </Route>
    </Switch>
      
    </div>
  );
}

export default App;
