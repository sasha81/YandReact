import React from 'react';
import {useDispatch} from 'react-redux'
import { useState } from "react";
import {Link} from 'react-router-dom'
import styles from '../CommonStyles.module.css';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms';
import { useHistory, useLocation } from 'react-router-dom';
import {register} from '../../services/actions/securityThunk';


function Register() {

    const location = useLocation();
    const currentPath = location.pathname.slice();
    const history = useHistory();
    const email = useFormField();
    const login = useFormField();
    const password = useFormField();
  
    const [isPwdHidden, hidePwd] = useState<boolean>(false);
const dispatch = useDispatch();

    const onIconClick = () => {
        hidePwd(prev=>!prev)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(register({email:email.value, name:login.value,password:password.value},
         ()=>history.replace({pathname:'/profile', state:{from:location}})))
 
  };

  const getPwd = (pwd: string, isPwdHidden: boolean):string =>{
    if(isPwdHidden) return Array.from(pwd).map(ch=>'*').join('');
    else return pwd;
  }
    return (
        <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
        <div className="mb-6 mt-10"><Logo/></div>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Регистрация</p></div>

             <div className="mt-8">
                <Input
                    type={'text'}
                    placeholder={'email'}
                    {...email}
                   
                    value={email.value}
                    name={'name'}
                    error={false}                 
                    errorText={'Ошибка'}
                    size={'default'}
                />
                </div>
                <div className="mt-8">
                  <Input
                    type={'text'}
                    placeholder={'login'}
                    {...login}
                   
                    value={login.value}
                    name={'login'}
                    error={false}                 
                    errorText={'Ошибка'}
                    size={'default'}
                />
                 </div>
                <div className="mt-8">
                <Input
                    type={'text'}
                    placeholder={'password'}
                    {...password}
                    icon={isPwdHidden ? 'ShowIcon': 'HideIcon'}
                    value={getPwd(password.value,isPwdHidden)}
                    name={'password'}
                    error={false}                   
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                </div>
                <div className="mt-8">
                    <Button type="primary" size="small" onClick={handleSubmit} >
                        Зарегистрироваться
                    </Button>
                </div>    
                <div className={`${styles.smallHorizontalContainerNoWrap} mt-4`}>
                <p className="text text_type_main-small">
                    Уже зарегестрированы?
                </p>
                    <Link to={{pathname:'/login',state:{from:location}}}>Войти</Link>
                </div>      
           
            
        </div>
        </div>
    )
}

export default Register
