import {SUBMIT} from "./type";


const initialState = {
    submit: {
        name: "",
        family: "",
        patronymic: "",
        fio: "",
        email: "",
        date: "",
        tel: "",
    }
}

export const submitReducer = (state = initialState, action) => {
    switch (action.type){
        case SUBMIT:
            return {
                ...state,
                submit: {
                    name: action.data.name,
                    family: action.data.family,
                    patronymic: action.data.patronymic,
                    fio: action.data.fio,
                    email: action.data.email,
                    date: action.data.date,
                    tel: action.data.tel
                }
            }
        default:
            return state;
    }
}