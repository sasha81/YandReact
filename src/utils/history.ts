export const goTo = (history: any) =>(route : string ,  from?: string )=>{
    from ? history.replace({pathname:route, state:{from:from}}) : history.replace({pathname:route}) 
}