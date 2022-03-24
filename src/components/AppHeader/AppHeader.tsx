import { Logo,BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css'

const AppHeader = (props: any)=>{
    return (
        <header >
            <nav className={styles.burgerHeader}>
                <div className={styles.smallFlexContainer} >
                    <BurgerIcon type="primary" />
                    <h3 className={styles.movedTenLeft}>
                        Конструктор
                    </h3>
                </div>
                <div className={styles.smallFlexContainer}>
                    <ListIcon type="primary" />
                    <h3 className={styles.movedTenLeft}>
                        Лента заказов
                    </h3> 
                </div>  
                <Logo/>
                <div className={styles.smallFlexContainer}>
                    <ProfileIcon type="primary" />
                    <h3 className={styles.movedTenLeft}>
                        Личный кабинет
                    </h3>
                </div>
            </nav>


        </header>
    )

}

export default AppHeader;