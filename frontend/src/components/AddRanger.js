import React, { useState } from "react";

function AddRanger({addRanger}){
    const [ranger, setRanger] = useState({
        name:"",
        gender:""
    })
    const handleChange = (e) => {
        const input = e.target.id
        const value = e.target.value
        setRanger(prev => {
            return{...prev, [input]:value}
        })
    }
    const handleSubmit = (e) => {
        e.preventDefault()
        addRanger(ranger)
        console.log(ranger)
    }
    return(
        <div className="addranger">
            <h2 style={{textAlign:"center", color:"lightblue"}}>ADD Ranger</h2>
            <p style={{textAlign:"center", backgroundColor:"grey"}}>To add a Ranger kindly fill up the form below</p><br></br><br></br><br></br>

            <form className="addranger-form" onSubmit={handleSubmit}>
                <div className="fm7">
                    <label htmlFor="name">Enter Ranger Name: </label><input type="text" placeholder="ranger-name" id="name" value={ranger.name} onChange={handleChange}/><br></br>
                    <label htmlFor="gender">Gender: </label><input type="text" placeholder="ranger-name" id="gender" value={ranger.gender} onChange={handleChange}/><br></br>

                    <button className="btn2" type="submit">Add Ranger</button>
                </div>
            </form>

        </div>
    )
}

export default AddRanger