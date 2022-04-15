import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useState } from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import { IBareBurgerIngredient,IBurgerIngredientDrop } from '../Interfaces';
import Modal from '../Modal/Modal';
import OrderDetails from '../OrderDetails/OrderDetails';
// import {  useIngredientContext, orderComplete
//   //,pickIngredient
//  // ,deleteIngredient 
// } from '../../utils/contexts';

import {pickIngredient, switchIngredients,deleteIngredient,resetOrderDetails,sendOrderDetails} from '../../services/reducers/constructorThunks' 

import { burgerUrl } from '../../configs/urls';
import { WithDrop,WithDrag} from '../../utils/dndHOCs';
import {RootState} from '../../index'

const getCost = (ingredients: IBareBurgerIngredient[], bun: IBareBurgerIngredient | null): number => {
  if (ingredients.length === 0 && bun == null) return 0;
  return ingredients.reduce((accum, curr) => { return accum + curr.price }, 0) + (bun ? bun.price : 0);
}

export const BurgerConstructor = (): JSX.Element => {

  //const { ingredientContext, setIngredientContext } = useIngredientContext();
  const [fetchError, setFetchError] = useState(false);

  const dispatch = useDispatch();

      const {storeIngredients, storeBun,storeOrderDetails} = useSelector((store:RootState)=>({
        storeIngredients:store.ingredients,
        storeBun:store.bun,
        storeOrderDetails:store.orderDetails
      }))    

  const [, drop] = useDrop({
    accept:'ingredient',
   
    drop(ingredient:any){

      dispatch(pickIngredient(ingredient,storeBun))
    }
  })


 // const [modalData, setModalData] = useState<{ 'cost': number, 'orderId': number | null, 'success': boolean } | null>(null);
  const modalClose = () => {
    dispatch(resetOrderDetails())
    
  }



  const cost = getCost(storeIngredients, storeBun);

  const clickButton = (cost: number) => () => {
    const allIngredients = storeIngredients.concat(storeBun);

    dispatch(sendOrderDetails(cost,setFetchError,allIngredients))


    // const requestOptions = {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ ingredients: allIngredients })
    // };
    // fetch(burgerUrl + '/orders', requestOptions)
    //   .then(response => {
    //     if (!response.ok) {
    //       throw Error("server error")
    //     }

    //     return response.json()
    //   })
    //   .then(data => {

    //     setModalData({ 'cost': cost, 'orderId': data.order.number, 'success': data.success })
    //     setFetchError(false);
    //     orderComplete(allIngredients, setIngredientContext)
    //   })
    //   .catch(error => {
    //     if (error.message === "server error") {
    //       setModalData({ 'cost': cost, 'orderId': null, 'success': false });
    //     }
    //     else {
    //       setFetchError(true);
    //       setModalData({ 'cost': cost, 'orderId': null, 'success': false });
    //     }
    //   })
  }


  const getDropCallback = (dropIndex : number )=>(item:IBurgerIngredientDrop)=>{
    const dragIndex = item.index;
    const {index,...ingredient} = item;

    dispatch(switchIngredients(dropIndex,dragIndex))

    // setIngredientContext(prev=>{
    //   const tempContext = JSON.parse(JSON.stringify(prev));
      
    //   tempContext.ingredients[dropIndex] = ingredient;
    //   tempContext.ingredients[dragIndex] = {...prev.ingredients[dropIndex]};
    //   return tempContext;
    // })

  }


  return (
    <>

      {storeOrderDetails && (<Modal onClose={modalClose} >
        <OrderDetails total={storeOrderDetails['cost']} orderNumber={storeOrderDetails['orderId']} orderStatus={storeOrderDetails['success']} networkError={fetchError} />
      </Modal>)

      }


      <div className={styles.topPadding} />
      <div className={styles.ingredientContainer} ref={drop}>
        {storeBun &&
          (<div className={styles.elementHeight} >
            <ConstructorElement

              type="top"
              isLocked={true}
              text={storeBun['name'] + ' (верх)'}
              price={storeBun['price']}
              thumbnail={storeBun['image']}
              handleClose={()=>dispatch(deleteIngredient(storeBun))}
            />
          </div>)
        }
        <div className={styles.ingredientInnerContainer}>
          {storeIngredients.map((ingredient, index) => {

            return (
              <div key={index} className={styles.elementHeight}>
                <WithDrop type="ingredientConstructor" 
                  onDropCallback={getDropCallback(index)} 
                  onHoverStyle={{width:'100%', border:'2px solid green'}} 
                  iddleStyle={{width:'100%'}} >
                    <WithDrag  type="ingredientConstructor" 
                      item={{...ingredient, index}}
                      onDragStyle={{width:'100%', border:'2px solid green'}} 
                      iddleStyle={{width:'100%'}}>
                        <DragIcon type="primary" />
                        <ConstructorElement


                          isLocked={false}
                          text={ingredient.name}
                          price={ingredient.price}
                          thumbnail={ingredient.image}
                          handleClose={()=>dispatch(deleteIngredient(ingredient))}
                        />
                    </WithDrag>
                </WithDrop>
              </div>
            )


          })}
        </div>
        {storeBun && (
          <div className={styles.elementHeight}>
            <ConstructorElement

              type="bottom"
              isLocked={true}
              text={storeBun['name'] + ' (низ)'}
              price={storeBun['price']}
              thumbnail={storeBun['image']}
              handleClose={()=>dispatch(deleteIngredient(storeBun))}
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

