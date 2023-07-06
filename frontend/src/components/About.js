import React from "react";
import tour from "../tour.jpeg"

function About(){
    return(
        <div className="about">

            <p style={{textAlign:"center"}}>Jambo-Journey: A tours and travel company started in 2023 by director Nimo, Lincoln and Daniel. We thrive in giving the best services to our clients. With just the push of a button, users are able to book for hotels and parks tours. We are glad to have you onboard. Enjoy!</p>
            <img src={tour} alt=" "/>
        </div>
    )
}

export default About