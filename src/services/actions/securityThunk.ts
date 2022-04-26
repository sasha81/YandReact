import {
   
    UPDATE_USER,
    UPDATE_VISIT,
    RESET_VISITS
  } from './constructor';
  import { loginRequest, registerUser, logOut, updateUser } from '../apis';


  export const signIn = (form, cb) =>  (dispatch)=> {
    loginRequest(form)
      .then(checkResponse)
      .then(data =>{
        if(data.accessToken){
            window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
            window.localStorage.setItem('refreshToken',data.refreshToken);
    
          }
    
        if (data.success) {
          dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
          cb()
        }
      } );
      
  };

  export const register =  (form,cb )=>dispatch=>{
    registerUser(form)
      .then(checkResponse)
      .then(data =>{ if(data.accessToken){
        window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
        window.localStorage.setItem('refreshToken',data.refreshToken);

      }

    if (data.success) {
        dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
        cb()
    }} );
     
  }

  export const updateUserSec =  (form)=>dispatch=>{
    updateUser(form)
    .then(checkResponse)
    .then(data => {if (data.success) {
        dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
      }})
    .catch(e=>{
      //TODO: handle error
    });
 

  
  }

  export const signOut = cb =>dispatch=> {
    logOut()
    .then(res=>{
      window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    dispatch(actUponWithNull(UPDATE_USER));
    dispatch(actUpon(RESET_VISITS))
      cb()})
    
   
  };

  export const setVisited = (field:string)=>dispatch=>{
      dispatch(actUponWithPayload(UPDATE_VISIT,field))
  
  }


  export const checkResponse=(response )=>{
    if (response.ok) {
      return response.json();
    }
      return Promise.reject(`Ошибка ${response.status}`);
  }

  export const actUponWithNull =(actionType:string)=>{
    return {
      type:actionType,
      payload: null
    }
  } 
  
  export const actUponWithPayload = (actionType:string,actPayload:any)=>{
    return {
      type:actionType,
      payload:actPayload
    }
  }
  
  export const actUpon=(actionType:string)=>{
  
    return {type:actionType}  
  }