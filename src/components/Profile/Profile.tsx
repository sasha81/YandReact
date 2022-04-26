import React, {useState} from 'react'
import {useDispatch} from 'react-redux'

import { Input, Button} from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'
import styles from './Profile.module.css';
import commonStyles from '../CommonStyles.module.css';
import { useHistory, useLocation } from 'react-router-dom';

import {updateUserSec, signOut} from '../../services/actions/securityThunk'
function Profile() {
        const email = useFormField();
        const login = useFormField();
        const password = useFormField();
        const dispatch = useDispatch()

        const history = useHistory();
        const location = useLocation();
        const currentPath = location.pathname.slice();
     
        const [isPwdHidden, hidePwd] = useState<boolean>(false);

        const onIconClick = () => {
            hidePwd(prev=>!prev)
      }
   
      const handleSubmit = (e: React.FormEvent) => {
    
        e.preventDefault();
        dispatch(updateUserSec({email:email.value, name:login.value,password:password.value}))       
      
      };

    
      const getPwd = (pwd: string, isPwdHidden: boolean):string =>{
        if(isPwdHidden) return Array.from(pwd).map(ch=>'*').join('');
        else return pwd;
      }

      const handleLogout = (e) =>{
          e.preventDefault();
        dispatch(signOut(()=>history.replace({pathname:'/login', state:{from:currentPath}})))

      }

    return (
        <div className = {styles.wrapper}>
            <div className = {styles.actions}>
                <div className={commonStyles.commonUpperPadding}></div>
                <p className="text text_type_main-medium mt-8">Профиль</p>
                <p className="text text_type_main-medium mt-8">История Заказов</p>
                <p className="text text_type_main-medium mt-8" onClick={handleLogout}>Выход</p>
                <p className="text text_type_main-small mt-20">В этом разделе вы можете изменить свои персональные данные</p>

            </div>
            <div className = {styles.form}>
            <div className={commonStyles.commonUpperPadding}></div>
            <div className="mt-8">
                <Input
                    type={'text'}
                    placeholder={'name'}
                    {...email}
                    icon={'EditIcon'}
                    value={email.value}
                    name={'name'}
                    error={false}                 
                    errorText={'Ошибка'}
                    size={'default'}
                /></div>
            <div className="mt-8">
                <Input
                    type={'text'}
                    placeholder={'login'}
                    {...login}
                   icon={'EditIcon'}
                    value={login.value}
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
                    icon={'EditIcon'}
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
                        Сохранить
                    </Button>
                </div>    
            </div>
        </div>
    )
}

export default Profile
