import { IWSOrder } from 'components/Interfaces';

import styles from './FeedStatistics.module.css';

type TFeedStatistics = {
    orders: IWSOrder[];
}

const getSlicedArr = (inputArr: string[], size: number): string[][] => {
    const result: string[][] = [];

    for (let i = 0; i + size < inputArr.length; i = i + size) {
        result.push(inputArr.slice(i, i + size))
    }
    const remainder = inputArr.length % size;
    result.push(inputArr.slice(inputArr.length - remainder,));
    return result;
}

const GetColumn = ({ input, color }: { input: string[], color: string }): JSX.Element => {
    return (
        <ul style={{ listStyleType: 'none' }}>
            {input.map((el, index) => {
                return (<li style={{ color: color }} key={index}><p className="text text_type_main-medium">{el}</p></li>)
            })}
        </ul>
    )
}


function FeedStatistics({ orders }: TFeedStatistics) {
    const N = 10;

    const completed = orders.filter(order => order.status === 'done').map(order => order.number.toString()) as string[];
    const inProgress = orders.filter(order => order.status === 'created').map(order => order.number.toString()) as string[];

    const completedArr = getSlicedArr(completed, N);
    const inProgressArr = getSlicedArr(inProgress, N);

    const today = new Date();
    const todayString = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

    const completedToday = orders.filter(order => {
        return order.status === 'done' && order.createdAt.split('T')[0].trim() === todayString
    })

    return (
        <div className={styles.containerOuter}>
            <div className={styles.completed}>
                <div className="ml-3"><p className="text text_type_main-medium">Готовы:</p></div>

                <div className={styles.flexHorizontal}>
                    {completedArr.map((el, index) => {
                        return <GetColumn key={index} input={el} color={'green'} />
                    })}
                </div>
            </div>
            <div className={styles.pending}>
                <div className="ml-3" ><p className="text text_type_main-medium">В работе:</p>  </div >
                <div className={styles.flexHorizontal}>
                    {inProgressArr.map((el, index) => {
                        return <GetColumn key={index} input={el} color={'white'} />
                    })}
                </div>
            </div>
            <div className={styles.total}>
                <p className="text text_type_main-medium">Выполнено за все время:</p>
                <p className="text text_type_digits-large">{completed.length}</p>

            </div>
            <div className={styles.today}>
                <p className="text text_type_main-medium">Выполнено за сегодня:</p>
                <p className="text text_type_digits-large">{completedToday.length}</p>
            </div>

        </div>
    )
}

export default FeedStatistics
