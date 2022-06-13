// import * as storeMethods from '../store';

// jest.mock('../store');

// //@ts-ignore
// storeMethods.useDispatch.mockReturnValue((arg)=>{})

import {MAKE_ORDER, SET_INGREDIENTS} from './constructor'
import { cleanup } from '@testing-library/react';
import {allIngredientsURL, mockFetch,mockIngredients,orderNumber,generateOrder} from '../../utils/mockUtils'
import {loadData,sendOrderDetails} from './constructorThunks';
import { IOrder } from 'components/Interfaces';

describe("constructorThunk tests",()=>{
    beforeAll(() => jest.spyOn(window, 'fetch'))
     //@ts-ignore
    beforeEach(() => window.fetch.mockImplementation(mockFetch))
    afterEach(()=>cleanup())
    afterAll(()=> jest.clearAllMocks())




    test("send order",async ()=>{
        const dispatchMock = jest.fn();
        const cost = 12345;
        const sendingOrder: IOrder = { 'cost': cost, 'orderId': "Отправляем заказ...", 'success': true};
        const data = generateOrder(orderNumber);
        const returnedOrder:IOrder={ 'cost': cost, 'orderId': data.order.number, 'success': data.success};
        const dispatchArg1 = {type:MAKE_ORDER, payload:sendingOrder}
        const dispatchArg2 = {type:MAKE_ORDER, payload:returnedOrder}
        //@ts-ignore
       await sendOrderDetails(cost,(x)=>{},mockIngredients)(dispatchMock);
       expect(dispatchMock).toHaveBeenNthCalledWith(1,dispatchArg1);
       expect(dispatchMock).toHaveBeenNthCalledWith(2,dispatchArg2);

       expect(dispatchMock).toHaveBeenCalledTimes(5);


    })

    test("load ingredients ",async ()=>{
        const dispatchMock = jest.fn();
        const dispatchArg = {type:SET_INGREDIENTS, payload:mockIngredients}
        //@ts-ignore
       await loadData(allIngredientsURL,(x)=>{})(dispatchMock);
       expect(dispatchMock).toHaveBeenLastCalledWith(dispatchArg);
       expect(dispatchMock).toHaveBeenCalledTimes(1);


    })
})

