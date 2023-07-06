import React from "react";

function deleteHotel() {
    fetch('/hotel',{method:"DELETE",
      headers:{"Content-Type":"application/json"}
    })
  }


function HotelItem({name,image_url,description,location,prices}){
    return(
        <div className="hotelsitem">
            <img src={image_url} alt={name}/>
            <h4>Name: {name}</h4>
            <p>Description: {description} </p>
            <p>Location: {location}</p>
            <p>Price {prices}</p> <br></br>

            <button className="book">Book</button><br></br><br></br>
            <button className="upd">Update</button><br></br><br></br>
            <button className="del1" onClick={deleteHotel}>Delete</button>
        </div>
    )
}

export default HotelItem