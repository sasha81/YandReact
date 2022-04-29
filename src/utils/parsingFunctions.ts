//Parses the location L(i):{pathname:'p(i),state:{from:L(i-1),key:{obj}}'} linked list to get the obj
export const parseToNearestObject =(key:string, object: Object, depth: number, arr:boolean[]=[])=>{
    if(!(typeof object === 'object')) return undefined;
    arr.push(true);
    if(arr.length>depth) return undefined;
    if(object.hasOwnProperty(key)) return object[key];
   
    const result = parseToNearestObject(key,object['from']['state'], depth,arr);
    return result;
  }

  export const doesContainFieldAndValue =(key:string, value:string,object: any, depth: number, arr:boolean[]=[])=>{
    if(object) return false;
    if(!(typeof object === 'object')) return false;
    
    arr.push(true);
    if(arr.length>depth) return false;
    if(object.hasOwnProperty('from') && object['from'].hasOwnProperty(key) && object['from'][key]===value) return true;
   
    const result = parseToNearestObject(key,object['from']['state'], depth,arr);
    return result;
  }  