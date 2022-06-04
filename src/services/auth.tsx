import { useContext, useState, createContext ,useMemo} from 'react';
import { loginRequest, getUserRequest,registerUser, logOut, updateUser as updateUser1 } from './apis';

import {checkResponse} from '../services/actions/constructorThunks';
import {getData} from 'utils/fetch';

import {burgerUrl as URL} from 'configs/urls';
import {bareConfig} from 'utils/fetch';
import {IUserResponseBody, IForm, IUser} from 'components/Interfaces'
// const mySingleton =(function(){
//   const instance=null;

//   return {
//     getInstance: function(){
//       if(!instance){
//         return useProvideAuth();
//       }
//       else{
//         return instance;
//       }
//     }
//   }

// })()

const AuthContext = createContext<any>(undefined);

export function ProvideAuth({ children }) {
  const auth = useProvideAuth();
  return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
} 

export function useProvideAuth() {
    const [user, setUser] = useState<IUser | null>(null);
    const [visited, setVisitedObject] = useState<Object>({});
  
    const getUser = async () => {
      return await getUserRequest()
        .then(checkResponse)
        .then(data => {
          if (data.success) {
            setUser({ ...data.user });
          }
          return data.success;
        });
    };
  
  
    const signIn = async (form: IForm, cb:()=>void): Promise<void> => {
      const data = await getData<IUserResponseBody>('POST',URL+'/auth/login',form,bareConfig)
        .then(data => data);
        if(data.accessToken){
          window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
          window.localStorage.setItem('refreshToken',data.refreshToken);

        }

      if (data.success) {
        setUser({ ...data.user});
        cb()
      }
    };
  
    const register = async (form: IForm)=>{
      const data = await getData<IUserResponseBody>('POST',URL+'/auth/register',form,bareConfig)       
        .then(data => data);
        if(data.accessToken){
          window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
          window.localStorage.setItem('refreshToken',data.refreshToken);

        }
  
      if (data.success) {
        setUser({ ...data.user });
      }
    }

    const updateUser = async (form: IForm)=>{
      const data = await  getData<IUserResponseBody>('PATCH',URL+'/auth/user',form,bareConfig, window.localStorage.getItem('accessToken'))
      .then(checkResponse)
      .then(data => data)
      .catch(e=>{
        //TODO: handle error
      });
   

    if (data.success) {
      setUser({ ...data.user });
    }
    }

    const signOut = async cb => {
      await logOut();
      window.localStorage.removeItem('accessToken');
      window.localStorage.removeItem('refreshToken');
        setUser(null);
        cb();
     
    };

    const setVisited = (field:string)=>{
      setVisitedObject(prev=>{
        let result={};
        result[field]=true;
        return {...prev,...result};
      })
    }


    return {
      user,
      visited,
      setVisited,
      getUser,
      register,
      updateUser,
      signIn,
      signOut
    }
  }
  export function useAuth() {
    return useContext(AuthContext);
  }