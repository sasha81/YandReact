import React from 'react';
import { Link } from 'react-router-dom'
import { useState } from "react";
import useFormField from '../hooks/customForms';
import { Input, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CommonStyles.module.css';
import { resetPassword } from '../services/apis';
import { checkResponse } from '../services/actions/constructorThunks';
import { register } from '../services/actions/securityThunk';
import { useDispatch, useSelector } from 'services/store';
import { useHistory, useLocation } from 'react-router-dom';

function ResetPassword() {

    const location = useLocation();
    const currentPath = location.pathname.slice();
    const history = useHistory();

    const token = useFormField();
    const password = useFormField();


    const [isPwdHidden, hidePwd] = useState<boolean>(false);
    const user = useSelector((state) => state.user) as any;
    const dispatch = useDispatch()
    const onIconClick = () => {
        hidePwd(prev => !prev)
    }
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        resetPassword({ password: password.value, token: token.value })
            .then(checkResponse)
            .then(data => {
                if (data.success) {
                    dispatch(register({ ...user, password: password.value },
                        () => history.replace({ pathname: '/profile', state: { from: currentPath } })))
                }
                else {
                    //TODO: handle error
                }
            })
            .catch(e => {
                //TODO: handle error
            })

    };

    const getPwd = (pwd: string, isPwdHidden: boolean): string => {
        if (isPwdHidden) return Array.from(pwd).map(ch => '*').join('');
        else return pwd;
    }

    return (
        <form className={styles.outerWrapper} onSubmit={handleSubmit}>

            <div className={styles.wrapper}>
                <Logo />
                <div className="mb-6 mt-10"><p className="text_type_main-large">Восстановление пароля</p></div>


                <div className="mt-8">
                    <Input
                        type={'text'}
                        placeholder={'token from email'}
                        {...token}

                        value={token.value}
                        name={'name'}
                        error={false}
                        errorText={'Ошибка'}
                        size={'default'}
                    /></div>
                <div className="mt-8">
                    <Input
                        type={'text'}
                        placeholder={'new password'}
                        {...password}
                        icon={isPwdHidden ? 'ShowIcon' : 'HideIcon'}
                        value={getPwd(password.value, isPwdHidden)}
                        name={'password'}
                        error={false}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className="mt-6">
                    <Button type="primary" size="small" htmlType="submit"  >
                        Сохранить
                    </Button>
                </div>

                <div className={`mt-6 ${styles.smallHorizontalContainerNoWrap}`}>
                    <p className="text text_type_main-small">
                        Вспомнили пароль?
                    </p>
                    <Link to={{ pathname: '/login', state: { from: currentPath } }}>Войти</Link>
                </div>



            </div>

        </form>
    )
}

export default ResetPassword
