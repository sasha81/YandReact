import React from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Link, useHistory,useLocation} from 'react-router-dom'
import { useState , useEffect} from "react";
import useFormField from '../../utils/customForms';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../CommonStyles.module.css';
import {forgotPassword} from '../../services/apis';
import {checkResponse} from '../../services/actions/constructorThunks';
import {setVisited } from '../../services/actions/securityThunk'
//import { useAuth } from '../../services/auth';

function ForgotPassword() {   

    const email = useFormField();
    const history = useHistory();
const location = useLocation();
const currentPath = location.pathname.slice();
const dispatch = useDispatch();
  //  let { getUser, ...auth } = useAuth();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(setVisited('forgot_password'))
   // auth.setVisited('forgot_email_entered');
  // console.log(name.value, password.value);
  forgotPassword({email:email.value})
  .then(checkResponse)
  .then(data=>{
      if(data.success) history.replace({pathname:'/reset-password',state:{from:currentPath}})
     else{
         //TODO: handle error
     }
  })
  .catch(e=>{
      //TODO: error handling
  })

   
  };
  useEffect(()=>{
   // dispatch(setVisited('forgot_password'))
  },[])


    return (
        <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
                 <Logo/>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Восстановление пароля</p></div>

           
             <div className="mt-8">
                <Input
                    type={'text'}
                    placeholder={'укажите e-mail'}
                    {...email}
                  
                    value={email.value}
                    name={'password'}
                    error={false}                   
                   
                    errorText={'Ошибка'}
                    size={'default'}
                />
                </div>
                <div className="ml-0 mt-8">
                    <Button type="primary" size="small" onClick={handleSubmit} >
                        Восстановить
                    </Button>
                </div>    

           
            <div className={styles.smallHorizontalContainerNoWrap}>
                <p className="text text_type_main-small">
                    Вспомнили пароль?
                </p>
                    <Link to={{pathname:'/login',state:{from:currentPath}}} >Войти</Link>
                </div>    

            
        </div>
        </div>
    )
}

export default ForgotPassword
