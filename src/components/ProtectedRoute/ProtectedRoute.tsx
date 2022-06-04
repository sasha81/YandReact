

import { useEffect, useState } from 'react';
import { useSelector } from 'services/store';

import { Route, Redirect } from 'react-router-dom';

export function ProtectedRoute({ children, ...rest }) {

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
      // Получим текущий маршрут, с которого произойдёт переадресация 
      // для неавторизованного пользователя
      render={({ location }) =>
        user ? (
          children
        ) : (
          <Redirect
            // Передадим в пропс to не строку, а объект.
            to={{
              // Маршрут, на который произойдёт переадресация
              pathname: '/login',
              // В from сохраним текущий маршрут
              state: { from: location }
            }}
          />
        )
      }
    />
  );
}