import { ConstructorElement, Button, CurrencyIcon,DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import styles from './BurgerConstructor.module.css';
import {IBareBurgerIngredient} from '../Interfaces';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
import { deleteIngredient,useIngredientContext,orderComplete} from '../../utils/contexts'


const getCost=(ingredients :IBareBurgerIngredient[] , bun:IBareBurgerIngredient | null):number=>{
  if(ingredients.length===0 && bun==null) return 0;
  return ingredients.reduce((accum, curr)=>{return accum+curr.price},0) + (bun? bun.price : 0);
}

export const BurgerConstructor = (): JSX.Element=>{

  const {ingredientContext, setIngredientContext} = useIngredientContext();


  const [modalData, setModalData] = useState<{'cost':number,'orderId': number | null, 'success': boolean} | null>(null);
  const modalClose =()=>{
    setModalData(null);
}



const cost = getCost(ingredientContext.ingredients, ingredientContext.bun);

const clickButton =(cost:number)=>()=>{
  const allIngredients=ingredientContext.ingredients.concat(ingredientContext.bun);

  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ ingredients: allIngredients })
};
fetch('https://norma.nomoreparties.space/api/orders', requestOptions)
    .then(response => response.json())
    .then(data => {
      
      setModalData({'cost':cost, 'orderId':data.order.number, 'success': data.success})
      orderComplete(allIngredients, setIngredientContext)
    })
    .catch(error=>{
      setModalData({'cost':cost, 'orderId':null, 'success': false})
    })
}
    return (
      <>
     
            {modalData && (<Modal  onClose={modalClose} >
                <OrderDetails total={modalData.cost} orderNumber={modalData.orderId} orderStatus={modalData.success}/>
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

