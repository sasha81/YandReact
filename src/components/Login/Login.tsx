import React from 'react';
import { useState } from "react";
import {Link} from 'react-router-dom';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styles from '../CommonStyles.module.css';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'

function Login() {
   
 const history = useHistory();

    const name = useFormField();
    const password = useFormField();

    const [isPwdHidden, hidePwd] = useState<boolean>(false);

    const onIconClick = () => {
        hidePwd(prev=>!prev)
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    history.replace({pathname:'/'})
   //console.log(name.value, password.value);
  };

  const getPwd = (pwd: string, isPwdHidden: boolean):string =>{
    if(isPwdHidden) return Array.from(pwd).map(ch=>'*').join('');
    else return pwd;
  }

  
    return (
        <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
              <div className="mb-6 mt-10"><Logo/></div>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Вход</p></div>

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
                /></div>
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
                        Войти
                    </Button>
                </div>    

           
            <div className={`${styles.smallHorizontalContainerNoWrap} mt-8`}>
                <p className="text text_type_main-small">
                    Вы - новый пользователь?
                </p>
                    <Link to={'/register'}>Зарегестрироваться</Link>
                </div>  

                <div className={styles.smallHorizontalContainerNoWrap}>
                <p className="text text_type_main-small">
                    Забыли пароль?
                </p>
                    <Link to={'/forgot-password'}>Восстановить пароль</Link>
                </div>      

            
        </div>
        </div>
    )
}

export default Login
