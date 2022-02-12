import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {entrance_user, reg_modal, vhod_modal} from "../../redux/actions";
import {toast} from "react-toastify";

function ModalAccounts(){

    const entrance = React.createRef();
    const reg = React.createRef();
    const entr = React.createRef();
    const regstr = React.createRef();
    const vhodEmail = React.createRef()
    const vhodPassword = React.createRef();
    const nameReg = React.createRef();
    const emailReg = React.createRef();
    const passwordReg = React.createRef();

    const accountsState = useSelector(state => {
        return state.accountsReducer
    })

    const dispatch = useDispatch();

    function accountEntrance(e){
        reg.current.className = "d-none";
        entrance.current.className = "d-block";
        regstr.current.classList.remove("activeAccount");
        e.currentTarget.className = "activeAccount";
    }

    function accountReg(e){
        reg.current.className = "d-block"
        entrance.current.className = "d-none"
        entr.current.classList.remove("activeAccount");
        e.currentTarget.className = "activeAccount";
    }

    function registr(){
        let obj = {
            username: nameReg.current.value,
            email: emailReg.current.value,
            password: passwordReg.current.value
        }

        dispatch(reg_modal(obj))
    }
    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function vhodBtn(){
        let obj = {
            username: vhodEmail.current.value,
            password: vhodPassword.current.value
        }
        dispatch(vhod_modal(obj))
    }

    function vhodOnBtn(){
        if(!accountsState.vhod.username){
            toast.error("Заполните имя")
        } else if(!accountsState.vhod.password){
            toast.error("Заполните пароль")
        } else{
            let objUser = {};
            accountsState.jsonUser.map(item => {
                if(item.username === accountsState.vhod.username && item.password === accountsState.vhod.password){
                    objUser.accounts = item
                    localStorage.setItem('test', JSON.stringify(item));
                }
            })

            if(objUser.accounts){
                dispatch(entrance_user(accountsState.vhod, "vhod"));
            } else {
                toast.error("Введено неправильно имя или пароль!")
            }
        }
    }

    function BtnReg(){
        let emailValidate = validateEmail(accountsState.reg.email);
        if(!accountsState.reg.username){
            toast.error("Заполните Имя")
        } else if(!emailValidate){
            toast.error("Заполните email правильно")
        } else if(!accountsState.reg.password){
            toast.error("Забыли вести пароль")
        } else {
            let options = {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(accountsState.reg)
            }
            fetch("http://zrozez.pythonanywhere.com/accounts/accounts/", options)
                .then(response => {
                    if(response.ok){
                        dispatch(entrance_user(accountsState.reg, "reg"));
                        toast.success("Вы успешно зарегестрировались");
                    } else{
                        toast.error(`С таким именнем уже имеется`)
                    }
                })
        }
    }

    return(
        <div className="modal fade" id="accounts" tabIndex="-1" aria-labelledby="exampleModalLabel"
             aria-hidden="true">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modalAccounts">
                        <p ref={entr} onClick={accountEntrance} className="activeAccount">Вход</p>
                        <p ref={regstr} onClick={accountReg}>Регистрация</p>
                    </div>
                    <div className="modal-body">
                        <div ref={entrance} className="d-block">
                        <form className="mt-5">
                            <div className="mb-4">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input ref={vhodEmail} onChange={vhodBtn} type="email" required className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" value={accountsState.vhod.username.replace(/\s/g, '')}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input ref={vhodPassword} onChange={vhodBtn} type="password"
                                       required className="form-control" id="exampleInputPassword1" value={accountsState.vhod.password}/>
                            </div>
                            <div className="d-flex justify-content-center">
                            <button onClick={vhodOnBtn} type="button" className="btn btn-primary fs-5">Вход</button>
                            </div>
                        </form>
                        </div>

                        <div ref={reg} className="d-none">
                        <form className="mt-5">
                            <div className="mb-4">
                                <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                <input ref={nameReg} onChange={registr} type="name" required className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" value={accountsState.reg.username.replace(/\s/g, '')}/>
                            </div>
                            <div className="mb-4">

                                <label htmlFor="exampleInputEmail1" className="form-label">email</label>
                                <input ref={emailReg} onChange={registr} type="email" required className="form-control" id="exampleInputEmail1"
                                       aria-describedby="emailHelp" value={accountsState.reg.email}/>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input ref={passwordReg} onChange={registr} type="password" required className="form-control"
                                       id="exampleInputPassword1" value={accountsState.reg.password}/>
                            </div>
                            <div className="d-flex justify-content-center">
                                <button onClick={BtnReg} type="button" className="btn btn-primary fs-5">Регистрация</button>
                            </div>
                        </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ModalAccounts