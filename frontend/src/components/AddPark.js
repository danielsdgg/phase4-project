import React,{useState} from "react";

function AddPark({parks, setParks}){
    const [formData, setFormData] = useState({
        name:"",
        image_url:"",
        description:"",
        location:"",
        prices:"",
    })

    const handleSubmit = (e) => {
        e.preventDefault()

        const newPark = {
            name:formData.name,
            image_url:formData.image_url,
            description:formData.description,
            location:formData.location,
            prices:formData.prices,
        };

        // post request
        fetch("/parks", {
            method:"POST",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newPark)
        })
        .then((r) => r.json())
        .then((data) => {
            setParks([...parks,data]);

            // reset the form data to empty strings after adding hotel
            setFormData({
                name:"",
                image_url:"",
                description:"",
                location:"",
                prices:"",
            })
        })
    }
    console.log(formData)

    return(
        <div className="addparks">
            <h2 style={{textAlign:"center", color:"lightblue"}}>ADD Park</h2>
            <p style={{textAlign:"center", backgroundColor:"grey"}}>To add a Park kindly fill up the form below</p><br></br><br></br><br></br>

            <form className="addpark-form">
                <div className="form1">
                    <label htmlFor="name">Enter Hotel Name: </label><input type="text" placeholder="Ole-Sereni" id="name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/><br></br>
                    <label htmlFor="description">Enter Description: </label><input type="text" placeholder="Review" id="desc" value={formData.description} onChange={(e) => setFormData({...formData,description:e.target.value})}/><br></br>
                    <label htmlFor="location">Enter Location: </label><input type="text" placeholder="where it's located" id="loc" value={formData.location} onChange={(e) => setFormData({...formData,location:e.target.value})}/><br></br>
                    <label htmlFor="prices">Enter Price: </label><input type="text" placeholder="price for booking" id="price" value={formData.prices} onChange={(e) => setFormData({...formData,prices:e.target.value})}/><br></br>
                    <label htmlFor="image_url">Enter image URL: </label><input type="text" placeholder="jpeg/42" id="imag" value={formData.image_url} onChange={(e) => setFormData({...formData,image_url:e.target.value})}/><br></br><br></br>

                    <button className="btn2" type = "submit" onClick={handleSubmit} >Add park</button>


                </div>
            </form>
        </div>
    )
}

export default AddPark