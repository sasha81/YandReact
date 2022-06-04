import type { Middleware, MiddlewareAPI } from 'redux';

import type {  AppDispatch, RootState } from 'services/store';
import {
  WS_ORDER_SEND_MESSAGE,
  WS_ORDER_GET_MESSAGE,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_CONNECTION_START
  
  ,WSActions as AppActions} from 'services/actions/wsActions';

//import {WSActions as AppActions} from 'services/actions/wsActions';

export const socketAuthMiddleware = (wsUrl: string ): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;
      const { type, payload } = action;
 
      if (type === WS_ORDER_CONNECTION_START) {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}?token=${payload}`);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: WS_ORDER_CONNECTION_SUCCESS, payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: WS_ORDER_CONNECTION_ERROR, payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: WS_ORDER_GET_MESSAGE, payload: JSON.parse(data) });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: WS_ORDER_CONNECTION_CLOSED, payload: event });
        };

        if (type === WS_ORDER_SEND_MESSAGE) {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
        if(type === WS_ORDER_CONNECTION_CLOSED){
          socket.close();         
        }
      }

      next(action);
    };
    }) as Middleware;
};