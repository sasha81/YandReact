import { ConstructorElement, Button, CurrencyIcon,DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

import styles from './BurgerConstructor.module.css';
import {IBareBurgerIngredient} from '../Interfaces'


interface IBurgerIngredients{
  bun:IBareBurgerIngredient | null,
  ingredients: IBareBurgerIngredient[],
  deleteIngredient:(ingredient:IBareBurgerIngredient)=>(()=>void),
  orderComplete: ()=>void
}
const getCost=(ingredients :IBareBurgerIngredient[] , bun:IBareBurgerIngredient | null):number=>{
  return ingredients.reduce((accum, curr)=>{return accum+curr.price},0) + (bun? bun.price : 0);
}

export const BurgerConstructor = (props: IBurgerIngredients): JSX.Element=>{
    return (
      <>
      <div className={styles.topPadding} />
        <div className={styles.ingredientContainer} >
          {props.bun && 
          (<div  style={{height: '80px'}}>            
           <ConstructorElement
                  
           type="top"
           isLocked={true}
           text={props.bun.name}
           price={props.bun.price}
           thumbnail={props.bun.image}
           handleClose={props.deleteIngredient(props.bun)}
         />
          </div>)
          }
          {props.ingredients.map((ingredient, index)=>{
              
                return(
                  <div key={index} style={{height: '80px'}}>
                     <DragIcon type="primary" />
                  <ConstructorElement
                  
                
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={props.deleteIngredient(ingredient)}
                />
                </div>
                )
            
              
          })}
       {props.bun && (
         <div  style={{height: '80px'}}>
           <ConstructorElement
                  
           type="bottom"
           isLocked={true}
           text={props.bun.name}
           price={props.bun.price}
           thumbnail={props.bun.image}
           handleClose={props.deleteIngredient(props.bun)}
         />
         </div>
       )
          }
           
      </div>
      <div className={styles.submitElement} >
                  <p className="text text_type_digits-medium">{getCost(props.ingredients, props.bun)}</p>
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

