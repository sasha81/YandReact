import { ConstructorElement } from '@ya.praktikum/react-developer-burger-ui-components';

const img = "https://code.s3.yandex.net/react/code/bun-02.png";

export const BurgerIngredients = (props: any)=>{
    return (
      <>
      <div style={{height:'200px'}}/>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {props.ingredients.map((ing, index)=>{
              if(index==0){
                return (
                  <ConstructorElement
                  key={index}
                  type="top"
                  isLocked={false}
                  text={ing.text}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={props.deleteIngredient(ing)}
                />
                )
              }
              if(index==props.ingredients.length-1){
                return(
                  <ConstructorElement
                  key={index}
                  type="bottom"
                  isLocked={false}
                  text={ing.text}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={props.deleteIngredient(ing)}
                />
                )
              }
              else{
                return(
                  <ConstructorElement
                  key={index}
                  text={ing.text}
                  isLocked={false}
                  price={ing.price}
                  thumbnail={ing.image}
                  handleClose={props.deleteIngredient(ing)}
                />
                )
              }
          })}
        {/* <ConstructorElement
          type="top"
          isLocked={true}
          text="Краторная булка N-200i (верх)"
          price={200}
          thumbnail={img}
        />
        <ConstructorElement
          text="Краторная булка N-200i (верх)"
          price={50}
          thumbnail={img}
        />
        <ConstructorElement
          type="bottom"
          isLocked={true}
          text="Краторная булка N-200i (низ)"
          price={200}
          thumbnail={img}
        /> */}
      </div>
      </>
    )
}

