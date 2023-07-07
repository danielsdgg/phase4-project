import React, { useState, useEffect } from 'react';
import './App.css';
import HotelList from './components/HotelList';
import ParkList from './components/ParkList';
import Navbar from './components/NavBar';
import { Route, Switch } from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import Contacts from './components/Contacts';
import UpdateHotels from './components/UpdateHotels';
import UpdateParks from './components/UpdateParks';
import Bookings from './components/Bookings';
import Signup from './components/Signup';
import UpdateRanger from './components/UpdateRanger';
import RangerList from './components/RangerList';
import Dashboard from './components/Dashboard';

function App() {
  const [hotels, setHotels] = useState([])
  const [parks, setParks] = useState([])
  const [rangers, setRangers] = useState([])

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

  // fetch rangers data
  useEffect(() => {
    fetch("/rangers")
    .then(r => r.json())
    .then(data => setRangers(data))
  }, [])

// delete park
function DeletePark(id) {
  fetch(`/park/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      // Handle successful deletion
      setRangers(rangers.filter((ranger) => ranger.id !== id));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// delete hotel
function DeleteHotel(id) {
  fetch(`/hotel/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      // Handle successful deletion
      setHotels(hotels.filter((hotel) => hotel.id !== id));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// delete ranger
function DeleteRanger(id) {
  fetch(`/ranger/${id}`, {
    method: 'DELETE',
  })
    .then(() => {
      // Handle successful deletion
      setRangers(rangers.filter((ranger) => ranger.id !== id));
    })
    .catch((error) => {
      console.error('Error:', error);
    });
}

// Add ranger
const addRanger = (ranger) => {
  fetch("/rangers", {
    method:"POST",
    headers:{
      "Accept": "application/json",
      "Content-Type":"application/json"
    },
    body:JSON.stringify(ranger)
  })
  .then(r => {
    if (r.ok){
      alert("Ranger added Sucessfully")
      console.log(r)
    }
  })
}

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
  .then(r => {
    if (r.ok){
      alert("Park added Sucessfully")
      console.log(r)
    }
  })
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
  .then(r => {
    if (r.ok){
      alert("Hotel added Successfully")
      console.log(r)
    }
  })
}
  return (
    <div className="App">
    <header style={{ textAlign: "center", fontSize: "35px", padding: "10px", color: "white", fontWeight: "bold" }}>Jambo-Journeys App</header>
    <Navbar />
    <Switch>
    <Route path="/admin_dashboard" addPark={addPark} addHotel={addHotel} addRanger={addRanger} >
    <Dashboard />
    </Route>
    <Route path="/parks">
    <ParkList parks={parks} deletePark={DeletePark}/>
    </Route>
    <Route path="/hotels">
    <HotelList hotels={hotels} deleteHotel={DeleteHotel}/>
    </Route>
    <Route path="/rangers">
    <RangerList rangers={rangers} deleteRanger={DeleteRanger}/>
    </Route>
    <Route path="/about">
    <About/>
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
    <Route path="/updranger">
    <UpdateRanger/>
    </Route>
    <Route path="/signup">
    <Signup/>
    </Route>
    <Route exact path="/">
    <Login />
    </Route>
    </Switch>
      
    </div>
  );
}

export default App;