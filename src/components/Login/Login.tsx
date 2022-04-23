import React from 'react'
import styles from '../CommonStyles.module.css';
import { Input, Logo, Button,HideIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import useFormField from '../../utils/customForms'

function Login() {
    const [value, setValue] = React.useState('value')
    const inputRef = React.useRef(null)

    const name = useFormField();
    const password = useFormField();

    const onIconClick = () => {
        // setTimeout(() => inputRef.current.focus() , 0)
        // alert('Icon Click Callback')
  }
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
   console.log(name.value, password.value);
  };


    return (
        <div className={styles.outerWrapper}>
        <div className={styles.wrapper}>
                 <Logo/>
             <div className="mb-6 mt-10"><p className="text_type_main-large">Вход</p></div>

             <form onSubmit={handleSubmit}>
                <Input
                    type={'text'}
                    placeholder={'username'}
                    {...name}
                   
                    value={name.value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <Input
                    type={'text'}
                    placeholder={'password'}
                    {...password}
                    icon={'HideIcon'}
                    value={password.value}
                    name={'name'}
                    error={false}
                    ref={inputRef}
                    onIconClick={onIconClick}
                    errorText={'Ошибка'}
                    size={'default'}
                />
                <div className="ml-20">
                    <Button type="primary" size="small" onClick={handleSubmit} >
                        Нажми на меня
                    </Button>
                </div>    

            </form>
            
        </div>
        </div>
    )
}

export default Login
