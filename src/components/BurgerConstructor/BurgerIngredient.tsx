
const BurgerIngredient = (props: any)=>{
    return (
        <div style={{width: '50%'}} onClick={props.clickCallback}>
            <img src={props.image} />
            <h2>{props.price}</h2>
            <h3>{props.name}</h3>

        </div>

    )
}

export default BurgerIngredient;