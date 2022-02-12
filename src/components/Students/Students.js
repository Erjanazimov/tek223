import React, {useEffect} from "react";
import Footer from "../Footer/Footer";
import {useDispatch, useSelector} from "react-redux";
import {resultSearch, userSearch, warn_user} from "../../redux/actions";
import {toast} from "react-toastify";
import "./style.css"

function Students(){
    let getUser = JSON.parse(localStorage.getItem("test"));
    const family = React.createRef();
    const name = React.createRef();
    const dispatch = useDispatch();
    const userState = useSelector(state => {
        return state.studentReducer
    })


    const users = useSelector(state => {
        return state
    })


    function searhHandle(){
        const user = {
            name: name.current.value,
            family: family.current.value
        }
        dispatch(userSearch(user))
    }

    function btnSearch(){
        let objUSer = {
            data: []
        };

        let num = false
        if(!userState.handleUser.family){
            toast.error("Заполните фамилию");
        } else if(!userState.handleUser.name){
            toast.error("Заполните имя")
        } else {
            users.NewsReducer.user.map(item => {
                if(item.surname === userState.handleUser.family && item.name === userState.handleUser.name){
                    objUSer.data.push(item)
                } else {
                    num = true
                }
            })
        }
        if(objUSer.data.length > 0){
            dispatch(resultSearch(objUSer.data))
        } else if(num){
            toast.error("Не найдено")
        }
    }

    function warnBtn(e){
        let id = e.target.dataset.id;
        dispatch(warn_user(id))
    }

    function status2(e){
        let id = e.target.dataset.id;
        let urlAccept = `http://zrozez.pythonanywhere.com/api/v1/students/${id}/parent_reminder_prinyat/`;
        fetch(urlAccept)
            .then(response => {
                if(response.ok){
                    toast("Успешно отправлено заявка на принятие!")
                } else {
                    toast.error("Ошибка статутс: " + response.status)
                }
            })
    }

    function status3(e){
        let id = e.target.dataset.id;
        let urlColor = `http://zrozez.pythonanywhere.com/api/v1/students/${id}/parent_reminder_color/`;
        fetch(urlColor)
            .then(response => {
                if(response.ok){
                    toast("Успешно отправлено свет пояса")
                } else {
                    toast.error("Ошибка статутс: " + response.status)
                }
            });


    }


    return(
        <div>
        <div className="fons_Trainer">
            <div className={getUser ? "d-none" : "d-block"}>
                <div className="containerM mt p-5">
                    <h1 className="text-danger text-center">Зайдите себе в аккаунт</h1>
                </div>
            </div>
            <div className={getUser ? "d-block" : "d-none"}>
            <div className="containerM mt">
                <form className="mb-3 p-3">
                    <h3 className="fs-3 text-center">Поиск учеников</h3>
                    <div className="mt-5">
                        <div className="mb-3">
                            <input ref={family} onChange={searhHandle} type="text"
                                   className="form-control mb-2" placeholder="Фамилия"
                                   aria-label="Username" value={userState.handleUser.family}/>
                                <input ref={name} onChange={searhHandle}
                                       type="text" className="form-control mb-2"
                                       placeholder="Имя" aria-label="Server" value={userState.handleUser.name}/>
                            <div className="d-grid gap-2">
                            <button onClick={btnSearch} type="button" className=" form-control btn btn-outline-dark">Искать</button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div className="containerM p-2 pb-5">
                <div className="accordion accordion-flush" id="accordionFlushExample">
                {users.NewsReducer.resultUser.length >= 0 ? users.NewsReducer.resultUser.map(item => {
                    return <div className="accordion-item mt-3">
                            <h2 className="accordion-header" id={item.name}>
                                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#flush-collapseOne" aria-expanded="false"
                                        aria-controls="flush-collapseOne">
                                    <b>{item.surname}</b> - <b> {item.name}</b> <span className="px-2">
                                    <b>группа: {item.category}</b></span>
                                </button>
                            </h2>
                            <div id="flush-collapseOne" className="accordion-collapse collapse"
                                 aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                                <div className="accordion-body">
                                    <ul>
                                        <li>
                                            <button data-id={item.id} onClick={warnBtn} type="button"
                                                    className="btn form-control btn btn-outline-success">
                                                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
                                                     fill="currentColor" className="bi bi-alarm" viewBox="0 0 16 16">
                                                    <path
                                                        d="M8.5 5.5a.5.5 0 0 0-1 0v3.362l-1.429 2.38a.5.5 0 1 0 .858.515l1.5-2.5A.5.5 0 0 0 8.5 9V5.5z"/>
                                                    <path
                                                        d="M6.5 0a.5.5 0 0 0 0 1H7v1.07a7.001 7.001 0 0 0-3.273 12.474l-.602.602a.5.5 0 0 0 .707.708l.746-.746A6.97 6.97 0 0 0 8 16a6.97 6.97 0 0 0 3.422-.892l.746.746a.5.5 0 0 0 .707-.708l-.601-.602A7.001 7.001 0 0 0 9 2.07V1h.5a.5.5 0 0 0 0-1h-3zm1.038 3.018a6.093 6.093 0 0 1 .924 0 6 6 0 1 1-.924 0zM0 3.5c0 .753.333 1.429.86 1.887A8.035 8.035 0 0 1 4.387 1.86 2.5 2.5 0 0 0 0 3.5zM13.5 1c-.753 0-1.429.333-1.887.86a8.035 8.035 0 0 1 3.527 3.527A2.5 2.5 0 0 0 13.5 1z"/>
                                                </svg> Предупредить
                                            </button>
                                        </li>
                                        <hr className="hr"/>
                                        <li>Имя: {item.name}</li>
                                        <hr className="hr"/>
                                        <li>Фамилия: {item.surname}</li>
                                        <hr className="hr"/>
                                        <li>Отчество: {item.patronymic}</li>
                                        <hr className="hr"/>
                                        <li>Дата рождения: {item.date_of_birth}</li>
                                        <hr className="hr"/>
                                        <li>ФИО родителя: {item.fio_parents}</li>
                                        <hr className="hr"/>
                                        <li>Номер телефона: {item.phone_number}</li>
                                        <hr className="hr"/>
                                        <li>email: {item.email}</li>
                                        <hr className="hr"/>
                                        <li className="d-flex align-items-center"><b>Статус: </b>
                                            {getUser.user_type === "teacher1" ?
                                                <button data-id={item.id} onClick={status2}
                                                        data-id={item.id} type="button"
                                                        className="btn btn-outline-primary mx-3">Предупредить</button>
                                                :  <span className="mx-2"> Ожидание... </span>
                                            }
                                        </li>
                                        <hr className="hr"/>
                                        <li>Статус пояса: {item.color}
                                            <span className={getUser.user_type === "teacher1" ?
                                                "d-block mt-3" : "d-none"
                                            }>
                                            <button onClick={status3} data-id={item.id} type="button"
                                                    className="btn btn-outline-primary">Предупредить</button>
                                            </span>
                                        </li>
                                        <hr className="hr"/>
                                    </ul>
                                </div>
                            </div>
                    </div>
                }) : <h1>Ошибка api</h1>}
                </div>
            </div>
            </div>
        </div>

            <Footer/>
        </div>
    )
}

export default Students;