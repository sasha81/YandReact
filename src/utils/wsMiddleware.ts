// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';

import type {  AppDispatch, RootState } from 'services/store';

import {WSActions as AppActions} from 'services/actions/wsActions';

export const socketMiddleware = (wsUrl: string ): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;

    return next => (action: AppActions) => {
      const { dispatch, getState } = store;
      const { type, payload } = action;
 
      if (type === 'WS_ALL_CONNECTION_START') {
            // объект класса WebSocket
        socket = new WebSocket(wsUrl);
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_ALL_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_ALL_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          dispatch({ type: 'WS_ALL_GET_MESSAGE', payload: data });
        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_ALL_CONNECTION_CLOSED', payload: event });
        };

        if (type === 'WS_ALL_SEND_MESSAGE') {
          const message = payload;
                    // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};