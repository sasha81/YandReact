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
import { Actions } from 'services/actions/Interfaces';


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



export type TWsActions = {
  wsStart: typeof WS_ORDER_CONNECTION_START|typeof WS_ALL_CONNECTION_START,
  onOpen: typeof WS_ORDER_CONNECTION_SUCCESS|typeof WS_ALL_CONNECTION_SUCCESS,
  onError: typeof  WS_ORDER_CONNECTION_ERROR |typeof  WS_ALL_CONNECTION_ERROR,
  onMessage: typeof  WS_ORDER_GET_MESSAGE |typeof  WS_ALL_GET_MESSAGE,
  wsClose: typeof WS_ORDER_CONNECTION_CLOSED| typeof WS_ALL_CONNECTION_CLOSED,
  send:typeof WS_ORDER_SEND_MESSAGE| typeof WS_ALL_SEND_MESSAGE,
  close:typeof WS_ORDER_CONNECTION_CLOSED| typeof WS_ALL_CONNECTION_CLOSED
}

class BasicSocket {
  protected dispatch:Dispatch<AppActions>;
  protected socket :WebSocket;
  protected actions: TWsActions;
  protected wsUrl:string;

  constructor(dispatch:Dispatch<AppActions>, socket: WebSocket, actions:TWsActions,wsUrl:string){
      this.dispatch = dispatch;
      this.socket = socket;
      this.actions = actions;
      this.wsUrl = wsUrl;
  }

  onOpen(event){
    this.dispatch({type:this.actions.onOpen,payload:event});
  }

  onError(event){
      this.dispatch({ type: this.actions.onError, payload: event });
    };

            // функция, которая вызывается при получения события от сервера
    onMessage(event ){
      const { data } = event;
      this.dispatch({ type: this.actions.onMessage, payload: JSON.parse(data) });
    };
            // функция, которая вызывается при закрытии соединения
    onClose(event){
      this.dispatch({ type: this.actions.onError, payload: event });
    };

    createSocket(wsUrl:string){
      return new WebSocket(wsUrl); 
    }

    run(action :AppActions){
      const { type, payload } = action;
      if(type===this.actions.wsStart){
        this.socket = this.createSocket(payload!)
      }
      if(this.socket){
        this.socket.onopen=this.onOpen;
        this.socket.onmessage=this.onMessage;
        this.socket.onclose=this.onClose;
        this.socket.onerror=this.onError;
        if (type === this.actions.send) {
          const message = payload;
                    // функция для отправки сообщения на сервер
          this.socket.send(JSON.stringify(message));
        }
        if(type === this.actions.close){
          this.socket.close();         
        }
      }
    }
}


