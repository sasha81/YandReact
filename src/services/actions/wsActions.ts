import {IWSResponse} from 'components/Interfaces'



export const WS_ALL_SEND_MESSAGE: 'WS_ALL_SEND_MESSAGE' = 'WS_ALL_SEND_MESSAGE';
export const WS_ALL_GET_MESSAGE: 'WS_ALL_GET_MESSAGE' = 'WS_ALL_GET_MESSAGE';
export const WS_ALL_CONNECTION_CLOSED: 'WS_ALL_CONNECTION_CLOSED' = 'WS_ALL_CONNECTION_CLOSED';
export const WS_ALL_CONNECTION_ERROR: 'WS_ALL_CONNECTION_ERROR' = 'WS_ALL_CONNECTION_ERROR';
export const WS_ALL_CONNECTION_SUCCESS: 'WS_ALL_CONNECTION_SUCCESS' = 'WS_ALL_CONNECTION_SUCCESS'; 
export const WS_ALL_CONNECTION_START: 'WS_ALL_CONNECTION_START' = 'WS_ALL_CONNECTION_START';

export const WS_ORDER_SEND_MESSAGE: 'WS_ORDER_SEND_MESSAGE' = 'WS_ORDER_SEND_MESSAGE';
export const WS_ORDER_GET_MESSAGE: 'WS_ORDER_GET_MESSAGE' = 'WS_ORDER_GET_MESSAGE';
export const WS_ORDER_CONNECTION_CLOSED: 'WS_ORDER_CONNECTION_CLOSED' = 'WS_ORDER_CONNECTION_CLOSED';
export const WS_ORDER_CONNECTION_ERROR: 'WS_ORDER_CONNECTION_ERROR' = 'WS_ORDER_CONNECTION_ERROR';
export const WS_ORDER_CONNECTION_SUCCESS: 'WS_ORDER_CONNECTION_SUCCESS' = 'WS_ORDER_CONNECTION_SUCCESS'; 
export const WS_ORDER_CONNECTION_START: 'WS_ORDER_CONNECTION_START' = 'WS_ORDER_CONNECTION_START';

export const WS_SEND_MESSAGE: 'WS_SEND_MESSAGE' = 'WS_SEND_MESSAGE';
export const WS_GET_MESSAGE: 'WS_GET_MESSAGE' = 'WS_GET_MESSAGE';
export const WS_CONNECTION_CLOSED: 'WS_CONNECTION_CLOSED' = 'WS_CONNECTION_CLOSED';
export const WS_CONNECTION_ERROR: 'WS_CONNECTION_ERROR' = 'WS_CONNECTION_ERROR';
export const WS_CONNECTION_SUCCESS: 'WS_CONNECTION_SUCCESS' = 'WS_CONNECTION_SUCCESS'; 
export const WS_CONNECTION_START: 'WS_CONNECTION_START' = 'WS_CONNECTION_START';

export type WSActions = IGetMessage | ISendMessage|IConnectionClosed|IConnectionSucceed| IAllConnectionStart|IOrderConnectionStart|IConnectionError;

export interface IGetMessage {
    readonly type: typeof WS_ALL_GET_MESSAGE | typeof WS_ORDER_GET_MESSAGE;
    readonly payload: IWSResponse;
  }

export interface ISendMessage {
    readonly type: typeof WS_ALL_SEND_MESSAGE | typeof WS_ORDER_SEND_MESSAGE;
    readonly payload: IWSResponse;
  }
export interface IConnectionClosed {
    readonly type: typeof WS_ALL_CONNECTION_CLOSED |typeof WS_ORDER_CONNECTION_CLOSED  ;
    readonly payload: Event;
   
  }

  export interface IConnectionError {
    readonly type: typeof WS_ALL_CONNECTION_ERROR | typeof WS_ORDER_CONNECTION_ERROR;
    readonly payload: Event;
   
  }

  export interface IConnectionSucceed {
    readonly type: typeof WS_ALL_CONNECTION_SUCCESS | typeof WS_ORDER_CONNECTION_SUCCESS ;
    readonly payload: Event;
    
  }

  export interface IAllConnectionStart {
    readonly type: typeof WS_ALL_CONNECTION_START ;
    readonly payload?: string;
    
  
  }
  export interface IOrderConnectionStart {
    readonly type:  typeof WS_ORDER_CONNECTION_START;
    readonly payload: string;
  
  }
