import React, {useState} from "react";
import { useHistory } from "react-router-dom";

function Contacts(){
    const history = useHistory()

    // declare form variables
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [feedback, setFeedback] = useState("")
    const [user_id, setUserId] = useState("")

    function handleSubmit(e){
        e.preventDefault()

        // object that will hold data
        const newMessage = {
            name:name,
            email:email,
            feedback:feedback,
            user_id:user_id,
        }

        // fetch review data
        fetch("/reviews", {
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify(newMessage)
        })
        .then((r) => {
          if(r.ok){
            alert("Your Feedback has been received")
            return r.json()
          }
        })
        .then((data) => console.log(data))
        setInputClear()

        history.push("/contacts")
    }
    function setInputClear(){
        setName("")
        setEmail("")
        setFeedback("")
        setUserId("")
    }
    return(
        <div className="fm1" style={{ width: "300px", margin: "auto", textAlign: "center" }}>
  <form id="form" onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
    <h2 style={{ fontSize: "24px", fontWeight: "bold" }}>Contacts Page</h2>
    <p style={{ fontSize: "16px" }}>We would love to hear from you</p>

    <label htmlFor="name" style={{ textAlign: "left", fontSize: "14px" }}>Enter Name:</label>
    <input
      type="text"
      id="name"
      value={name}
      placeholder="Daniel"
      onChange={e => setName(e.target.value)}
      style={{ height: "35px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px" }}
    />

    <label htmlFor="email" style={{ textAlign: "left", fontSize: "14px" }}>Enter Email Address:</label>
    <input
      type="text"
      id="email"
      value={email}
      placeholder="your-email@example.com"
      onChange={e => setEmail(e.target.value)}
      style={{ height: "35px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px" }}
    />

    <label htmlFor="feedback" style={{ textAlign: "left", fontSize: "14px" }}>Enter Your Feedback:</label>
    <input
      type="text"
      id="feedback"
      value={feedback}
      placeholder="Your reviews/suggestions"
      onChange={e => setFeedback(e.target.value)}
      style={{ height: "35px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px" }}
    />

    <label htmlFor="userid" style={{ textAlign: "left", fontSize: "14px" }}>Enter Your User Id:</label>
    <input
      type="text"
      id="userid"
      value={user_id}
      placeholder="Your user id"
      onChange={e => setUserId(e.target.value)}
      style={{ height: "35px", borderRadius: "5px", border: "1px solid #ccc", padding: "5px" }}
    />

    <button
      className="submit-message"
      type="submit"
      style={{
        backgroundColor: "green",
        cursor: "pointer",
        padding: "10px",
        border: "none",
        color: "white",
        borderRadius: "5px",
        fontSize: "16px",
        fontWeight: "bold"
      }}
    >
      Submit
    </button>
  </form>
</div>

    )
}

export default Contacts