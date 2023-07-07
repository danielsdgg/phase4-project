import React from "react";
import ParkItem from "./ParkItem";

function ParkList({parks, byName, deletePark}){
    return(
        <div className="park-container">
            {parks.map(park => <ParkItem key ={park.id} name = {park.name} image_url={park.image_url} description={park.description} location={park.location} prices={park.prices} byName={byName} deletePark={deletePark}/>)}
           
        </div>
    )
}

export default ParkList