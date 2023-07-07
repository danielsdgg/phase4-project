import React from "react";
import ParkItem from "./ParkItem";

function ParkList({parks, byName}){
    return(
        <div className="park-container">
            {parks.map(park => <ParkItem key ={park.id} name = {park.name} image_url={park.image_url} description={park.description} location={park.location} prices={park.prices} byName={byName}/>)}
           
        </div>
    )
}

export default ParkList