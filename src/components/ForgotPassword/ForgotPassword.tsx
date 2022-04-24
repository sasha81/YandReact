import React from 'react';
import {Link} from 'react-router-dom'
import { useState } from "react";
import useFormField from '../../utils/customForms';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import styles from '../CommonStyles.module.css';

function ForgotPassword() {   
    const email = useFormField();

   
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  // console.log(name.value, password.value);
  };

  
    return (
        <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
                 <Logo/>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Восстановление пароля</p></div>

             <form onSubmit={handleSubmit}>
             
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
                <div className="ml-20">
                    <Button type="primary" size="small" onClick={handleSubmit} >
                        Восстановить
                    </Button>
                </div>    

            </form>
            <div className={styles.smallHorizontalContainerNoWrap}>
                <p className="text text_type_main-small">
                    Вспомнили пароль?
                </p>
                    <Link to={'/login'}>Войти</Link>
                </div>    

            
        </div>
        </div>
    )
}

export default ForgotPassword
