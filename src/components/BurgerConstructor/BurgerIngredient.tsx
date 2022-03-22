
const BurgerIngredient = (props: any)=>{
    return (
        <>
            <img src={props.image} />
            <h2>{props.price}</h2>
            <h3>{props.name}</h3>

        </>

    )
}

export default BurgerIngredient;