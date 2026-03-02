import { useState } from "react";

export default function AdvancedCounter(){


    //default value of the count is zero
    const [count, setCount] = useState<number>(0);



    //handles the increment
    function handleIncrement(){

    }

    //handles decrement
    function handleDecrement(){
        
    }

    return (
        <div>
            <div>
                <h2>Counter</h2>
                <h1>Current Count: </h1>
            </div>
            <div >
                <button>Increment</button>
                <button>Decrement</button>
                <button>Reset</button>
            </div>
        </div>
    )
}