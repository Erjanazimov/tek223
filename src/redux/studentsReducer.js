import {IMAGES_GET, SEARCH_USERS} from "./type";


const initialState = {
    images: [],
    user: [],
    handleUser: {
        name: "",
        family: ""
    }
}

export const studentReducer = (state = initialState, action) => {
    switch (action.type){
        case IMAGES_GET:

            const images = action.jsonImg.map(item => {
                return {
                    original: item.images,
                    thumbnail: item.images
                }
            })

            return {
                ...state,
                images: images
            }
        case SEARCH_USERS:
            return {
                handleUser: {
                    name: action.user.name,
                    family: action.user.family
                }
            }

        default:
            return state;
    }
}