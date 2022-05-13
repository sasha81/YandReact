import {IFetchConfig, IForm} from 'components/Interfaces';


export const bareConfig: IFetchConfig ={
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
}


export const getConfig = (METHOD:string,form: IForm, bareConfig: IFetchConfig,accessToken?: string):IFetchConfig=>{
    const result = {
        ...bareConfig,
        method: METHOD,
      
        body: JSON.stringify(form)
    }

   if(accessToken && result.headers){
       result.headers['Authorization']='Bearer ' + accessToken
      return result 
    }
    else{
        return result
    }
}


export const getData = <T>(METHOD:string,url:string,form: IForm, bareConfig: IFetchConfig,accessToken: string |null=null): Promise<T> =>{
    const config =accessToken ? getConfig(METHOD,form, bareConfig,accessToken) : getConfig(METHOD,form, bareConfig);
    return fetch(url,config).then((response:Response)=>{
        if (response.ok) {
            return response.json();
          }
            return Promise.reject(`Ошибка ${response.status}`);
             }
        )
}

