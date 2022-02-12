import {CONTACTS, GET_GROUPS, ID_POST, NEWS, RESULT_SEARCH, SEARCH} from "./type";



const initialState = {
    news: [],
    groups: [],
    contact: {
        name: "",
        email: "",
        phone: "",
        information: ""
    },
    user: [],
    resultUser: []
}

export const NewsReducer = (state = initialState, action) => {
    switch (action.type){
        case NEWS:
            return {
                ...state,
                news: action.jsonData
            }
        case GET_GROUPS:
            return {
                ...state,
                groups: action.jsonGroups
            }
        case CONTACTS:
            return {
                ...state,
                contact: {
                    name: action.data.name,
                    email: action.data.email,
                    phone: action.data.phone,
                    information: action.data.information
        }
            }
        case SEARCH:{
            return {
                ...state,
                user: action.jsonGroups
            }
        }
        case RESULT_SEARCH:

            return {
                ...state,
                resultUser: action.data
            }
        default:
            return state;
    }
}