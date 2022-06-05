// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';

import type {  AppDispatch, RootState } from 'services/store';
import {WS_CONNECTION_START,WS_ALL_SEND_MESSAGE,
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
    
       
    return next => (action: AppActions) => {
      let socket: WebSocket | null = null;
      const { dispatch } = store;

      const { type, payload } = action;
      const names: TWsActions = payload && payload.hasOwnProperty('actionNames') &&payload['actionNames'];
      const wsUrl:string = payload && payload.hasOwnProperty('url') &&payload['url'];
      if (type === WS_CONNECTION_START) {
        // объект класса WebSocket
        socket = new WebSocket(wsUrl);
        }
        if (socket) {
    
                // функция, которая вызывается при открытии сокета
          socket.onopen = event => {
            dispatch({ type: names.onOpen, payload: event });
          };
    
                  // функция, которая вызывается при ошибке соединения
          socket.onerror = event => {
            dispatch({ type: names.onError, payload: event });
          };
    
                  // функция, которая вызывается при получения события от сервера
          socket.onmessage = event => {
            const { data } = event;
            dispatch({ type: names.onMessage, payload: JSON.parse(data) });
          };
                  // функция, которая вызывается при закрытии соединения
          socket.onclose = event => {
            dispatch({ type: names.wsClose, payload: event });
          };
    
          if (type === names.send) {
            const message = payload;
                      // функция для отправки сообщения на сервер
            socket.send(JSON.stringify(message));
          }
    
          if(type === names.close){
            socket.close();         
          }
      }   

    next(action);
    };
    }) as Middleware;
};



export type WsActionStrings = {
  wsStart: string,
  onOpen: string,
  onError: string,
  onGetOrders: string,
  wsClose: string,
}

export type TWsActions = {
  wsStart: typeof WS_ORDER_CONNECTION_START|typeof WS_ALL_CONNECTION_START,
  onOpen: typeof WS_ORDER_CONNECTION_SUCCESS|typeof WS_ALL_CONNECTION_SUCCESS,
  onError: typeof  WS_ORDER_CONNECTION_ERROR |typeof  WS_ALL_CONNECTION_ERROR,
  onMessage: typeof  WS_ORDER_GET_MESSAGE |typeof  WS_ALL_GET_MESSAGE,
  wsClose: typeof WS_ORDER_CONNECTION_CLOSED| typeof WS_ALL_CONNECTION_CLOSED,
  send:typeof WS_ORDER_SEND_MESSAGE| typeof WS_ALL_SEND_MESSAGE,
  close:typeof WS_ORDER_CONNECTION_CLOSED| typeof WS_ALL_CONNECTION_CLOSED
}



