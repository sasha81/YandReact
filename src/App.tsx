import React from 'react';
import logo from './logo.svg';
import styles from './App.module.css';
import AppHeader from './components/AppHeader/AppHeader';
import BurgerConstructor from './components/BurgerConstructor/BurgerConstructor';
import BurgerIngredients from './components/BurgerIngredients/BurgerIngredients';

function App() {
  return (
    <div className={styles.App}>
      <div className={styles.headerBurger}> <AppHeader  /> </div>
     
      <div className={styles.constructorBurger}><BurgerConstructor  /></div>
      <div className={styles.ingredientsBurger}><BurgerIngredients /></div>
    </div>
  );
}

export default App;
