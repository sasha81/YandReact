export const goTo = (history: any) =>(route : string ,  state?: Object )=>{
    state ? history.replace({pathname:route, state:{...state}}) : history.replace({pathname:route}) 
}