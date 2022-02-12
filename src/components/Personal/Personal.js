import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {personalNewUser} from "../../redux/actions";
import Footer from "../Footer/Footer";
import {toast} from "react-toastify";

function Personal(){
    const name = React.createRef();
    const email = React.createRef();
    const password = React.createRef();

    const personalState = useSelector(state => {
        return state.accountsReducer
    })

    const dispatch = useDispatch();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function handlePersonal(){
        const obj = {
            // id: personalState.accountsUser.id,
            username: name.current.value,
            email: email.current.value,
            password: password.current.value
        }
        dispatch(personalNewUser(obj))
    }

    function newUserPersonal(){
        let url = `http://zrozez.pythonanywhere.com/accounts/accounts/${personalState.accountsUser.id}/`
        let emailValidate = validateEmail(personalState.newAccounts.email);
        if(!personalState.newAccounts.username){
            toast.error("Заполните имя")
        } else if(!emailValidate) {
            toast.error("Заполните email")
        } else if(!personalState.newAccounts.password){
            toast.error("Заполните пароль")
        } else {
            const requestOptions = {
                method: 'PUT',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify(personalState.newAccounts)
            };
            fetch(url, requestOptions)
                .then(response => {
                    if (response.ok) {
                        localStorage.setItem('test', JSON.stringify(personalState.newAccounts));
                        toast("Успешно изменены данные");
                        window.location.reload();
                    } else {
                        toast.error("С таким именнем уже есть аккаунт")
                    }
                })
        }
    }

    return(
        <div className="fons_Trainer mt">
            <div className="containerM p-4">
                <h3>Личный аккаунт: {personalState.accountsUser.username}</h3>
                <div className="form-text pb-2">Изменить имя, email, пароль
                </div>
                <form>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Имя</label>
                        <input ref={name} onChange={handlePersonal} type="name" className="form-control"
                               value={personalState.newAccounts.username}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email</label>
                        <input ref={email} onChange={handlePersonal} type="email" className="form-control"
                               value={personalState.newAccounts.email}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input ref={password} onChange={handlePersonal} type="text" className="form-control"
                               id="exampleInputPassword1" value={personalState.newAccounts.password}/>
                    </div>
                    <button onClick={newUserPersonal} type="button" className="btn btn-primary">Изменить</button>
                </form>
            </div>
            <Footer/>
        </div>
    )
}

export default Personal;