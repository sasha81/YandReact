import React, {useState} from 'react'
import {Link} from 'react-router-dom';
import { Input, Logo, Button,EditIcon} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'
import styles from './Profile.module.css';

function Profile() {
        const name = useFormField();
        const login = useFormField();
        const password = useFormField();

        const [isPwdHidden, hidePwd] = useState<boolean>(false);

        const onIconClick = () => {
            hidePwd(prev=>!prev)
      }
   
    
      const getPwd = (pwd: string, isPwdHidden: boolean):string =>{
        if(isPwdHidden) return Array.from(pwd).map(ch=>'*').join('');
        else return pwd;
      }
    return (
        <div className = {styles.wrapper}>
            <div className = {styles.actions}>
                <p className="text text_type_main-medium">Профиль</p>
                <p className="text text_type_main-medium">История Заказов</p>
                <p className="text text_type_main-medium">Выход</p>

            </div>
            <div className = {styles.form}>
                <Input
                    type={'text'}
                    placeholder={'name'}
                    {...name}
                    icon={'EditIcon'}
                    value={name.value}
                    name={'name'}
                    error={false}                 
                    errorText={'Ошибка'}
                    size={'default'}
                />
            
                <Input
                    type={'text'}
                    placeholder={'login'}
                    {...login}
                   icon={'EditIcon'}
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
                    icon={'EditIcon'}
                    value={getPwd(password.value,isPwdHidden)}
                    name={'password'}
                    error={false}                   
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                
            </div>
        </div>
    )
}

export default Profile
