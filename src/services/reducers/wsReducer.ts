import {IMessage,IWSResponse} from 'components/Interfaces';
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
    WS_ORDER_CONNECTION_START
    
    ,WSActions as TWSActions} from 'services/actions/wsActions';


type TWSState = {
    wsAllConnected: boolean;
    wsOrderConnected: boolean;
    messagesAll: IWSResponse | null;
    messagesOrder: IWSResponse | null ;
  
    errorAll?: Event;
    errorOrder?: Event;
  }
  
  const initialState: TWSState = {
      wsAllConnected: false,
      wsOrderConnected: false,
      messagesAll: null,
      messagesOrder: null
  }; 

  export const wsReducer = (state = initialState, action: TWSActions) => {
    switch (action.type) {
          // Опишем обработку экшена с типом WS_CONNECTION_SUCCESS
          // Установим флаг wsConnected в состояние true
      case WS_ALL_CONNECTION_SUCCESS:
        return {
          ...state,
                  errorAll: undefined,
          wsAllConnected: true
        };
  
          // Опишем обработку экшена с типом WS_CONNECTION_ERROR
          // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
      case WS_ALL_CONNECTION_ERROR:
        return {
          ...state,
                  errorAll: action.payload,
          wsAllConnected: false
        };
  
          // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
          // Установим флаг wsConnected в состояние false
      case WS_ALL_CONNECTION_CLOSED:
        return {
          ...state,
                  errorAll: undefined,
          wsAllConnected: false
        };
  
          // Опишем обработку экшена с типом WS_GET_MESSAGE
          // Обработка происходит, когда с сервера возвращаются данные
          // В messages передадим данные, которые пришли с сервера
      case WS_ALL_GET_MESSAGE:
        return {
          ...state,
                  errorAll: undefined,
          messagesAll: action.payload
        };
        case WS_ORDER_CONNECTION_SUCCESS:
            return {
              ...state,
                      errorOrder: undefined,
              wsOrderConnected: true
            };
      
              // Опишем обработку экшена с типом WS_CONNECTION_ERROR
              // Установим флаг wsConnected в состояние false и передадим ошибку из action.payload
          case WS_ORDER_CONNECTION_ERROR:
            return {
              ...state,
                      errorOrder: action.payload,
              wsOrderConnected: false
            };
      
              // Опишем обработку экшена с типом WS_CONNECTION_CLOSED, когда соединение закрывается
              // Установим флаг wsConnected в состояние false
          case WS_ORDER_CONNECTION_CLOSED:
            return {
              ...state,
                      errorOrder: undefined,
              wsOrderConnected: false
            };
      
              // Опишем обработку экшена с типом WS_GET_MESSAGE
              // Обработка происходит, когда с сервера возвращаются данные
              // В messages передадим данные, которые пришли с сервера
          case WS_ORDER_GET_MESSAGE:
            return {
              ...state,
                      errorOrder: undefined,
              messagesOrder: action.payload
            };
      default:
        return state;
    }
  }; 

