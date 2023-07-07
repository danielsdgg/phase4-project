import React, { useState } from "react";

function UpdateRanger(){
    const [formData, setFormData] = useState({
        name:"",
        gender:"",
    })
    function handleSubmit(e){
        e.preventDefault()

        const newRanger = {
            name:formData.name,
            gender:formData.gender,
        };
        fetch('/ranger', {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newRanger)
        })
        .then(r => r.json())
        .then(data => {console.log(data)
        })
    }
    return(
        <div className="rang">
            <form className="rang-form" onSubmit={handleSubmit}>
            <h2 className="upd-htl" style={{textAlign:"center"}}>Update Ranger</h2>

            <label type="text">Name: </label>
            <input type="text" id="name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>

            <label type="text">Gender: </label>
            <input type="text" id="gender" value={formData.gender} onChange={(e)=>setFormData({...formData,gender:e.target.value})}/>

            <button type="submit" id="sub2" onClick={handleSubmit}>UPDATE</button>

            </form>
        </div>
    )
}

export default UpdateRanger