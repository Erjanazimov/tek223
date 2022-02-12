import {
    ACCOUNTS_MODAL, CONTACTS,
    ENTRANCE_GET, GET_GROUPS,
    HANDLE_PERSONAL, ID_POST,
    IMAGES_GET,
    NEWS,
    REG_MODAL, RESULT_SEARCH, SEARCH, SEARCH_USERS,
    STUDENTS_POST,
    SUBMIT,
    VHOD_MODAL, WARN
} from "./type";
import {toast} from "react-toastify";

export const submitChange = (data) => {
    return{
        type: SUBMIT,
        data
    }
}

export const news = () => {
    return async dispatch => {
        try {
            const response = await fetch("http://zrozez.pythonanywhere.com/news/news/");
            const jsonData = await response.json();

            dispatch({
                type:NEWS,
                jsonData
            })
        }
        catch (err){
            localStorage.clear();
            toast.error("Зайди чуть поэже")
        }
    }
}

export const modal_accounts = (data) => {
    return{
        type: ACCOUNTS_MODAL,
        data
    }
}

export const reg_modal = (reg) => {
    return{
        type: REG_MODAL,
        reg
    }
}

export const vhod_modal = (vhod) => {
    return{
        type: VHOD_MODAL,
        vhod
    }
}

export const entrance_user = (user, reg) => {
    return async dispatch => {
        try {
            const response = await fetch("http://zrozez.pythonanywhere.com/accounts/accounts/");
            const jsonUser = await response.json();
            dispatch({
                type:ENTRANCE_GET,
                user,
                reg,
                jsonUser
            })
        }
        catch (err){
            localStorage.clear();
            alert("Перезагрузите сайт и войди на свой аккаунт занова");
            window.location.reload();
        }
    }
}

export const personalNewUser = (personal) => {
    return{
        type: HANDLE_PERSONAL,
        personal
    }
}

export const imagesGet = () => {
    return async dispatch => {
        try {
            const response = await fetch("http://zrozez.pythonanywhere.com/images/images/");
            const jsonImg = await response.json();
            dispatch({
                type: IMAGES_GET,
                jsonImg
            })
        }
        catch (err){
            toast.error("Ошибка")
        }
    }
}

export const submitStudents = (students) => {
    {
        let options = {
            method: "POST",
            headers:{
                "Content-Type": "application/json"
            },
            body: JSON.stringify(students)
        }
        fetch("http://zrozez.pythonanywhere.com/api/v1/students/", options)
            .then(response => {
                if(response.ok){
                    toast.success("Успешно отправлено заяка!");
                } else{
                    toast.error(`Ошибка при отправке. Код ошибки ${response.status}`)
                }
            })

    }
    return{
        type: STUDENTS_POST,
        students
    }
}


export const getGroups = () => {
    return async dispatch => {
        try {
            const response = await fetch("http://zrozez.pythonanywhere.com/api/v1/category/categories/");
            const jsonGroups = await response.json();
            dispatch({
                type: GET_GROUPS,
                jsonGroups
            })
        }
        catch (err){
            toast.error("Ошибка")
        }
    }
}

export const contactsData = (data) => {
    return{
        type: CONTACTS,
        data
    }
}

export const search = () => {
    return async dispatch => {
        try {
            const response = await fetch("http://zrozez.pythonanywhere.com/api/v1/students/");
            const jsonGroups = await response.json();
            dispatch({
                type: SEARCH,
                jsonGroups
            })
        }
        catch (err){
            toast.error("Ошибка")
        }
    }
}

export const userSearch = (user) => {
    return{
        type: SEARCH_USERS,
        user
    }
}

export const resultSearch = (data) => {
    return{
        type: RESULT_SEARCH,
        data
    }
}

export const warn_user = (id) => {

    let urlWarn = `http://zrozez.pythonanywhere.com/api/v1/students/${id}/teacher_reminder/`;

    fetch(urlWarn)
        .then(response => {
            if(response.ok){
                toast("Отправлено уведомление тренеру")
            } else {
                toast.error("Ошибка статутс: " + response.status)
            }
        })
    return{
        type: WARN
    }
}

