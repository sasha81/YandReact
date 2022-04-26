
import { Route, Redirect, useLocation,useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector} from 'react-redux';
import {RootState} from '../../services/store';

export function AuthorizedBlockedRoute({ children, ...rest }) {
  
    const [isUserLoaded, setUserLoaded] = useState(false);
    const user =   useSelector((state: RootState)=>state.user);
    const visited =   useSelector((state: RootState)=>state.visited);

    const location = useLocation();
    const currentPath = location.pathname.slice();
    const history = useHistory();

    const init = async () => {
   
    setUserLoaded(true);
  };

  useEffect(() => {
    init();
  }, []);

    if (!isUserLoaded) {
    return null;
  }

  if( user && visited.hasOwnProperty('forgot_password')  && currentPath==='/reset-password') {
    
    return (
      <Route
      {...rest}
            // Получим текущий маршрут, с которого произойдёт переадресация 
            // для неавторизованного пользователя
      render={
        
          children }
        
        />
    )
  }
  else if (currentPath==='/reset-password' && !(user && visited.hasOwnProperty('forgot_password') ) ){
    return  history.goBack();
  }
  else return (
    <Route
      {...rest}
           
      render={({ location }) =>
        user  ? (   <Redirect
          // Передадим в пропс to не строку, а объект.
          to={{
              // Маршрут, на который произойдёт переадресация
              pathname: location.state.from,
              // В from сохраним текущий маршрут
state: { from: currentPath }
          }}
/>

       
        ) : (   children          
                )
      }
    />
  );
    
}