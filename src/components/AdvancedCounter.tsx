import { useState } from "react";

const COUNT_KEY = "count_counter"

export default function AdvancedCounter(){


    //checks if Count_key local storage key value is emply if so sets its value to zero
    const [count, setCount] = useState<number>(() =>  localStorage.getItem(COUNT_KEY) !==null ? Number(localStorage.getItem(COUNT_KEY)):0);

    //history state
    const [countHistory, setCountHistory] = useState<number[]>(()=>[count]);


    //seting up state for step
    const [step, setStep] = useState<number>(1);



    //handles the increment
    function handleIncrement(){

    }

    //handles decrement
    function handleDecrement(){
        
    }

    return (
        <div className="w-full max-w-lg rounded-xl border bg-white p-6 shadow">
            <div >
                <h2 className="text-center text-sm text-gray-600">Counter</h2>
                <h1>Current Count: </h1>
            </div>
            <div className="mt-6 flex items-center justify-center gap-6">
                <button className="basis-64">Increment</button>
                <button className="basis-64">Decrement</button>
                <button className="basis-64">Reset</button>
            </div>
        </div>
    )
}