import React from "react";
import { Link } from "react-router-dom";

function RangerItem({name, gender, deleteRanger}){
    return(
        <div className="rangeritem">
            <h4>Name: {name}</h4>
            <p>Gender: {gender}</p>

            <Link to={"/updranger"}><button className="up1">Update</button></Link><br></br><br></br>
            <button onClick={deleteRanger} className="dl3">Delete</button><br></br><br></br>
        </div>
    )
}

export default RangerItem