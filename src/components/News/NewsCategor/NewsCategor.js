import React from "react";
import Footer from "../../Footer/Footer";

function NewsCategor(props){
    return(
        <>
        <div className="fons_Trainer">
            <div className="containerM mt pb-5">
                <div className="p-2">
                    <h3 className="textNewsanem pb-3">{props.name}</h3>
                    <hr className="hr"/>
                    <div className="pt-4 newsflex">
                        <img className="imgNewsPos" src={props.images}/>
                        <div className="ptNews">
                            {props.information}
                        </div>
                    </div>
                </div>
            </div>
        </div>
            <Footer/>
        </>
    )
}

export default NewsCategor;