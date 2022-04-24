import React from 'react';
import { useState } from "react";
import {Link} from 'react-router-dom'
import styles from '../CommonStyles.module.css';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'

function Register() {


    const name = useFormField();
    const login = useFormField();
    const password = useFormField();

    const [isPwdHidden, hidePwd] = useState<boolean>(false);

    const onIconClick = () => {
        hidePwd(prev=>!prev)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   console.log(name.value, password.value);
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
                    placeholder={'username'}
                    {...name}
                   
                    value={name.value}
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
                   
                    value={name.value}
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
                    <Link to={'/login'}>Войти</Link>
                </div>      
           
            
        </div>
        </div>
    )
}

export default Register
