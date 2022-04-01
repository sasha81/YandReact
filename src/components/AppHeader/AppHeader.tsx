import { Logo,BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css'

const AppHeader = ()=>{
    return (
        <header >
            <nav className={styles.burgerHeader}>
                <div className={styles.smallFlexContainer} >
                    <BurgerIcon type="primary" />
                   
                     <div  className="p-2">
                        <p className="text text_type_main-default"> Конструктор</p>
                     </div>
                </div>
                <div className={styles.smallFlexContainer}>
                    <ListIcon type="primary" />
                   
                    <div  className="p-2">
                       <p className="text text_type_main-default text_color_inactive"> Лента заказов</p>
                    </div>
                </div>  
                <Logo/>
                <div className={styles.smallFlexContainer}>
                    <ProfileIcon type="primary" />
                   
                    <div  className="p-2">
                      <p className="text text_type_main-default"> Личный кабинет</p>
                    </div>
                </div>
            </nav>


        </header>
    )

}

export default AppHeader;