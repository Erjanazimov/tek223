import React, {useEffect, useState} from "react";
import {useSelector, useDispatch} from "react-redux";
import {idPost, submitChange, submitStudents, userResult} from "../../redux/actions";
import {toast} from "react-toastify";


function ModalSubmit(){
    const name = React.createRef();
    const family = React.createRef();
    const patronymic = React.createRef();
    const email = React.createRef();
    const fio = React.createRef();
    const date = React.createRef();
    const number = React.createRef();
    const groups =React.createRef();
    const submitState = useSelector(state => {
        return state.submitReducer
    })

    const stateSelect = useSelector(state => {
        return state.NewsReducer
    })

    const dispatch = useDispatch()

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }


    function handleSubmit(){
        let obj = {
            name: name.current.value,
            family: family.current.value,
            patronymic: patronymic.current.value,
            fio: fio.current.value,
            email: email.current.value,
            date: date.current.value,
            tel: number.current.value
        }
        dispatch(submitChange(obj))

        errorSubmit()
    }

    function errorSubmit(){
    if(submitState.submit.email.length+1){
            email.current.classList.remove("error");
            email.current.nextSibling.textContent = ""
        }

        if(!submitState.submit.name){
            name.current.classList.remove("error");
            name.current.nextSibling.textContent = ""
        } else if(!submitState.submit.family){
            family.current.classList.remove("error");
            family.current.nextSibling.textContent = ""
        }else if(!submitState.submit.patronymic){
            patronymic.current.classList.remove("error");
            patronymic.current.nextSibling.textContent = ""
        }else if(!submitState.submit.fio){
            fio.current.classList.remove("error");
            fio.current.nextSibling.textContent = ""
        }else if(!submitState.submit.date){
            date.current.classList.remove("error");
            date.current.nextSibling.textContent = ""
        } else if(!submitState.submit.tel){
            number.current.classList.remove("error");
            number.current.nextSibling.textContent = ""
        }
    }

    function btnSumbmit(){
        let emailValidate = validateEmail(submitState.submit.email);
        if(!submitState.submit.name){
            name.current.classList += " error"
            name.current.nextSibling.textContent = "Заполните имя"
        } else if(!submitState.submit.family){
            family.current.classList += " error"
            family.current.nextSibling.textContent = "Заполните фамилию"
        }else if(!submitState.submit.patronymic){
            patronymic.current.classList += " error"
            patronymic.current.nextSibling.textContent = "Заполните отчество"
        }else if(!submitState.submit.fio){
            fio.current.classList += " error"
            fio.current.nextSibling.textContent = "Заполните ФИО родителей"
        } else if(!emailValidate){
            email.current.classList += " error"
            email.current.nextSibling.textContent = "Заполните Email"
        }else if(!submitState.submit.date){
            date.current.classList += " error"
            date.current.nextSibling.textContent = "Заполните дату рождение"
        }else if(!submitState.submit.tel){
            number.current.classList += " error"
            number.current.nextSibling.textContent = "Заполните номер телефона"
        }else {
            const submitUser = {
                category: groups.current.value,
                worker: 51,
                surname: submitState.submit.family,
                name: submitState.submit.name,
                patronymic: submitState.submit.patronymic,
                fio_parents: submitState.submit.fio,
                phone_number: submitState.submit.tel,
                date_of_birth: submitState.submit.date,
                email: submitState.submit.email,
                status: "registration",
                color: "white_10"
            }
            dispatch(submitStudents(submitUser));
            // dispatch(userResult(stateSelect.user[stateSelect.user.length - 1].id + 1))
        }
        // console.log(stateSelect.user[stateSelect.user.length - 1])
    }


    return(
        <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="exampleModalLabel">Заявка на регистрацию</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form action="">
                            <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Выберите группу</label>
                            <select  className="form-select mb-3" aria-label="Default select example">
                                {stateSelect.groups.map(item => {
                                    return <option ref={groups} value={item.id}>{item.name}</option>
                                })}
                            </select>

                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Введите имя </label>
                                <input ref={name} onChange={handleSubmit} type="name" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Имя" value={submitState.submit.name}/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Введите фамилию </label>
                                <input ref={family} onChange={handleSubmit} type="name" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Фамилия" value={submitState.submit.family}/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Введите Отчество </label>
                                <input ref={patronymic} onChange={handleSubmit} type="name" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Отчество" value={submitState.submit.patronymic}/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">ФИО Родителей </label>
                                <input  ref={fio} onChange={handleSubmit} type="name" className="form-control" id="exampleFormControlInput1"
                                       placeholder="ФИО Родителей" value={submitState.submit.fio}/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-4">

                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Email</label>
                                <input ref={email} onChange={handleSubmit} type="email" required className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" value={submitState.submit.email} placeholder="Email"/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Дата рождения </label>
                                <input onChange={handleSubmit} ref={date} type="date" className="form-control" id="exampleFormControlInput1"/>
                                <p className="errorRed"></p>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleFormControlInput1" className="form-label fs-6">Номер телефона </label>
                                <input ref={number} onChange={handleSubmit} type="number" className="form-control" id="exampleFormControlInput1"
                                       placeholder="Номер телефона" value={submitState.submit.tel}/>
                                <p className="errorRed"></p>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Закрыть</button>
                        <button onClick={btnSumbmit} type="button" className="btn btn-primary" >Отправить</button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default ModalSubmit;