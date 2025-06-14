import { REGISTER_FAIL, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from "../types/authType";
import { REGISTER_SUCCESS} from "../types/authType";
import { SUCCESS_MESSAGE_CLEAR } from "../types/authType";
import { ERROR_CLEAR } from "../types/authType";
import { jwtDecode } from 'jwt-decode';
const authState = {
    loading : true,
    authenticate : false,
    error : '',
    successMessage : '',
    myInfo : ''
}

const tokenDecode = (token) => {
    const tokenDecoded = jwtDecode(token);
    const expTime = new Date(tokenDecoded.exp * 1000);
    if (new Date() > expTime) {
        return null;
    }
  
    return tokenDecoded;
}

const getToken = localStorage.getItem('authToken');
if(getToken){
    const getInfo = tokenDecode(getToken);
    if(getInfo){
        authState.authenticate = true;
        authState.myInfo = getInfo;
        authState.loading = false;
    }
}
console.log(getToken);

export const authReducer = (state = authState, action) => {
    const { type, payload } = action;

    if (type === REGISTER_FAIL || type === USER_LOGIN_FAIL) {
        return {
            ...state,
            loading: true,
            authenticate: false,
            error: payload.error,
            myInfo: '' 
        }
    }

    if (type === REGISTER_SUCCESS || type === USER_LOGIN_SUCCESS) {
        const myInfo = tokenDecode(payload.token);
        return {
            ...state,
            loading: false,
            authenticate: true,
            error: '',
            successMessage: payload.successMessage,
            myInfo: myInfo
        }
    }


    if (type === SUCCESS_MESSAGE_CLEAR) {
        return {
            ...state,
            successMessage: ''
        }
    }

    if (type === ERROR_CLEAR) {
        return {
            ...state,
            error: ''
        }
    }
    
    return state;
}