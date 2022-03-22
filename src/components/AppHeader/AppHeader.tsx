import { Logo } from '@ya.praktikum/react-developer-burger-ui-components';
import styles from './AppHeader.module.css'

const AppHeader = (props: any)=>{
    return (
        <header >
            <nav className={styles.burgerHeader}>
                <h3>
                    Builder
                </h3>
                <h3>
                    Orders
                </h3>   
                <Logo/>
                <h3>
                    User Account
                </h3>
            </nav>


        </header>
    )

}

export default AppHeader;