import React, { useState, useEffect } from 'react';
import './App.css';
import HotelList from './components/HotelList';
import ParkList from './components/ParkList';
import Navbar from './components/NavBar';
import { Route, Switch, useHistory } from 'react-router-dom';
import Login from './components/Login';
import About from './components/About';
import AddPark from './components/AddPark';
import AddHotel from './components/AddHotel';
import Contacts from './components/Contacts';
import UpdateHotels from './components/UpdateHotels';
import UpdateParks from './components/UpdateParks';
import Bookings from './components/Bookings';
import Signup from './components/Signup';
import UpdateRanger from './components/UpdateRanger';
import AddRanger from './components/AddRanger';
import RangerList from './components/RangerList';


function App() {
  const history = useHistory()
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
  function DeletePark() {
    fetch('/park', {
      method: 'DELETE',
    })
      .then((response) => {
        if (response.ok) {
          console.log('Park deleted successfully');
        } else {
          // Request was not successful
          throw new Error('Failed to delete park');
        }
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  // delete hotel
function DeleteHotel(){
  fetch('/hotel',{
    method:"DELETE",
  })
  .then(r => r.json())
  .then(data => setHotels(data))  
}

 // delete ranger
 function DeleteRanger(){
  fetch('/ranger',{
    method:"DELETE",
  })
  .then(r => r.json())
  .then(data => setRangers(data))  
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
  history.push('/rangers')
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
  history.push('/parks')
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
  history.push('/hotels')
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
    <Route path="/rangers">
    <RangerList rangers={rangers}/>
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
    <Route path="/addrangers">
    <AddRanger addRanger={addRanger}/>
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
    <Route path="/updranger">
    <UpdateRanger/>
    </Route>
    <Route path="/delranger">
    <DeleteRanger/>
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