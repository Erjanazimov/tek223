import React, {} from "react";
import { useSelector} from "react-redux";
import Footer from "../Footer/Footer";
import {NavLink} from "react-router-dom";


function News(){
    const newsState = useSelector(state => {
        return state.NewsReducer
    })

    return(
        <div className="fons_Trainer">
            <div className="containerM mt pb-5">
                <div className="pt-5">
                    <p className="newsText text-center">Новости о нашей Академии</p>
                    <div className="NewsFlex pt-3">
                    {newsState.news.map(item => {
                        return <div className="newsfons m-2" key={item.id}>
                            <NavLink className="imgNewsHover" to={"/news" + item.id}>
                            <p><img src={item.images} className="imgNews"/></p>
                            </NavLink>
                            <p className="p-2">
                                <NavLink className="textName" to={"/news" + item.id}>
                            <p className="text-left">{item.name}</p>
                                </NavLink>
                            <p className="textNews">{item.information.slice(0, 124) + "..."}</p>
                                <NavLink className="linkNews" to={"/news" + item.id}>Подробнее</NavLink>
                            </p>
                        </div>
                    })}
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default News;