import React,{useState} from "react";

function AddPark({addPark}){
    const [park, setPark] = useState({
        name:"",
        image_url:"",
        description:"",
        location:"",
        prices:""
    })
    const handleChange = (e) => {
        const input = e.target.id
        const value = e.target.value
        setPark(prev => {
            return{...prev, [input]:value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addPark(park)
        console.log(park)
    }

    return(
        <div className="addpark">
            <h2 style={{textAlign:"center", color:"lightblue"}}>ADD Park</h2>
            <p style={{textAlign:"center", backgroundColor:"grey"}}>To add a Park kindly fill up the form below</p><br></br><br></br><br></br>

            <form className="addpark-form" onSubmit={handleSubmit}>
                <div className="form2">
                    <label htmlFor="name">Enter Park Name: </label><input type="text" placeholder="park name" id="name" value={park.name} onChange={handleChange}/><br></br>
                    <label htmlFor="description">Enter Description: </label><input type="text" placeholder="Review" id="description" value={park.description} onChange={handleChange}/><br></br>
                    <label htmlFor="location">Enter Location: </label><input type="text" placeholder="where it's located" id="location" value={park.location} onChange={handleChange}/><br></br>
                    <label htmlFor="prices">Enter Price: </label><input type="text" placeholder="price for booking" id="prices" value={park.prices} onChange={handleChange}/><br></br>
                    <label htmlFor="image_url">Enter image URL: </label><input type="text" placeholder="jpeg/42" id="image_url" value={park.image_url} onChange={handleChange}/><br></br><br></br>

                    <button className="btn2" type = "submit">Add Park</button>


                </div>
            </form>
        </div>
    )
}

export default AddPark