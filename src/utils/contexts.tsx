import React from 'react';
import {IBareBurgerIngredient, IChoosenIngredients} from '../components/Interfaces';

export interface IContextInteface {
    bun: IBareBurgerIngredient | null,
    ingredients :IBareBurgerIngredient[],
    ingredientMap:IChoosenIngredients}
  
   

export const initialIngredientValue = {bun:null, ingredients:[], ingredientMap:{}};
//yes, yes, I know! This <any> is not the best thing here, but it drew me nuts to marry TS with the React Context. I didn't expect it to be THAT quirky!!!
export const IngredientContext = React.createContext<any>({}  );

export const IngredientContextProvider = ({children})=>{
    const [ingredientContext, setIngredientContext] = React.useState<IContextInteface>(initialIngredientValue);
    return (
        <IngredientContext.Provider value={{ingredientContext, setIngredientContext}} >
            {children}
        </IngredientContext.Provider>
    )
}

export const useIngredientContext= ()=>React.useContext(IngredientContext);


export const deleteIngredient = (ingredient:IBareBurgerIngredient, setIngredientContext)=>()=>{
  const _id = ingredient._id;

  setIngredientContext((prev :IContextInteface) =>{
      const tempContext = JSON.parse(JSON.stringify(prev));
      if(prev&& prev.ingredientMap.hasOwnProperty(_id) && prev.ingredientMap[_id]>1){
        tempContext.ingredientMap[_id]=prev.ingredientMap[_id]-1
      }
      else if(prev && prev.ingredientMap.hasOwnProperty(_id) && prev.ingredientMap[_id]===1){
        const obj = tempContext.ingredientMap;
        delete obj[_id];
       
      }
      else{
      
      }
      const index = prev.ingredients.findIndex(el=>{return (el._id===_id)})
   
    tempContext.ingredients.splice(index,1);
    return tempContext;
  })

  
}

export const pickIngredient = (ingredient: IBareBurgerIngredient,setIngredientContext):void =>{
    const _id = ingredient._id
    if(ingredient.type!=='bun'){
      setIngredientContext(prev=>{     
          const tempContext = JSON.parse(JSON.stringify(prev))
              if(prev&& prev.ingredientMap.hasOwnProperty(_id)){
                tempContext.ingredientMap[_id]=prev.ingredientMap[_id]+1;
              
              }
              else{
                tempContext.ingredientMap[_id]=1;
                
              }
              tempContext.ingredients= tempContext.ingredients.concat(ingredient);
              return tempContext;
            });
           
            
    }
      else if(ingredient.type==='bun' ){
        setIngredientContext(prev=>{
          const tempContext = JSON.parse(JSON.stringify(prev))
          
          if(tempContext.bun) {
            const prevBunId = tempContext.bun._id;
            tempContext.ingredientMap[prevBunId]=0;
          }

          tempContext.bun={...ingredient};
          tempContext.ingredientMap[_id]=1;
        
          return tempContext;

        })
      }     
  }

 export const orderComplete = (choosenIngredientObjects:IBareBurgerIngredient[],
   
    
    setIngredientContext
    
    ):void=>{
    console.log("This burger order is sent to the server: ", choosenIngredientObjects);
  
    setIngredientContext({bun:null, ingredients:[], ingredientMap:{}})
  
}
