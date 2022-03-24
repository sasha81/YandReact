import { ConstructorElement, Button, CurrencyIcon,DragIcon  } from '@ya.praktikum/react-developer-burger-ui-components';

const img = "https://code.s3.yandex.net/react/code/bun-02.png";

export const BurgerIngredients = (props: any)=>{
    return (
      <>
      <div style={{height:'200px'}}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', alignItems: 'center', height: '900px', border:'2px solid white' }}>
          {props.ingredients.map((ing, index)=>{
              if(index==0){
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
              if(index==props.ingredients.length-1){
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
      <div style={{display:'flex', flexDirection: 'row', justifyContent:'flex-end', alignItems: 'center'}}>
                  <h2 style={{marginRight:'20px'}}>{props.ingredients.reduce((accum, curr)=>{return accum+curr.price},0)}</h2>
                  <CurrencyIcon type="primary" />

                  <div style={{marginLeft:'20px', marginRight:'40px'}}>
                    <Button type="primary" size="medium">
                        Оформить Заказ
                  </Button>
                </div>
      </div>   
      </>
    )
}

