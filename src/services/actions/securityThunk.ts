import {
   
    UPDATE_USER,
    UPDATE_VISIT,
    RESET_VISITS
  } from './constructor';
  import { logOut } from '../apis';
  import {getData,bareConfig} from 'utils/fetch';
  import {burgerUrl as URL} from 'configs/urls';
  import {IUserResponseBody, IForm} from 'components/Interfaces'

  export const signIn = (form:IForm, cb:()=>void,errCb=(e)=>{}) =>  (dispatch)=> {
    // loginRequest(form)
    //   .then(checkResponse)
    getData<IUserResponseBody>('POST',URL+'/auth/login',form,bareConfig)
      .then(data =>{
        if(data.accessToken){
            window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
            window.localStorage.setItem('refreshToken',data.refreshToken);
    
          }
    
        if (data.success) {
          dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
          cb()
        }
      } )
      .catch(e=>{
        errCb(e)
        //TODO: handle error
      });
      
  };

  export const register =  (form:IForm,cb:()=>void,errCb=(e)=>{} )=>dispatch=>{
    getData<IUserResponseBody>('POST',URL+'/auth/register',form,bareConfig)
      .then(data =>{ if(data.accessToken){
        window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
        window.localStorage.setItem('refreshToken',data.refreshToken);

      }

    if (data.success) {
        dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
        cb()
    }} )
    .catch(e=>{
      //TODO handle error
      errCb(e)
    });
     
  }

  export const updateUserSec =  (form:IForm,errCb=(e)=>{})=>dispatch=>{
    getData<IUserResponseBody>('PATCH',URL+'/auth/user',form,bareConfig, window.localStorage.getItem('accessToken'))
    .then(data => {if (data.success) {
        dispatch(actUponWithPayload(UPDATE_USER,{ ...data.user}));
      }})
    .catch(e=>{
      //TODO: handle error
      errCb(e)
    });
 

  
  }

  export const signOut = (cb:()=>void,errCb=(e)=>{} )=>dispatch=> {
    logOut()
    .then(res=>{
      window.localStorage.removeItem('accessToken');
    window.localStorage.removeItem('refreshToken');
    dispatch(actUponWithNull(UPDATE_USER));
    dispatch(actUpon(RESET_VISITS))
      cb()})
    .catch(e=>{
      errCb(e)
    })
   
  };

  export const loginUserFromToken = (accessToken :string | null)=>dispatch=>{
    if(accessToken==null) return;  
    const isExpired = isTokenExpired(accessToken);
      const data =parseJwt(accessToken);
      if(!isExpired && data) {
        dispatch(actUponWithPayload(UPDATE_USER,data));
      }
  }

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

  export function isTokenExpired(token:string):boolean {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split("")
        .map(function (c) {
          return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join("")
    );
  
    const { exp } = JSON.parse(jsonPayload);
    const expired = Date.now() >= exp * 1000
    return expired
  }

  function parseJwt (token) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));

    return JSON.parse(jsonPayload);
};