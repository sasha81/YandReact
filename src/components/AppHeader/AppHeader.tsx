import { Logo,BurgerIcon,ListIcon,ProfileIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import styles from './AppHeader.module.css'
import  {goTo} from '../../utils/history';

const AppHeader = ()=>{

    const history = useHistory();
    const go = goTo(history);

    return (
        <header >
            <nav className={styles.burgerHeader}>
              
                    <div className={styles.smallFlexContainer} onClick={()=>go('/')}>

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
                   
                    <div className="mr-20 pl-4">
                        <Logo/>
                        </div>
              
                    <div className={`${styles.smallFlexContainer} ml-30`}>
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