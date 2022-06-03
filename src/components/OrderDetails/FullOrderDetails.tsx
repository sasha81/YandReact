import { IBareBurgerIngredient, IWSResponse, TIngredientData } from 'components/Interfaces';
import Modal from 'components/Modal/Modal';
import modalStyles from 'components/Modal/Modal.module.css'
import { useEffect } from 'react';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { WS_ALL_CONNECTION_START } from 'services/actions/wsActions';
import { useSelector, useDispatch } from 'services/store';
import { IOrderTab } from 'components/Interfaces';
import styles from './FullOrderDetails.module.css';
import { colorMap, statusMap } from 'utils/colorMaps';
import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { prittifyDate } from 'utils/costFunctions';

function FullOrderDetails() {
    const location = useLocation();
    const history = useHistory();

    const { id } = useParams();
    const dispatch = useDispatch();
    const orderArr = useSelector((store) => store.wsConnection['messagesAll'] as IWSResponse);
    const isSuccess = useSelector((store) => store.wsConnection['wsAllConnected'] as boolean);
    const allIngredients = useSelector((store) => store.allIngredients as IBareBurgerIngredient[]);
    const order = orderArr?.orders.find(order => order._id === id);
    const ingredients = order?.ingredients;
    const ingredientPictures = allIngredients.reduce((accumArr, ingredient) => {
        if (ingredients?.includes(ingredient._id)) { accumArr = accumArr.concat({ pictureSrc: ingredient.image, pictureName: ingredient.name, price: ingredient.price }); }
        return accumArr;
    }, [] as TIngredientData[]);

    const price = ingredients?.map(ingredient => { return allIngredients.find(i => i._id === ingredient)?.price }).reduce<number>((acc, price) => {
        if (price) acc = acc + price;
        return acc;
    }, 0)

    useEffect(() => {

        if (!isSuccess) dispatch({ type: WS_ALL_CONNECTION_START });

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
                    name={order?.name}

                />
            </div>

        )
    }


}

export const GetDetails = ({ ingredientPictures, name, price, date, id, status }: Omit<IOrderTab, 'ingredients'> & { status: string | undefined } & { ingredientPictures: TIngredientData[] }) => {

    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <p className="text text_type_digits-default">#{id}</p>
            <p className="text text_type_main-medium mt-3">{name}</p>
            <p className={`text text_type_main-medium mt-3 mb-3 ${status && colorMap.has(status) ? styles[colorMap.get(status)!] : ''}`}>{status && statusMap.get(status)}</p>

            <div className={styles.pictureContainer}>
                {ingredientPictures.map((picture, index) => {
                    return (
                        <div key={index} style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <img className={styles.image} src={picture.pictureSrc} />
                                <p className="text text_type_main-default">{picture.pictureName}</p>
                            </div>

                            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                                <p className="text text_type_digits-medium mr-3">{picture.price}</p>
                                <CurrencyIcon type={'primary'} />
                            </div>
                        </div>
                    )
                })}
            </div>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <p className="text text_type_main-small text_color_inactive">{prittifyDate(date!)}</p>
                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                    <p className="text text_type_digits-medium mr-3">{price}</p>
                    <CurrencyIcon type={'primary'} />
                </div>
            </div>

        </div>
    )
}

export default FullOrderDetails
