import { Counter,CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerIngredient = (props: any)=>{
    return (
        <div style={{width: `${props.relativeWidth}`, position:'relative'}} onClick={props.clickCallback}>
            <h2 style={{height:'25px', position:'absolute', top:'0px', right: '30px', backgroundColor:'blue', borderRadius:'20px'}}>{props.quantity}</h2>
            {/* <Counter count={props.quantity} size="default" /> */}
            <img style={{display:'block',margin:'0 auto'}} src={props.image} />
            <div style={{display:'flex', flexDirection:'row', justifyContent:'center', alignItems:'center'}}>
                <h2 style={{marginRight:'20px'}}>{props.price}</h2>
                <CurrencyIcon type="primary" />
            </div>
           
            <h3 style={{width: '80%', textAlign:'center',margin:'0 auto'}}>{props.name}</h3>

        </div>

    )
}

export default BurgerIngredient;