import React, {useState} from "react";
import { useHistory } from "react-router";


function UpdateParks(){
    const history = useHistory()
    const [formData, setFormData] = useState({
        name:"",
        image_url:"",
        description:"",
        location:"",
        prices:"",
    })

    function handleSubmit(e){
        e.preventDefault()

        const newParks = {
            name:formData.name,
            image_url:formData.image_url,
            description:formData.description,
            location:formData.location,
            prices:formData.prices
        };
        fetch('/park', {
            method:"PATCH",
            headers: {
                "Content-Type":"application/json",
            },
            body: JSON.stringify(newParks)
        })
        .then(r => r.json())
        .then(data => {console.log(data)
        })
        history.push('/parks')
    }
    return(
        <div>
            <form className="park-form" onSubmit={handleSubmit}>
                <h2 className="upd-htl" style={{textAlign:"center"}}>Update Park</h2>

                <label type="text">Name: </label>
                <input type="text" id="name" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})}/>

                <label type="text">Description: </label>
                <input type="text" id="describe" value={formData.description} onChange={(e)=>setFormData({...formData,description:e.target.value})}/>

                <label type="text">Location: </label>
                <input type="text" id="loca" value={formData.location} onChange={(e)=>setFormData({...formData,location:e.target.value})}/>

                <label type="text">Price: </label>
                <input type="text" id="pric" value={formData.prices} onChange={(e)=>setFormData({...formData,prices:e.target.value})}/>

                <label type="text">Enter Image URL:</label>
                <input type="text" id="url" value={formData.image_url} onChange={(e)=>setFormData({...formData,image_url:e.target.value})}/>

                <button type="submit" id="sub2" onClick={handleSubmit}>UPDATE</button>
            </form>
        </div>
    )
}

export default UpdateParks