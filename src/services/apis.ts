import {burgerUrl as URL} from '../configs/urls';





export const resetPassword = async (form) =>{
  return await fetch(URL+'/password-reset/reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
}


export const forgotPassword = async (form) =>{
  return await fetch(URL+'/password-reset', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
}


export const registerUser = async (form)=>{
  return await fetch(URL+'/auth/register', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
}

export const logOut = async () =>{
  await fetch(URL+'/auth/logout', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token:window.localStorage.getItem('refreshToken')})
  });
}
export const updateUser = async (form)=>{
  return await fetch(URL+'/auth/user', {
    method: 'PATCH',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + window.localStorage.getItem('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
}


export const refreshToken = async ()=>{
  return await fetch(URL+'/auth/token', {
    method: 'POST ',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify({token:window.localStorage.getItem('refreshToken')})
  });
}

export const getUserRequest = async () =>
  await fetch(URL+'/auth/user', {
    method: 'GET',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + window.localStorage.getItem('accessToken')
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer'
  });

export const loginRequest = async form => {
  return await fetch(URL+'/auth/login', {
    method: 'POST',
    mode: 'cors',
    cache: 'no-cache',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow',
    referrerPolicy: 'no-referrer',
    body: JSON.stringify(form)
  });
};
// export const deserializeQuery = (query, noQuestionMark = false) => {
//     const pairs = (noQuestionMark ? query : query.substring(1)).split('&');
//     const array = pairs.map(elem => elem.split('='));
//     return Object.fromEntries(array);
//   };
  
//   export const serializeQuery = queryParams =>
//     Object.entries(queryParams).reduce((acc, [key, value], index, array) => {
//       if (typeof value === 'undefined') {
//         return acc;
//       }
//       const postfix = index === array.length - 1 ? '' : '&';
//       return `${acc}${encodeURIComponent(key)}=${encodeURIComponent(value)}${postfix}`;
//     }, '?');
  