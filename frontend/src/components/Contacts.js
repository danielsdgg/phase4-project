import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Contacts(){
    const history = useHistory()

    // declare form variables
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        // object that will hold data
        const newMessage = {
            name:name,
            email:email,
            feedback:feedback,
        }

        // fetch review data
        fetch("/reviews", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newMessage)
        })
        .then((r) => r.json())
        .then((data) => console.log(data))
        setInputClear()

        history.push("/contacts")
    }
    function setInputClear(){
        setName("")
        setEmail("")
        setFeedback("")
    }
    return(
        <div className="fm1">
            <form className="reviews" onSubmit={handleSubmit}>
                <h2 style={{textAlign:"center"}}>Contacts Page</h2>
                <p style={{textAlign:"center"}}>We would love to hear from you</p>

                <label type="text">Enter Name:</label>
                <input type="text" style={{width:"100%", height:"35%", marginBottom:"1%"}} id="name" value={name} placeholder="daniel" onChange={e => setName(e.target.value)}/><br></br>

                <label type="text">Enter emailaddress:</label>
                <input type="text" style={{width:"100%", height:"35%", marginBottom:"1%"}} id="email" value={email} placeholder="your-email@13.com" onChange={e => setEmail(e.target.value)}/><br></br>
               
                <label type="text">Enter Your Feedback:</label>
                <input type="text" style={{width:"100%", height:"35%", marginBottom:"1%"}} id="feeds" value={feedback} placeholder="Your reviews/suggestions" onChange={e => setFeedback(e.target.value)}/><br></br>

                <button style={{backgroundColor:"green", cursor:"pointer",padding: "10px",border: "none"}} className="submit-message" type="submit" onC>Submit</button>


            </form>
        </div>
    )
}

export default Contacts