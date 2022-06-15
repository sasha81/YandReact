import React, { useState } from 'react'
import { useDispatch } from 'services/store'

import { Input, Button } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../hooks/customForms'
import styles from './Profile.module.css';
import commonStyles from './CommonStyles.module.css';
import {Switch, useHistory, useLocation,useRouteMatch } from 'react-router-dom';

import { updateUserSec, signOut } from '../services/actions/securityThunk'
import { ProtectedRoute } from 'components/ProtectedRoute/ProtectedRoute';
import OrderHistory from './OrderHistory';

function Profile() {
    const {path,url} = useRouteMatch()
    const email = useFormField();
    const login = useFormField();
    const password = useFormField();
    const dispatch = useDispatch()

    const history = useHistory();
    const location = useLocation();
    const currentPath = location.pathname.slice();

    const [isPwdHidden, hidePwd] = useState<boolean>(false);

    const onIconClick = () => {
        hidePwd(prev => !prev)
    }

    const handleSubmit = (e: React.FormEvent) => {

        e.preventDefault();
        dispatch(updateUserSec({ email: email.value, name: login.value, password: password.value }))

    };


    const getPwd = (pwd: string, isPwdHidden: boolean): string => {
        if (isPwdHidden) return Array.from(pwd).map(ch => '*').join('');
        else return pwd;
    }

    const handleLogout = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(signOut(() => history.replace({ pathname: '/login', state: { from: location } })))

    }
    const handleHistory = (e: React.FormEvent) => {
        e.preventDefault();
        history.replace({ pathname: `${url}/orders`, state: { from: location } })
    }

    const handleProfile = (e: React.FormEvent) => {
        e.preventDefault();
        history.replace({ pathname: `${url}`, state: { from: location } })
    }

    return (
        <div className={styles.wrapper}>
            <div className={styles.actions}>
                <div className={commonStyles.commonUpperPadding}></div>
                <p className={`text text_type_main-medium mt-8 ${!(currentPath === '/profile') ? 'text_color_inactive' : ''}`}  onClick={handleProfile}>Профиль</p>
                <p className={`text text_type_main-medium mt-8 ${!(currentPath === '/profile/orders') ? 'text_color_inactive' : ''}`} onClick={handleHistory}>История Заказов</p>
                <p className="text text_type_main-medium mt-8 text_color_inactive" onClick={handleLogout}>Выход</p>
                <p className="text text_type_main-small mt-20">В этом разделе вы можете изменить свои персональные данные</p>

            </div>
            <div className={styles.formContainer}>
            <Switch>
            <ProtectedRoute exact={true} path={`${path}`}>
            <form className={styles.formContainer}  onSubmit={handleSubmit}>

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
                        value={getPwd(password.value, isPwdHidden)}
                        name={'password'}
                        error={false}
                        onIconClick={onIconClick}
                        errorText={'Ошибка'}
                        size={'default'}
                    />
                </div>
                <div className="mt-8">
                    <Button htmlType="submit" type="primary" size="small"  >
                        Сохранить
                    </Button>
                </div>
            </form>
            </ProtectedRoute>
            <ProtectedRoute path={`${path}/orders`} exact={true}>
                     <OrderHistory />
            </ProtectedRoute>

            </Switch>
            {/* <ProtectedRoute path={`${path}/orders/:id`} exact={true}>
                      <FullOrderDetails  />
           </ProtectedRoute> */}
</div>
        </div>

    )
}

export default Profile
