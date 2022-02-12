import React, {useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {toast} from "react-toastify";
import {modal_accounts} from "../../redux/actions";

function Navigation(){
    const dataUser = useSelector(state => {
        return state.accountsReducer
    })
    const dispatch = useDispatch();
    const [end, setEnd] = useState("d-none")

    useEffect(() => {
        let getUser = JSON.parse(localStorage.getItem("test"));
        if(getUser){
            setEnd("d-block")
        } else {
            setEnd("d-none")
        }
    }, [])

    function Btnaccount(){
        fetch("http://zrozez.pythonanywhere.com/accounts/accounts/")
        .then(response => {
            if(response.ok){
                return response.json()
            }else {
                toast.error(`Код ошибки: ${response.status}`)
            }
        })
            .then(data => {
                dispatch(modal_accounts(data))
            })
    }

    function endBtn(){
        localStorage.clear();
        window.location.reload();
    }
    return(
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top">
                <div className="container-fluid">
                    <a href="/#" className="navbar-brand logo lkl">INTERNATIONAL
                        <br/>TAEKWONDO FEDERATION</a>
                    <div className="d-flex">
                        <div className={end}>
                            <div className="dropdown userAccountAdp">

                                <button className="nav-link btn fh dropdown-toggle colorBla" type="button"
                                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">

                                    <svg  xmlns="http://www.w3.org/2000/svg" width="17" height="17" fill="currentColor"
                                         className="bi bi-person-circle colorBla" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd"
                                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg> <span className="userName">{dataUser.accountsUser.username}</span>
                                </button>
                                <ul className="dropdown-menu " aria-labelledby="dropdownMenuButton1">
                                    <li> <NavLink className="dropdown-item" to="/personal">Личный кабинет</NavLink></li>
                                    <li><a className="dropdown-item" href="/students">Ученики</a></li>
                                    <li><a href="#" onClick={endBtn} className="dropdown-item">Выйти</a></li>
                                </ul>
                            </div>
                        </div>
                        <span className="voyt">
                            <span className={end === "d-none" ? "d-block" : "d-none"} >
                            <a onClick={Btnaccount}  type="button" className="btn text-dark fh" data-bs-toggle="modal"
                               data-bs-target="#accounts">Войти</a></span>
                            </span>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
                            data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup"
                            aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    </div>
                    <div className="collapse navbar-collapse mk" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <hr className="hr dok"/>
                            <a className="nav-link fh" aria-current="page" href="/#header">Главная</a>
                            {/*<a className="nav-link fh" href="/#trainer">Тренеры</a>*/}
                            <li className="nav-item dropdown fh">
                                <a className="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button"
                                   data-bs-toggle="dropdown" aria-expanded="false">
                                    О нас
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><NavLink className="dropdown-item" to="AboutGet">Наша Академия</NavLink></li>
                                    <li><NavLink className="dropdown-item" to="trenera">Тренера</NavLink></li>
                                </ul>
                            </li>
                            <a className="nav-link fh" href="/#photo">Фото</a>
                            <li><a className="nav-link fh" href="/#testimonials">Расписание</a></li>
                            <li> <NavLink className="nav-link fh" to="/news">Новости</NavLink></li>
                            <a className="nav-link fh" href="/#contact">Контакты</a>
                            <span className="voyti">
                            <span className={end === "d-none" ? "d-block" : "d-none"} >
                            <a onClick={Btnaccount}  type="button" className="nav-link fh" data-bs-toggle="modal"
                               data-bs-target="#accounts">Войти</a></span>
                            </span>
                            <div className={end}>
                            <div className="dropdown userAccount">
                                <button className="nav-link btn fh dropdown-toggle" type="button"
                                        id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor"
                                         className="bi bi-person-circle" viewBox="0 0 16 16">
                                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z"/>
                                        <path fill-rule="evenodd"
                                              d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z"/>
                                    </svg> {dataUser.accountsUser.username}
                                </button>
                                <ul className="dropdown-menu fh" aria-labelledby="dropdownMenuButton1">
                                    <li> <NavLink className="dropdown-item" to="/personal">Личный кабинет</NavLink></li>
                                    <li><a className="dropdown-item" href="/students">Ученики</a></li>
                                    <li><a href="#" onClick={endBtn} className="dropdown-item">Выйти</a></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navigation;