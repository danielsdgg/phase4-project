import React from "react";
import RangerItem from "./RangerItem";

function RangerList({rangers, byName, deleteRanger}){
    return(
        <div className="ranger-container">
            {rangers.map(ranger => <RangerItem key = {ranger.id} name = {ranger.name} gender = {ranger.gender} byName = {byName} deleteRanger={deleteRanger}/>)}
        </div>
    )
}

export default RangerList