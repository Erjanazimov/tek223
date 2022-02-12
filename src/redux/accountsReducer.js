import {ACCOUNTS_MODAL, ENTRANCE_GET, HANDLE_PERSONAL, REG_MODAL, VHOD_MODAL} from "./type";


const initialState = {
    vhod: {
        username: "",
        password: ""
    },
    reg: {
        username: "",
        email: "",
        password: ""
    },
    jsonUser: [],
    accountsUser: {},
    newAccounts: {}
}

export const accountsReducer = (state = initialState, action) => {
    switch (action.type){
        case REG_MODAL:
            return {
                ...state,
                reg: {
                    username: action.reg.username,
                    email: action.reg.email,
                    password: action.reg.password
                }
            }
        case VHOD_MODAL:
            return {
                ...state,
                vhod: {
                    username: action.vhod.username,
                    password: action.vhod.password
                }
            }
        case ACCOUNTS_MODAL:{
            return {
                ...state,
                jsonUser: action.data
            }
        }
        case ENTRANCE_GET:
            let objUser = {}
            action.jsonUser.map(item => {
                if(item.username === action.user.username && item.password === action.user.password){
                    objUser.accounts = item
                    localStorage.setItem('test', JSON.stringify(item));
                }
            })
            if(action.reg === "reg"){
                localStorage.setItem('test', JSON.stringify(action.user));
                window.location.reload();
            } else if(action.reg === "vhod"){
                window.location.reload();
            }
            return {
                ...state,
                jsonUser: action.jsonUser,
                accountsUser: objUser.accounts,
                newAccounts: objUser.accounts
            }
        case HANDLE_PERSONAL:
            return {
                ...state,
                newAccounts: {
                    // id: action.personal.id,
                    username: action.personal.username,
                    email: action.personal.email,
                    password: action.personal.password
                }
            }

        default:
            return state;
    }
}