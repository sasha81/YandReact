import { ConstructorElement, Button, CurrencyIcon, DragIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { useSelector, useDispatch } from 'services/store';
import { useDrop } from 'react-dnd';
import styles from './BurgerConstructor.module.css';
import { IBareBurgerIngredient, IBurgerIngredientDrop } from '../Interfaces';
import { pickIngredient, switchIngredients, deleteIngredient } from '../../services/actions/constructorThunks'
import { WithDrop, WithDrag } from '../../utils/dndHOCs';
import { useHistory, useLocation } from 'react-router-dom';


const getCost = (ingredients: IBareBurgerIngredient[], bun: IBareBurgerIngredient | null): number => {
  if (ingredients.length === 0 && bun == null) return 0;
  return ingredients.reduce((accum, curr) => { return accum + curr.price }, 0) + (bun ? bun.price : 0);
}

export const BurgerConstructor = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const currentPath = location.pathname.slice();



  const dispatch = useDispatch();

  const { storeIngredients, storeBun } = useSelector((store) => ({
    storeIngredients: store.ingredients,
    storeBun: store.bun,
    storeOrderDetails: store.orderDetails,
    user: store.user
  }))

  const [, drop] = useDrop({
    accept: 'ingredient',

    drop(ingredient: any) {

      dispatch(pickIngredient(ingredient, storeBun))
    }
  })

  const cost = getCost(storeIngredients, storeBun);

  const clickButton = (cost: number, storeBun: IBareBurgerIngredient | null) => () => {
    if (storeBun === null) return;

    const allIngredients = storeIngredients.concat(storeBun);

    history.replace({ pathname: `/orderDetails`, state: { from: currentPath, ingredients: allIngredients, cost: cost } })
  }


  const getDropCallback = (dropIndex: number) => (item: IBurgerIngredientDrop) => {
    const dragIndex = item.index;
    const { index, ...ingredient } = item;

    dispatch(switchIngredients(dropIndex, dragIndex))

  }


  return (
    <>

    
      <div className={styles.topPadding}  />
      <div className={styles.ingredientContainer} ref={drop} data-cy="bunContainer">
        {storeBun &&
          (<div className={styles.elementHeight} >
            <ConstructorElement

              type="top"
              isLocked={true}
              text={storeBun['name'] + ' (верх)'}
              price={storeBun['price']}
              thumbnail={storeBun['image']}
              handleClose={() => dispatch(deleteIngredient(storeBun))}
            />
          </div>)
        }
        <div className={styles.ingredientInnerContainer} data-cy="ingredientContainer">
          {storeIngredients.map((ingredient, index) => {

            return (
              <div key={ingredient.uuid} className={styles.elementHeight}>
                <WithDrop type="ingredientConstructor"
                  onDropCallback={getDropCallback(index)}
                  onHoverStyle={{ width: '100%', border: '2px solid green' }}
                  iddleStyle={{ width: '100%' }} >
                  <WithDrag type="ingredientConstructor"
                    item={{ ...ingredient, index }}
                    onDragStyle={{ width: '100%', border: '2px solid green' }}
                    iddleStyle={{ width: '100%' }}>
                    <DragIcon type="primary" />
                    <ConstructorElement


                      isLocked={false}
                      text={ingredient.name}
                      price={ingredient.price}
                      thumbnail={ingredient.image}
                      handleClose={() => dispatch(deleteIngredient(ingredient))}
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
              handleClose={() => dispatch(deleteIngredient(storeBun))}
            />
          </div>
        )
        }

      </div>
      <div className={styles.submitElement} >
        <p className="text text_type_digits-medium" data-cy="constructorTotalCost">{cost}</p>
        <div className="p-2"><CurrencyIcon type="primary" /></div>

        <div className={`p-8 ${storeBun ? styles.buttonDivActive : styles.buttonDivBlocked}`} data-cy="createOrderButton">

          <Button type="primary" size="medium" disabled={!storeBun} onClick={clickButton(cost, storeBun)} >
            Оформить Заказ
          </Button>
        </div>
      </div>

    </>
  )
}

