import React from "react";
import { Link } from "react-router-dom";

function ParkItem({name,image_url,description,location,prices,deletePark}){
    return(
        <div className="parksitem">
            <img src={image_url} alt={name}/>
            <h4>Name: {name}</h4>
            <p>Description: {description} </p>
            <p>Location: {location}</p>
            <p>Price: {prices}</p> <br></br>

            <Link to={"/bookings"}><button className="bk1">Book</button></Link><br></br><br></br>
            <Link to={"/updpark"}><button className="up1">Update</button></Link><br></br><br></br>
            <button onClick={deletePark} className="dl3">Delete</button><br></br><br></br>
        </div>
    )
}

export default ParkItem