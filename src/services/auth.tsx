import { useContext, useState, createContext ,useMemo} from 'react';
import { loginRequest, getUserRequest,registerUser, logOut, updateUser } from './apis';
import { setCookie } from './cookies';
import {checkResponse} from '../services/actions/constructorThunks'

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
    const [user, setUser] = useState<Object | null>(null);
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
  
    const signIn = async (form, cb) => {
      const data = await loginRequest(form)
        .then(checkResponse)
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
  
    const register = async form=>{
      const data = await registerUser(form)
        .then(checkResponse)
        .then(data => data);
        if(data.accessToken){
          window.localStorage.setItem('accessToken',data.accessToken.split('Bearer ')[1]);
          window.localStorage.setItem('refreshToken',data.refreshToken);

        }
  
      if (data.success) {
        setUser({ ...data.user });
      }
    }

    const updateUser = async (form)=>{
      const data = await updateUser(form)
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