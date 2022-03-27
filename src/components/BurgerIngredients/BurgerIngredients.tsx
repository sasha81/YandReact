import { ConstructorElement, Button, CurrencyIcon,DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerIngredients.module.css';
import {IBareBurgerIngredient} from '../Interfaces'


interface IBurgerIngredients{
  ingredients: IBareBurgerIngredient[],
  deleteIngredient:(ingredient:IBareBurgerIngredient)=>(()=>void),
  orderComplete: ()=>void
}


export const BurgerIngredients = (props: IBurgerIngredients): JSX.Element=>{
    return (
      <>
      <div className={styles.topPadding} />
        <div className={styles.ingredientContainer} >
          {props.ingredients.map((ing, index)=>{
              if(index===0){
                return (
                  <div key={index} style={{height: '80px'}}>
                     <DragIcon type="primary" />
                    <ConstructorElement
                    
                    type="top"
                    isLocked={false}
                    text={ing.name}
                    price={ing.price}
                    thumbnail={ing.image}
                    handleClose={props.deleteIngredient(ing)}
                  />
                </div>
                )
              }
              if(index===props.ingredients.length-1){
                return(
                  <div key={index} style={{height: '80px'}}>
                     <DragIcon type="primary" />
                  <ConstructorElement
                  
                  type="bottom"
                  isLocked={false}
                  text={ing.name}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={props.deleteIngredient(ing)}
                />
                </div>
                )
              }
              else{
                return(
                  <div key={index} style={{height: '80px'}}>
                     <DragIcon type="primary" />
                  <ConstructorElement
                  
                  text={ing.name}
                  isLocked={false}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={props.deleteIngredient(ing)}
                />
                </div>
                )
              }
          })}

           
      </div>
      <div className={styles.submitElement} >
                  <p className="text text_type_digits-medium">{props.ingredients.reduce((accum, curr)=>{return accum+curr.price},0)}</p>
                  <div className="p-2"><CurrencyIcon type="primary" /></div>

                  <div className="p-8">
                    <Button type="primary" size="medium" onClick={props.orderComplete}>
                        Оформить Заказ
                  </Button>
                </div>
      </div>   
      </>
    )
}

