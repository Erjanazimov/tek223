import React from "react";
import {useDispatch, useSelector} from "react-redux";
import {contactsData} from "../../redux/actions";
import {toast} from "react-toastify";

function Contact(){
    const name = React.createRef();
    const email = React.createRef()
    const phone = React.createRef();
    const text = React.createRef();

    const contactState = useSelector(state => {
        return state.NewsReducer
    })
    const dispatch = useDispatch();

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }
    function contactHandle(){
        const data = {
            name: name.current.value,
            email: email.current.value,
            phone: phone.current.value,
            information: text.current.value
        }
        dispatch(contactsData(data))
    }

    function contactBtn(){
        let emailValidate = validateEmail(contactState.contact.email);
        if(!contactState.contact.name){
            toast.error("Заполните имя")
        } else if(!emailValidate){
            toast.error("Заполните email")
        } else if(!contactState.contact.phone){
            toast.error("Заполните номер телефона")
        } else if(!contactState.contact.information){
            toast.error("Заполните текст сообщение")
        } else {
            console.log(contactState.contact)
            let options = {
                method: "POST",
                headers:{
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(contactState.contact)
            }
            fetch("http://zrozez.pythonanywhere.com/comments/comments/", options)
                .then(response => {
                    if(response.ok){
                        toast("Вам перезвонят течение часа");
                    } else{
                        toast.error(`Ошибка при отправке. Код ошибки ${response.status}`)
                    }
                })
        }
    }
    return(
        <div>
            <div id='contact'>
                <div className=' container'>
                    <div className="popit">
                    <div className='col-md-8'>
                        <div className='row'>
                            <div className='section-title'>
                                <h2>Заявка на обратный звонок
                                </h2>
                                <p>Для получения подробной консультации оставь заявку и мы свяжемся с тобой в ближайшее время.</p>
                            </div>
                            <form name='formname'>
                                <div className='row'>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <input onChange={contactHandle}
                                                ref={name}
                                                type='text'
                                                id='name'
                                                name='name'
                                                className='form-control'
                                                placeholder='Имя'
                                                required
                                                value={contactState.contact.name}
                                            />
                                            <p className='help-block text-danger'></p>
                                        </div>
                                    </div>
                                    <div className='col-md-6'>
                                        <div className='form-group'>
                                            <input onChange={contactHandle}
                                                ref={email}
                                                type='email'
                                                id='email'
                                                name='email'
                                                className='form-control'
                                                placeholder='Email'
                                                required
                                                value={contactState.contact.email}
                                            />
                                            <p className='help-block text-danger'></p>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <input onChange={contactHandle}
                                        ref={phone}
                                        type='number'
                                        id='number'
                                        name='number'
                                        className='form-control mb-3'
                                        placeholder='Номер телефона'
                                        required
                                        value={contactState.contact.phone}
                                    />
                                </div>
                                <div className='form-group'>
                  <textarea ref={text} onChange={contactHandle}
                      name='message'
                      id='message'
                      className='form-control'
                      rows='4'
                      placeholder='Текст'
                      required
                      value={contactState.contact.information}
                  />
                                    <p className='help-block text-danger'></p>
                                </div>
                                <div id='success'></div>
                                <button onClick={contactBtn} type='button' className='btn btn-custom btn-lg'>
                                    Отправить
                                </button>
                            </form>
                        </div>
                    </div>
                    <div className="conatct">
                        <div className="mpo">
                        <h3>Контактные данные</h3>
                            <p className="">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-geo-alt-fill" viewBox="0 0 16 16">
                                    <path
                                        d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                                </svg> <span className="fw-bold">Адрес</span></p>
                            <p className="lhd px-2">Боконбаева 12/123</p>

                            <p className="pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-telephone-fill" viewBox="0 0 16 16">
                                    <path fill-rule="evenodd"
                                          d="M1.885.511a1.745 1.745 0 0 1 2.61.163L6.29 2.98c.329.423.445.974.315 1.494l-.547 2.19a.678.678 0 0 0 .178.643l2.457 2.457a.678.678 0 0 0 .644.178l2.189-.547a1.745 1.745 0 0 1 1.494.315l2.306 1.794c.829.645.905 1.87.163 2.611l-1.034 1.034c-.74.74-1.846 1.065-2.877.702a18.634 18.634 0 0 1-7.01-4.42 18.634 18.634 0 0 1-4.42-7.009c-.362-1.03-.037-2.137.703-2.877L1.885.511z"/>
                                </svg> <span className="fw-bold">Номер телефона</span></p>
                            <p className="lhd px-2"> +996 998 989 989</p>

                            <p className="pt-2">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor"
                                     className="bi bi-envelope" viewBox="0 0 16 16">
                                    <path
                                        d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4Zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1H2Zm13 2.383-4.708 2.825L15 11.105V5.383Zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741ZM1 11.105l4.708-2.897L1 5.383v5.722Z"/>
                                </svg> <span className="fw-bold">E-mail</span></p>
                            <p className="lhd px-2"> tekavndo@gmail.com</p>

                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
    )
}

export default Contact