import { useState, useRef, createRef} from "react";
import {useSelector, useDispatch} from 'react-redux';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';
import { InView } from 'react-intersection-observer';
import { getNames } from '../../utils/data';
import { BurgerIngredient } from './BurgerIngredient';
import {WithDrag} from '../../utils/dndHOCs';
import styles from './BurgerIngredients.module.css';

import { IBareBurgerIngredient } from '../Interfaces';

import IngredientDetails from '../IngredientDetails/IngredientDetails';
import Modal from '../Modal/Modal';

import {pickIngredient,setInfo} from '../../services/actions/constructorThunks';
import {RootState} from '../../services/store';



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

interface IScroll{
    current:number,
    visibility:boolean,
    counter:number,
    pressed:boolean
}

export const BurgerIngredients = ( ): JSX.Element => {
    const data = useSelector((state: RootState)=>state.allIngredients)
    const [ingredients, ingredientMap] = getSortedData(data);
//this involved tab state is needed to make it scroll-to-tab and tab-to-scroll without us to use window.onScrollListener/boundingRectagle/scrollY anywhere.
//Notice that this approach allows us to add other ingredient typs with minimal effort. 
//Here, current-the current tab #, visibility - if the ingredient div is visible;
//the counter is needed to initialize the watcher (after it reaches the number of tabs, it stays the same).
//Finally, the pressed field is needed to temporerely block the visibility callback. It works! 
    const [tabState, setCurrentTab] = useState<IScroll>({current:0, visibility: false, counter:0, pressed:false});

    
  
    const storeIngredientMap = useSelector((state:RootState)=>state.ingredientMap);
    const ingredientDetails = useSelector((state:RootState)=>state.ingredientDetails);
    const bun = useSelector((state:RootState)=>state.bun)
    const dispatch = useDispatch();    
    
    const history = useHistory();
    const location = useLocation();

    const myRefs = useRef([]);   

    myRefs.current = ingredients.map((element: IBareBurgerIngredient, index: number) => myRefs.current[index] ?? createRef());

    const infoClicked = (ingredient: IBareBurgerIngredient)=>(): void=>{
        //dispatch(setInfo(ingredient)) 
        history.replace({
            pathname:`/ingredients/${ingredient._id}`,
            state:{background:location, from:location}
        })      
    }

    const ingedientClicked = (ingredient: IBareBurgerIngredient) => (): void => {
        dispatch(pickIngredient(ingredient,bun))     
    }

    const modalClose = (): void => {
        dispatch(setInfo(null))       
    }

    const getTab = (name: number, ref: any, setState: (arg: any) => void) => {
        return (e) => {
        
            ref.current.scrollIntoView({ behavior: "smooth" });
            setState(prev=>{return {...prev,current:name, pressed:true}});
            setTimeout(()=>{
                setState(prev=>{return {...prev,current:name, pressed:false}});
            },500)
           
        }
    }
   


    const visibilityCallback = (number:number,setCurrent, numberOfTypes:number) => (isVisible:boolean)=>{
       
        setCurrent(prev=>{
           
           if(prev.pressed) return prev;

            if(prev.counter<=numberOfTypes-1) return {current:0,visibility:true,counter: prev.counter+1};
            else if(prev.current===number && number<numberOfTypes-1) return {current:number+1,visiblity:true,counter: prev.counter}
            else if(prev.current===number && number===numberOfTypes-1) return {current:number-1,visiblity:true,counter: prev.counter}
            else if((prev.current+1===number && number===numberOfTypes-1)) return {current:number,visiblity:true,counter: prev.counter}
            else if((prev.current-1===number && number<numberOfTypes-1)) return {current:number,visiblity:true,counter: prev.counter}
            else return prev;
        })
    }

   
    return (
        <section>
            <p className={"text text_type_main-large " + styles.header} >Соберите бургер</p>
            <div className={styles.tabContainer} >
                {ingredients.map((ingredient, ind) => {
                    return (
                        <Tab key={`${ingredient.type}`}
                         value={`${ingredient.type}`}
                         active={tabState.current === ind}
                         onClick={getTab(ind, myRefs.current[ind], setCurrentTab)}>
                            <p className="text text_type_main-default">{`${getNames(ingredient.type)}`}</p>
                        </Tab>
                    )
                })}
            </div>
            <div className={styles.mainTabContainer} >
                {ingredients.map((ingredientOuter: IBareBurgerIngredient, index: number) => {
                    return (
                     <InView 
                        key={index}
                        onChange={visibilityCallback(index,setCurrentTab, Array.isArray(ingredients) ? ingredients.length: 0)}                                   
                        >
                       
                        <div  id={`${ingredientOuter.type}Type`} ref={myRefs.current[index]} >
                            <p className={`text text_type_main-medium ${styles.header}`}>{getNames(ingredientOuter.type)}</p>
                            <div className={styles.innerIngredientContainer} >
                                {ingredientMap.get(ingredientOuter.type).map((ingredient: IBareBurgerIngredient) => {
                                    const inputProps = {
                                        ...ingredient,
                                        relativeWidth: styles.ingredientWidth,
                                        clickCallback: ingedientClicked(ingredient),
                                        infoCallback: infoClicked(ingredient),
                                        quantity: storeIngredientMap[ingredient._id]
                                    }
                                    
                                    return (
                                      <WithDrag key={ingredient._id} type="ingredient"
                                       item={{...ingredient}}
                                       onDragStyle={{width:'48%', border:'2px solid green'}}
                                       iddleStyle={{width:'48%'}}> 
                                        <BurgerIngredient  {...inputProps} />
                                    </WithDrag> 
                                    )
                                })}
                            </div>
                        </div>
                        </InView>     
                    )
                })}
            </div>
         
        </section>
    )
}

