import { IBareBurgerIngredient, IWSResponse, TIngredientData } from 'components/Interfaces';
import Modal from 'components/Modal/Modal';
import modalStyles from 'components/Modal/Modal.module.css'
import React, { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { WS_CONNECTION_START, WS_ORDER_CONNECTION_CLOSED, WS_ORDER_CONNECTION_ERROR, WS_ORDER_CONNECTION_START, WS_ORDER_CONNECTION_SUCCESS, WS_ORDER_GET_MESSAGE, WS_ORDER_SEND_MESSAGE } from 'services/actions/wsActions';
import { useSelector, useDispatch } from 'services/store';
import { GetDetails } from './FullOrderDetails';

function PersonalOrderDetails() {
    const location = useLocation();
    const history = useHistory();

    const { id } = useParams();
    const dispatch = useDispatch();
    const orderArr = useSelector((store) => store.wsConnection['messagesOrder'] as IWSResponse);
    const isSuccess = useSelector((store) => store.wsConnection['wsOrderConnected'] as boolean);
    const allIngredients = useSelector((store) => store.allIngredients as IBareBurgerIngredient[]);
    const order =orderArr&&  orderArr.orders.find(order => order._id === id);
    const ingredients =orderArr&& order?.ingredients;
    const ingredientPictures =orderArr&& allIngredients.reduce((accumArr, ingredient) => {
        if (ingredients?.includes(ingredient._id)) { accumArr = accumArr.concat({ pictureSrc: ingredient.image, pictureName: ingredient.name, price: ingredient.price }); }
        return accumArr;
    }, [] as TIngredientData[]);

    const price =orderArr&& ingredients?.map(ingredient => { return allIngredients.find(i => i._id === ingredient)?.price }).reduce<number>((acc, price) => {
        if (price) acc = acc + price;
        return acc;
    }, 0)

    useEffect(() => {

        if (!isSuccess)   dispatch({ type: WS_CONNECTION_START,payload:{
            url:`wss://norma.nomoreparties.space/orders?token=${window.localStorage.getItem('accessToken')}`,
            actionNames:{
                wsStart:  WS_ORDER_CONNECTION_START,
                onOpen: WS_ORDER_CONNECTION_SUCCESS,
                onError:  WS_ORDER_CONNECTION_ERROR,
                onMessage:  WS_ORDER_GET_MESSAGE,
                wsClose: WS_ORDER_CONNECTION_CLOSED,
                send: WS_ORDER_SEND_MESSAGE,
                close: WS_ORDER_CONNECTION_CLOSED
            }
        } });

        return ()=>{
            if (isSuccess)  dispatch({type:WS_ORDER_CONNECTION_CLOSED});
         }

    }, [isSuccess, dispatch]);

    const modalClose = () => {
        if (location?.state?.from?.pathname) {
            return history.replace({ pathname: location.state.from.pathname, state: { from: location } })

        }
        else {
            return history.replace({ pathname: '/', state: { from: location } })
        }
    }
    if (location.state && location.state.background) {
        return (
            <Modal onClose={modalClose}>
                <GetDetails
                    ingredientPictures={ingredientPictures}
                    price={price}
                    date={order?.createdAt}
                    id={order?.number.toString()}
                    status={order?.status}
                    name={order?.name}

                />
            </Modal>
        )
    }
    else {
        return (

            <div className={modalStyles.modal} >
                <GetDetails
                    ingredientPictures={ingredientPictures}
                    price={price}
                    date={order?.createdAt}
                    id={order?._id}
                    status={order?.status}
                    name={'Abcde'}

                />
            </div>

        )
    }
}

export default PersonalOrderDetails
