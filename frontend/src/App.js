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
import UpdateHotels from './components/UpdateHotels';
import UpdateParks from './components/UpdateParks';
import Bookings from './components/Bookings';

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

  // delete park
  function DeletePark() {
    fetch('/park',{
      method:"DELETE",
      headers: {
      "Content-Type":"application/json"
    }
    })
  }

  // delete hotel
function DeleteHotel(){
  fetch('/hotel',{
    method:"DELETE",
    headers: {
      "Content-Type":"application/json"
    }
  })
  
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
    <AddPark />
    </Route>
    <Route path="/addhotels">
    <AddHotel/>
    </Route>
    <Route path="/contacts">
    <Contacts/>
    </Route>
    <Route path="/updhotel">
    <UpdateHotels/>
    </Route>
    <Route path="/updpark">
    <UpdateParks/>
    </Route>
    <Route path="/bookings">
    <Bookings/>
    </Route>
    <Route path="/oneprk">
    <DeletePark/>
    </Route>
    <Route path="/onehtl">
    <DeleteHotel/>
    </Route>
    <Route exact path="/">
    <Login />
    </Route>
    </Switch>
      
    </div>
  );
}

export default App;
