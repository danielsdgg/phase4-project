import React from "react";
import tour from "../tour.jpeg"

function About(){
    return(
        <div className="about">

            <p style={{textAlign:"center"}}>Jambo-Journey: A tours and travel company started in 2023 by director Nimo, Lincoln and Daniel. We thrive in giving the best services to our clients. With just the push of a button, users are able to book for hotels and parks tours. Our organization is comprised of a team of handpicked professionals who expertise in facilitating Tours and travels services. The team is committed towards its motto of enabling local and International tourists to catch a glimpse of the great age old parks and find comfort in our hotels where top-notch services are assured. We ensure that the privacy of applicants is protected at all costs and the services we provide remain transparent.  We are glad to have you onboard. Enjoy!</p>
            <img src={tour} alt=" "/>
        </div>
    )
}

export default About