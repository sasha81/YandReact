import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useHistory, useLocation } from 'react-router-dom'
import { useEffect } from "react";
import useFormField from '../hooks/customForms';
import { Input, Logo, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './CommonStyles.module.css';
import { forgotPassword } from '../services/apis';
import { checkResponse } from '../services/actions/constructorThunks';
import { setVisited } from '../services/actions/securityThunk'


function ForgotPassword() {

    const email = useFormField();
    const history = useHistory();
    const location = useLocation();
    const currentPath = location.pathname.slice();
    const dispatch = useDispatch();


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(setVisited('forgot_password'))

        forgotPassword({ email: email.value })
            .then(checkResponse)
            .then(data => {
                if (data.success) history.replace({ pathname: '/reset-password', state: { from: location , forgotPassword:true} })
                else {
                    //TODO: handle error
                }
            })
            .catch(e => {
                //TODO: error handling
            })


    };
    useEffect(() => {
        // dispatch(setVisited('forgot_password'))
    }, [])


    return (
        <form className={styles.outerWrapper} onSubmit={handleSubmit}>

            <div className={styles.wrapper}>
                <Logo />
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
                    <Button htmlType="submit" type="primary" size="small"  >
                        Восстановить
                    </Button>
                </div>



                <div className={`mt-6 ${styles.smallHorizontalContainerNoWrap}`}>
                    <p className="text text_type_main-small">
                        Вспомнили пароль?
                    </p>
                    <Link to={{ pathname: '/login', state: { from: currentPath } }} >Войти</Link>
                </div>


            </div>
        </form>
    )
}

export default ForgotPassword
