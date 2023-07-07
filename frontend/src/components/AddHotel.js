import React,{useState} from "react";

function AddHotel({addHotel}){
    const [hotel, setHotel] = useState({
        name:"",
        image_url:"",
        description:"",
        location:"",
        prices:""
    })
    const handleChange = (e) => {
        const input = e.target.id
        const value = e.target.value
        setHotel(prev => {
            return{...prev, [input]:value}
        })
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        addHotel(hotel)
        console.log(hotel)
    }

    return(
        <div className="addhotel">
            <h2 style={{textAlign:"center", color:"lightblue"}}>ADD Hotel</h2>
            <p style={{textAlign:"center", backgroundColor:"grey"}}>To add a Hotel kindly fill up the form below</p><br></br><br></br><br></br>

            <form className="addhotel-form" onSubmit={handleSubmit}>
                <div className="form1">
                    <label htmlFor="name">Enter Hotel Name: </label><input type="text" placeholder="hotel name" id="name" value={hotel.name} onChange={handleChange}/><br></br>
                    <label htmlFor="description">Enter Description: </label><input type="text" placeholder="Review" id="description" value={hotel.description} onChange={handleChange}/><br></br>
                    <label htmlFor="location">Enter Location: </label><input type="text" placeholder="where it's located" id="location" value={hotel.location} onChange={handleChange}/><br></br>
                    <label htmlFor="prices">Enter Price: </label><input type="text" placeholder="price for booking" id="prices" value={hotel.prices} onChange={handleChange}/><br></br>
                    <label htmlFor="image_url">Enter image URL: </label><input type="text" placeholder="jpeg/42" id="image_url" value={hotel.image_url} onChange={handleChange}/><br></br><br></br>

                    <button className="btn2" type = "submit">Add hotel</button>


                </div>
            </form>
        </div>
    )
}

export default AddHotel