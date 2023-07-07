import React from "react";
import { Link } from "react-router-dom";

function RangerItem({name, gender}){
    return(
        <div className="rangeritem">
            <h4>Name: {name}</h4>
            <p>Gender: {gender}</p>

            <Link to={"/updranger"}><button className="up1">Update</button></Link><br></br><br></br>
            <Link to={"/delranger"}><button className="dl3">Delete</button></Link><br></br><br></br>
        </div>
    )
}

export default RangerItem