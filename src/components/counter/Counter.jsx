import { useState } from 'react';
import './Counter.css';
import CounterButton from './CounterButton';

export default function Counter() {
    const [count, setCount] = useState(0);

    function incrementCounterFunction(by) {
        setCount(count + by);
        console.log(count);
        // console.log("Counter Button clicked");
    }

    function decrementCounterFunction(by) {
        setCount(count - by);
        console.log(count);
        // console.log("Counter Button clicked");
    }

    function resetCounter() {
        setCount(0);
    }

    return (
        <>
            <span className="count">{count}</span>
            <CounterButton by={1} incrementMethod={incrementCounterFunction} decmentMethod={decrementCounterFunction} />
            <CounterButton by={2} incrementMethod={incrementCounterFunction} decmentMethod={decrementCounterFunction} />
            <CounterButton by={5} incrementMethod={incrementCounterFunction} decmentMethod={decrementCounterFunction} />
            <button className='resetButton' onClick={resetCounter}>Reset</button>
        </>
    )
}

