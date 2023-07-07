import React from "react";
import HotelItem from "./HotelItem";

function HotelList({hotels, byName}){
    return(
        <div className="hotel-container">
            {hotels.map(hotel => <HotelItem key ={hotel.id} name = {hotel.name} image_url={hotel.image_url} description={hotel.description} location={hotel.location} prices={hotel.prices} byName={byName}/>)}
        </div>
    )
}

export default HotelList