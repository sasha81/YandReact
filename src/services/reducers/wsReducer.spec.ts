import {IWSOrder, IWSResponse} from 'components/Interfaces';
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

import {wsReducer, initialState,TWSState} from './wsReducer';


describe("wsReducers",()=>{
    test("get message ALL works correctly for the first message",()=>{
        const state:TWSState = initialState;
        const order: IWSOrder={
            ingredients: ["i1","i2"],
            _id: "abc",
            status:"done",
            number:2,
            createdAt:"20-10-2022",
            updatedAt:"21-10-2022",
            name:"Big Tasty Burger order"
        }
        const message: IWSResponse ={
            success:true,
            orders:[order],
            total:2,
            totalToday:1
        }

        const resultShouldBe:TWSState={
            wsAllConnected: false,
            wsOrderConnected: false,
            messagesAll: message,
            messagesOrder: null
        }
        const result = wsReducer(state,{type:WS_ALL_GET_MESSAGE, payload:message});
        expect(result).toEqual(resultShouldBe);

    })
    test("get message ALL works correctly for other messages",()=>{
        const state:TWSState = initialState;
        const order: IWSOrder={
            ingredients: ["i1","i2"],
            _id: "abc",
            status:"done",
            number:2,
            createdAt:"20-10-2022",
            updatedAt:"21-10-2022",
            name:"Big Tasty Burger order"
        }
        const orderNew: IWSOrder={
            ingredients: ["i1","i2"],
            _id: "abc",
            status:"done",
            number:2,
            createdAt:"20-10-2022",
            updatedAt:"21-10-2022",
            name:"Big Tasty Burger order"
        }
        const messageOld: IWSResponse ={
            success:true,
            orders:[order],
            total:2,
            totalToday:1
        }
        const messageNew: IWSResponse ={
            success:true,
            orders:[orderNew],
            total:2,
            totalToday:1
        }

        const resultShouldBe:TWSState={
            wsAllConnected: false,
            wsOrderConnected: false,
            messagesAll: messageNew,
            messagesOrder: null
        }
        state.messagesAll=messageOld;


        const result = wsReducer(state,{type:WS_ALL_GET_MESSAGE, payload:messageNew});
        expect(result).toEqual(resultShouldBe);

    })


    test("connection works",()=>{
        const state:TWSState = initialState;
        const result = wsReducer(state,{type:WS_ALL_CONNECTION_SUCCESS, payload: new Event("A")});
        expect(result.wsAllConnected).toBeTruthy();
    })
})
