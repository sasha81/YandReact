import React from 'react';
import { useState } from "react";
import styles from '../CommonStyles.module.css';
import { Input, Logo, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'

function Login() {
   
 

    const name = useFormField();
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
                 <Logo/>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Вход</p></div>

             <form onSubmit={handleSubmit}>
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
                <div className="ml-20">
                    <Button type="primary" size="small" onClick={handleSubmit} >
                        Нажми на меня
                    </Button>
                </div>    

            </form>
            
        </div>
        </div>
    )
}

export default Login
