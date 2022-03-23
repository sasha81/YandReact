import { Counter } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = (props: any)=>{
    return (
        <div style={{width: `${props.relativeWidth}`, position:'relative'}} onClick={props.clickCallback}>
            <h2 style={{height:'25px', position:'absolute', top:'0px', right: '30px', backgroundColor:'blue', borderRadius:'20px'}}>{props.quantity}</h2>
            {/* <Counter count={props.quantity} size="default" /> */}
            <img src={props.image} />
            <h2>{props.price}</h2>
            <h3 style={{width: '80%', textAlign:'center'}}>{props.name}</h3>

        </div>

    )
}

export default BurgerIngredient;