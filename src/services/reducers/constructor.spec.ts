import {
    orderDetailsReducer,
    ingredientDetailsReducer,
    securityUserReducer,
    allIngredientsReducer,
    bunReducer,
    mapReducer,
    ingredientReducer,
    initialIngredients,
    initialIngredientMap,
    initialBun,
    initalOrderDetails,
    initalIngredientDetails,
    initialUser,
    noConnectionReducer,
    initialNetworkError,

} from './constructor';

import {
    PICK_INGREDIENT,
    RESET_INGREDIENT,
    SET_INGREDIENTS,
    DELETE_INGREDIENT,
    SET_INFO_INGREDIENT,
    MAKE_ORDER,
    DECREMENT_MAP,
    INCREMENT_MAP,
    SET_BUN,


    SWITCH_INGREDIENT,
    RESET_MAP,
    ERROR_SET_INGREDIENTS,
    ERROR_MAKE_ORDER,
    UPDATE_USER,

    NETWORK_CONNECTION,
    DECREASE_BUN_MAP,
    INCREASE_BUN_MAP

} from '../actions/constructor';
import { IBareBurgerIngredient, IOrder, IUser } from 'components/Interfaces';


describe("burger constructor ingredientReducers", () => {
    test("ingredient reducer picks the first ingredint", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = initialIngredients;
        const result = ingredientReducer(state, { type: PICK_INGREDIENT, payload: ingredient })
        expect([ingredient]).toEqual(result);
    })

    test("ingredient reducer picks another ingredint", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = [ingredient];

        const result = ingredientReducer(state, { type: PICK_INGREDIENT, payload: ingredient })
        expect([ingredient, ingredient]).toEqual(result);
    })


    test("ingredient reducer removes a single ingredint", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = [ingredient];

        const result = ingredientReducer(state, { type: DELETE_INGREDIENT, payload: ingredient })
        expect([]).toEqual(result);
    })
    test("ingredient reducer removes one ingredint from a list", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = [ingredient, ingredient];

        const result = ingredientReducer(state, { type: DELETE_INGREDIENT, payload: ingredient })
        expect([ingredient]).toEqual(result);
    })
    test("ingredient reducer removes one ingredint from a list", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = [ingredient, ingredient];

        const result = ingredientReducer(state, { type: RESET_INGREDIENT })
        expect(initialIngredients).toEqual(result);
    })

    test("ingredients are switched", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const ingredient1: IBareBurgerIngredient = {
            _id: "def",
            image: "bc",
            price: 100,
            name: "Arr!!",
            type: "2"
        }
        const state = [ingredient, ingredient1];

        const result = ingredientReducer(state, { type: SWITCH_INGREDIENT, to: 1, from: 0 })
        expect([ingredient1, ingredient]).toEqual(result);
    })
})


describe('burger constructor mapReducer', () => {

    test('bun map is 1 if there were no bun', () => {
        const state = initialIngredientMap;
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: INCREASE_BUN_MAP, payload: ingredient });
        expect(result[ingredient._id]).toEqual(1);
    })
    test('bun map is still 1 if there was a bun', () => {
        const state = { "abc": 1 };
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: INCREASE_BUN_MAP, payload: ingredient });
        expect(result[ingredient._id]).toEqual(1);
    })

    test('bun map is decreased', () => {
        const state = { "abc": 1 };
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: DECREASE_BUN_MAP, payload: ingredient });
        expect(result[ingredient._id]).toEqual(0);
    })

    test('map is reset', () => {
        const state = { "abc": 1 };
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: RESET_MAP });
        expect(result).toEqual(initialIngredientMap);
    })
    test('map value is incremented if there was an element with this _id', () => {
        const state = { "abc": 1 };
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: INCREMENT_MAP, payload: ingredient });
        expect(result[ingredient._id]).toEqual(2);
    })


    test('map value is decremented if there was an element with this _id', () => {
        const state = { "abc": 1 };
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const result = mapReducer(state, { type: DECREMENT_MAP, payload: ingredient });
        expect(result.hasOwnProperty(ingredient._id)).toBeFalsy();
    })
})


describe("bunReducer ", () => {
    test("bun is correctly set", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = initialBun;
        const result = bunReducer(state, { type: SET_BUN, payload: ingredient });
        expect(result).toEqual(ingredient);
    })
})


describe('orderDetailsReducer', () => {
    test("an order is correctly set", () => {
        const state = initalOrderDetails;
        const order: IOrder = {
            cost: 100,
            orderId: 123,
            success: true
        }
        const result = orderDetailsReducer(state, { type: MAKE_ORDER, payload: order });
        expect(result).toEqual(order);
    })

    test("an order is correctly reset", () => {
        const state = initalOrderDetails;
        const order: IOrder = {
            cost: 100,
            orderId: 123,
            success: true
        }
        const result = orderDetailsReducer(state, { type: MAKE_ORDER, payload: null });
        expect(result).toEqual(null);
    })

    test("error make order", () => {

        const order: IOrder = {
            cost: 100,
            orderId: 123,
            success: true
        }
        const state = order
        const result = orderDetailsReducer(state, { type: ERROR_MAKE_ORDER });
        expect(result).toEqual(initalOrderDetails);
    })
})



describe('allIngredientReducer', () => {
    test("all ingredients are set", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const ingredient1: IBareBurgerIngredient = {
            _id: "abc1",
            image: "bc",
            price: 100,
            name: "Arr2",
            type: "2"
        }
        const state = initialIngredients;
        const input = [ingredient, ingredient1]
        const result = allIngredientsReducer(state, { type: SET_INGREDIENTS, payload: input });
        expect(result).toEqual(input);
    })
    test("error set ingredients", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const ingredient1: IBareBurgerIngredient = {
            _id: "abc1",
            image: "bc",
            price: 100,
            name: "Arr2",
            type: "2"
        }

        const input = [ingredient, ingredient1]
        const state = input;
        const result = allIngredientsReducer(state, { type: ERROR_SET_INGREDIENTS });
        expect(result).toEqual("error");
    })
})

describe('set order details reducer', () => {
    test("order details are set", () => {
        const ingredient: IBareBurgerIngredient = {
            _id: "abc",
            image: "bc",
            price: 100,
            name: "Arr",
            type: "1"
        }
        const state = initalIngredientDetails;
        const result = ingredientDetailsReducer(state, { type: SET_INFO_INGREDIENT, payload: ingredient });
        expect(result).toEqual(ingredient);
    })
    test("order details are reset", () => {

        const state = initalIngredientDetails;
        const result = ingredientDetailsReducer(state, { type: SET_INFO_INGREDIENT, payload: null });
        expect(result).toEqual(null);
    })
})

describe("userReducer", () => {
    test("user is set", () => {
        const user: IUser = {
            email: 'abc@gmail.com',
            password: "12345"
        }
        const state = initialUser;
        const result = securityUserReducer(state, { type: UPDATE_USER, payload: user });
        expect(result).toEqual(user);
    })
})

describe("network connection", () => {
    test("network connection", () => {
        const state = initialNetworkError;

        let result = noConnectionReducer(state, { type: NETWORK_CONNECTION, payload: true })
        expect(result).toEqual(true);
        result = noConnectionReducer(state, { type: NETWORK_CONNECTION, payload: false })
        expect(result).toEqual(false);
    })
})