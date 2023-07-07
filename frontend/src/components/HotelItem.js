import React from "react";
import { Link } from "react-router-dom";


function HotelItem({deleteHotel,name,image_url,description,location,prices}){
    return(
        <div className="hotelsitem">
            <img src={image_url} alt={name}/>
            <h4>Name: {name}</h4>
            <p>Description: {description} </p>
            <p>Location: {location}</p>
            <p>Price {prices}</p> <br></br>

            <Link to={"/bookings"}><button className="bk2">Book</button></Link><br></br><br></br>
            <Link to={`/updhotel`}><button className="up2">Update</button></Link><br></br><br></br>
            <button onClick={deleteHotel} className="dl2">Delete</button><br></br><br></br>
        </div>
    )
}

export default HotelItem