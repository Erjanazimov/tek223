import React from "react";
import Header from "../Header/Header";
import About from "../About/About";
import Gallery from "../Gallery/Gallery";
import Contact from "../Contact/Contact";
import Reviews from "../reviews/Reviews";


function Glavnaya(){
    return(
        <div>
            <Header/>
            <About/>
            <Gallery/>
            <Reviews/>
            <Contact/>
        </div>
    )
}

export default Glavnaya;