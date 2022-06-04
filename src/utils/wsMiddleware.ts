// socketMiddleware.ts
import type { Dispatch, Middleware, MiddlewareAPI } from 'redux';

import type {  AppDispatch, RootState } from 'services/store';
import {WS_ALL_SEND_MESSAGE,
  WS_ALL_GET_MESSAGE,
  WS_ALL_CONNECTION_CLOSED,
  WS_ALL_CONNECTION_ERROR,
  WS_ALL_CONNECTION_SUCCESS,
  WS_ALL_CONNECTION_START,
  WS_ORDER_SEND_MESSAGE,
  WS_ORDER_GET_MESSAGE,
  WS_ORDER_CONNECTION_CLOSED,
  WS_ORDER_CONNECTION_ERROR,
  WS_ORDER_CONNECTION_SUCCESS,
  WS_ORDER_CONNECTION_START,
  
  
  WSActions as AppActions} from 'services/actions/wsActions';


export const socketMiddleware = (wsUrl?: string ): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socketAll: WebSocket | null = null;
        let socketOrder: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch } = store;

      allWSProcessor('wss://norma.nomoreparties.space/orders/all', dispatch,socketAll)(action);
      orderWSProcessor('wss://norma.nomoreparties.space/orders', dispatch,socketOrder)(action);

    next(action);
    };
    }) as Middleware;
};



const allWSProcessor=(wsUrl:string, dispatch:Dispatch<AppActions>,socket: WebSocket | null)=>(action:AppActions)=>{
  
  const { type, payload } = action;
  if (type === WS_ALL_CONNECTION_START) {
    // объект класса WebSocket
    socket = new WebSocket(wsUrl);
    }
    if (socket) {

            // функция, которая вызывается при открытии сокета
      socket.onopen = event => {
        dispatch({ type: WS_ALL_CONNECTION_SUCCESS, payload: event });
      };

              // функция, которая вызывается при ошибке соединения
      socket.onerror = event => {
        dispatch({ type: WS_ALL_CONNECTION_ERROR, payload: event });
      };

              // функция, которая вызывается при получения события от сервера
      socket.onmessage = event => {
        const { data } = event;
        dispatch({ type: WS_ALL_GET_MESSAGE, payload: JSON.parse(data) });
      };
              // функция, которая вызывается при закрытии соединения
      socket.onclose = event => {
        dispatch({ type: WS_ALL_CONNECTION_CLOSED, payload: event });
      };

      if (type === WS_ALL_SEND_MESSAGE) {
        const message = payload;
                  // функция для отправки сообщения на сервер
        socket.send(JSON.stringify(message));
      }

      if(type === WS_ALL_CONNECTION_CLOSED){
        socket.close();         
      }
  }
}

const orderWSProcessor=(wsUrl:string, dispatch:Dispatch<AppActions>,socket: WebSocket | null)=>(action:AppActions)=>{
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
}


