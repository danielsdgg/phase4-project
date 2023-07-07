import React from "react";
import RangerItem from "./RangerItem";

function RangerList({rangers, byName}){
    return(
        <div className="ranger-container">
            {rangers.map(ranger => <RangerItem key = {ranger.id} name = {ranger.name} gender = {ranger.gender} byName = {byName}/>)}
        </div>
    )
}

export default RangerList