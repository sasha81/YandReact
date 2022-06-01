import { Logo, BurgerIcon, ListIcon, ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation } from 'react-router-dom';

import styles from './AppHeader.module.css'
import { goTo } from '../../utils/history';

const AppHeader = () => {

    const history = useHistory();
    const location = useLocation();
    //guaranteed clone of the pathname
    const currentPath = location.pathname.slice();
    const go = goTo(history);


    return (
        <header >
            <nav className={styles.burgerHeader}>

                <div className={styles.smallFlexContainer} onClick={() => go('/', currentPath)}>

                    <BurgerIcon type="primary" />

                    <div className="p-2">

                        <p className={`text text_type_main-default ${!(currentPath === '/') ? 'text_color_inactive' : ''}`}> Конструктор</p>

                    </div>
                </div>

                <div className={styles.smallFlexContainer} onClick={() => go('/feed', currentPath)}>
                    <ListIcon type="primary" />

                    <div className="p-2">
                        <p className="text text_type_main-default text_color_inactive"> Лента заказов</p>
                    </div>
                </div>

                <div className="mr-20 pl-4">
                    <Logo />
                </div>

                <div className={`${styles.smallFlexContainer} ml-30`} onClick={() => go('/profile', currentPath)}>
                    <ProfileIcon type="primary" />

                    <div className="p-2">
                        <p className={`text text_type_main-default ${!(currentPath === '/profile'
                            || currentPath === '/login'
                            || currentPath === '/forgot-password'
                            || currentPath === '/register'
                            || currentPath === '/reset-password'
                            || currentPath === '/profile/orders'
                        ) ? 'text_color_inactive' : ''}`}> Личный кабинет</p>
                    </div>
                </div>

            </nav>


        </header>
    )

}

export default AppHeader;