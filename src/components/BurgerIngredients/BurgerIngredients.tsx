

import { useState, useRef } from "react";
import {
    Tab
} from '@ya.praktikum/react-developer-burger-ui-components';

const BurgerConstructor =(props: any)=>{
    const [current, setCurrent] = useState('one')


    const ref1 = useRef<HTMLDivElement>(null);
    const ref2 = useRef<HTMLDivElement>(null);
    const ref3 = useRef<HTMLDivElement>(null);


    const getToOne = (e:any)=>{
        setCurrent("one");
        ref1.current?.scrollIntoView({behavior:"smooth"});
    }

    const getToTwo = (e:any)=>{
        setCurrent("two");
        ref2.current?.scrollIntoView({behavior:"smooth"});
    }

    const getToThree = (e:any)=>{
        setCurrent("three");
        ref3.current?.scrollIntoView({behavior:"smooth"});
    }


    return (
        <section>
            <h1>Соберите бургер</h1>
            <div style={{ display: 'flex' }}>
                <Tab value="one" active={current === 'one'} onClick={getToOne}>
                    <h1 >One</h1>
                </Tab>
                <Tab value="two" active={current === 'two'} onClick={getToTwo}>
                    <h1>Two</h1>
                </Tab>
                <Tab value="three" active={current === 'three'} onClick={getToThree}>
                   <h1>Three</h1> 
                </Tab>
            </div>
            <div style={{height:'900px', overflow:'auto'}}>
                <div id="oneDiv" ref={ref1} style={{height:'600px', backgroundColor:'blue'}}>
                    <h2>One</h2>
                </div>
                <div id="twoDiv" ref={ref2} style={{height:'600px', backgroundColor:'red'}}>
                    <h2>Two</h2>
                </div>
                <div id="threeDiv" ref={ref3} style={{height:'600px', backgroundColor:'green'}}>
                    <h2>Three</h2>
                </div>
            </div>
        </section>
    )
}

export default BurgerConstructor;