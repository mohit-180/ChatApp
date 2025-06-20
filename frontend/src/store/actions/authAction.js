import axios from 'axios';
import { REGISTER_FAIL, USER_LOGIN_FAIL, USER_LOGIN_SUCCESS } from '../types/authType';
import { REGISTER_SUCCESS } from '../types/authType';

export const userRegister = (data) => {
    return async (dispatch) => {
        try { 
            const response = await axios.post('/api/chatapp/user-register', data);
            localStorage.setItem('authToken', response.data.token);

            dispatch({
                type : REGISTER_SUCCESS,
                payload:{
                    successMessage: response.data.successMessage,
                    token : response.data.token
                }
            })
        } catch (error) {
           dispatch({
               type: REGISTER_FAIL,
               payload:{
                error : error.response.data.error.errorMessage
               }
           })
        }
    }
}

export const userLogin = (data) => {
    return async (dispatch) => {
        try { 
            const response = await axios.post('/api/chatapp/user-login', data);
            localStorage.setItem('authToken', response.data.token);

            dispatch({
                type : USER_LOGIN_SUCCESS,
                payload:{
                    successMessage: response.data.successMessage,
                    token : response.data.token
                }
            })
        } catch (error) {
           dispatch({
               type: USER_LOGIN_FAIL,
               payload:{
                error : error.response.data.error.errorMessage
               }
           })
        }
    }
}

export const userLogout = () => async(dispatch) => {
     try{
         const response = await axios.post('/api/chatapp/user-logout');
         if(response.data.success){
             localStorage.removeItem('authToken');
             dispatch({
                 type : 'LOGOUT_SUCCESS'
             })
         }

     }catch (error) {

     }
    } 