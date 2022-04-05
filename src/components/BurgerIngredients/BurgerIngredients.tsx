import { useState, useRef, createRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import { getNames } from '../../utils/data';
import { BurgerIngredient } from './BurgerIngredient';
import styles from './BurgerIngredients.module.css';

import { IBareBurgerIngredient } from '../Interfaces';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';
import { pickIngredient, useIngredientContext } from '../../utils/contexts'


interface IResult {
    type: string,
    value: IBareBurgerIngredient[]
}



export const getSortedData = (rawData: IBareBurgerIngredient[]): any => {

    const data = rawData;

    const sortedData = data;

    const types = new Set(); const ingredientMap = new Map(); const resultArr: IResult[] = [];

    sortedData.forEach((el: IBareBurgerIngredient) => { types.add(el.type) })

    types.forEach(t => { ingredientMap.set(t, []) })

    sortedData.forEach((el: IBareBurgerIngredient) => { ingredientMap.get(el.type).push(el); })
    ingredientMap.forEach((val, key) => val.sort((a, b) => { return a.price - b.price }))

    ingredientMap.forEach((val, key) => { resultArr.push({ type: key, value: val }) })
    //resultArr and ingredientMap contain essentially the same information. The former is more convenient to create a ref array.
    // As we render the BurgerIngredints component, we use these datastructures interchangable whenever it is convenient. 
    return [resultArr, ingredientMap];
}

interface IBurgerIngredientsProps {
    data: IBareBurgerIngredient[]
}


export const BurgerIngredients = (props: IBurgerIngredientsProps): JSX.Element => {




    const [current, setCurrent] = useState('one');
    const [ingredients, ingredientMap] = getSortedData(props.data);

    const { ingredientContext, setIngredientContext } = useIngredientContext();

    const myRefs = useRef([]);
    const [modalData, setModalData] = useState<IBareBurgerIngredient | null>(null);

    myRefs.current = ingredients.map((element: IBareBurgerIngredient, index: number) => myRefs.current[index] ?? createRef());

    const ingedientClicked = (ingredient: IBareBurgerIngredient, setIngredientContext) => (): void => {
        pickIngredient(ingredient, setIngredientContext)        
        setModalData(ingredient);
    }

    const modalClose = (): void => {
        setModalData(null);
    }

    const getTab = (name: string, ref: any, setState: (arg: string) => void) => {
        return (e) => {
            setState(name);
            ref.current.scrollIntoView({ behavior: "smooth" });
        }
    }
    return (
        <section>
            <p className={"text text_type_main-large " + styles.header} >Соберите бургер</p>
            <div className={styles.tabContainer} >
                {ingredients.map((ingredient, ind) => {
                    return (
                        <Tab key={`${ingredient.type}`} value={`${ingredient.type}`} active={current === `${ingredient.type}`} onClick={getTab(ingredient.type, myRefs.current[ind], setCurrent)}>
                            <p className="text text_type_main-default">{`${getNames(ingredient.type)}`}</p>
                        </Tab>
                    )
                })}
            </div>
            <div className={styles.mainTabContainer} >
                {ingredients.map((ingredientOuter: IBareBurgerIngredient, index: number) => {
                    return (
                        <div key={`${ingredientOuter.type}`} id={`${ingredientOuter.type}Type`} ref={myRefs.current[index]} >
                            <p className={`text text_type_main-medium ${styles.header}`}>{getNames(ingredientOuter.type)}</p>
                            <div className={styles.innerIngredientContainer} >
                                {ingredientMap.get(ingredientOuter.type).map((ingredient: IBareBurgerIngredient) => {
                                    const inputProps = {
                                        ...ingredient,
                                        relativeWidth: styles.ingredientWidth,
                                        clickCallback: ingedientClicked(ingredient, setIngredientContext),
                                        quantity: ingredientContext.ingredientMap[ingredient._id]
                                    }
                                    return (
                                        <BurgerIngredient key={ingredient._id} {...inputProps} />
                                    )
                                })}
                            </div>
                        </div>
                    )
                })}
            </div>
            {modalData && <Modal onClose={modalClose}>
                <IngredientDetails {...modalData} />
            </Modal>

            }
        </section>
    )
}

