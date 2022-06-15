
import { Route, Redirect } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector } from 'services/store';


export function AuthorizedBlockedRoute({ children, ...rest }) {

  const [isUserLoaded, setUserLoaded] = useState(false);
  const user = useSelector((state) => state.user); 

   const init = async () => {

    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

  if (!isUserLoaded) {
    return null;
  }

  
  
  return (
    <Route
      {...rest}

      render={({ location }) =>{
      
       
      const hasVisitedandSent = JSON.stringify(location).includes('forgotPassword');
        if(Boolean(user)){
            return (<Redirect
              // Передадим в пропс to не строку, а объект.
              to={{
                // Маршрут, на который произойдёт переадресация
                pathname:'/',// location?.state?.from?.pathname ? location.state.from.pathname : '/',
                // В from сохраним текущий маршрут
                state: { from: location }
              }}
            />


            ) }

        else if(!Boolean(user)&& location.pathname==='/reset-password' && !Boolean(hasVisitedandSent)){
          return (
            <Redirect
              // Передадим в пропс to не строку, а объект.
              to={{
                // Маршрут, на который произойдёт переадресация
                pathname: '/forgot-password',
                // В from сохраним текущий маршрут
                state: { from: location }
              }}
            />
          )
        }      
        else{
          return (children
            )
        } 
      }
    }
    />
  );

}