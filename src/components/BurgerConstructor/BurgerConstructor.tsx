import { ConstructorElement, Button, CurrencyIcon,DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import styles from './BurgerConstructor.module.css';
import {IBareBurgerIngredient} from '../Interfaces';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import {pickIngredient, deleteIngredient,useIngredientContext,orderComplete} from '../../utils/contexts'


interface IBurgerIngredients{
  // bun:IBareBurgerIngredient | null,
  // ingredients: IBareBurgerIngredient[],
  // deleteIngredient:(ingredient:IBareBurgerIngredient)=>(()=>void),
  // orderComplete: ()=>void
}
const getCost=(ingredients :IBareBurgerIngredient[] , bun:IBareBurgerIngredient | null):number=>{
  if(ingredients.length===0 && bun==null) return 0;
  return ingredients.reduce((accum, curr)=>{return accum+curr.price},0) + (bun? bun.price : 0);
}

export const BurgerConstructor = (): JSX.Element=>{

  const {ingredientContext, setIngredientContext} = useIngredientContext();


  const [modalData, setModalData] = useState<{'cost':number} | null>(null);
  const modalClose =()=>{
    setModalData(null);
}



const cost = getCost(ingredientContext.ingredients, ingredientContext.bun);

const clickButton =(cost:number)=>()=>{
  setModalData({'cost':cost})
}
    return (
      <>
     
            {modalData && (<Modal  onClose={modalClose} >
                <OrderDetails total={modalData.cost} orderNumber={'Идентификатор Вашего заказа'}/>
            </Modal>)

            }


      <div className={styles.topPadding} />
        <div  className={styles.ingredientContainer}>
          {ingredientContext.bun && 
          (<div  style={{height: '80px'}}>            
           <ConstructorElement
                  
           type="top"
           isLocked={true}
           text={ingredientContext.bun.name}
           price={ingredientContext.bun.price}
           thumbnail={ingredientContext.bun.image}
           handleClose={deleteIngredient(ingredientContext.bun,setIngredientContext)}
         />
          </div>)
          }
          <div className={styles.ingredientInnerContainer}>
          {ingredientContext.ingredients.map((ingredient, index)=>{
              
                return(
                  <div key={index} style={{height: '80px'}}>
                     <DragIcon type="primary" />
                  <ConstructorElement
                  
                
                  isLocked={false}
                  text={ingredient.name}
                  price={ingredient.price}
                  thumbnail={ingredient.image}
                  handleClose={deleteIngredient(ingredient,setIngredientContext)}
                />
                </div>
                )
            
              
          })}
          </div>
       {ingredientContext.bun && (
         <div  style={{height: '80px'}}>
           <ConstructorElement
                  
           type="bottom"
           isLocked={true}
           text={ingredientContext.bun.name}
           price={ingredientContext.bun.price}
           thumbnail={ingredientContext.bun.image}
           handleClose={deleteIngredient(ingredientContext.bun,setIngredientContext)}
         />
         </div>
       )
          }
           
      </div>
      <div className={styles.submitElement} >
                  <p className="text text_type_digits-medium">{cost}</p>
                  <div className="p-2"><CurrencyIcon type="primary" /></div>

                  <div className="p-8">
                    {/* <Button type="primary" size="medium" onClick={props.orderComplete}> */}
                    <Button type="primary" size="medium" onClick={clickButton(cost)}>
                        Оформить Заказ
                  </Button>
                </div>
      </div> 
     
      </>
    )
}

