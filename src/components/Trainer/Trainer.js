import React from "react";
import Footer from "../Footer/Footer";
import {NavLink} from "react-router-dom";

function Trainer(){
    return(
        <>
        <div className="fons_Trainer">
            <div>
        <div id="trainer" className="fons_Trainer">
            <div className="containerM mt">
                <h2 className="text-center pt-5 trg">Тренерский состав
                </h2>
                <div className=" moi">
                <div className="item">
                    <div className="person_item">
                        <NavLink to="/trainersS">
                            <span className="person_item_img">
                                <img src="https://worldtaekwondo.kg/wp-content/uploads/2020/09/Ubaidula-500-400x400.jpg" alt="Тохтурбаев Убайдула Фатуллаевич"/>
                            </span>
                            <span className="person_item_title">Тохтурбаев Убайдула <br/> Фатуллаевич</span>
                            <span className="person_item_details">Мастер Спорта,<br/> Чёрный пояс 5-й Дан </span>
                        </NavLink>
                        <div className="pt-4 pb-5">
                        <NavLink className="linkNews" to="/trainersS">Подробнее</NavLink>
                        </div>
                    </div>
                </div>

                </div>
            </div>
        </div>
            </div>
        </div>
            <Footer/>
            </>
    )
}

export default Trainer;