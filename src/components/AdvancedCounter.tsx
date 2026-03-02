import { useEffect, useState } from "react";

const COUNT_KEY = "count_counter";

export default function AdvancedCounter() {
  //checks if Count_key local storage key value is emply if so sets its value to zero
  const [count, setCount] = useState<number>(() =>
    localStorage.getItem(COUNT_KEY) !== null
      ? Number(localStorage.getItem(COUNT_KEY))
      : 0,
  );

  //history state
  const [countHistory, setCountHistory] = useState<number[]>(() => [count]);

  //seting up state for step
  const [step, setStep] = useState<number>(1);

  //save UI state
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  useEffect(() => {
    setCountHistory((previousCountHistory) => [...previousCountHistory, count]);
  }, [count]);

  //timeout
  useEffect(() => {
    setStatus("saving");
    const timeout = window.setTimeout(() => {
      localStorage.setItem(COUNT_KEY, String(count));
      setStatus("saved");
    }, 600);

    return () => {
      clearTimeout(timeout);
    };
  }, [step,count]);

  //handles the increment
  function increment() {
    setCount((prev) => prev + step);
  }

  //handles decrement
  function decrement() {
    setCount((prev) => prev - step);
  }

  return (
    <div className="w-full max-w-lg rounded-xl border bg-white p-6 shadow">
      <div>
        <h2 className="text-center text-sm text-gray-600">Counter</h2>
        <h1>Current Count: {count}</h1>
      </div>
      <div className="mt-6 flex items-center justify-center gap-6">
        <button className="basis-64" onClick={increment}>
          Increment
        </button>
        <button className="basis-64" onClick={decrement}>
          Decrement
        </button>
        <button
          className="basis-64"
          onClick={() => {
            setCount(0);
            setCountHistory([]);
            localStorage.removeItem(COUNT_KEY);
            setStep(1);
          }}
        >
          Reset
        </button>
      </div>
      <div>
        <label>
          <input
            type="number"
            value={step}
            onChange={(e) => setStep(Number(e.target.value))}
          />
        </label>
      </div>
      <p>{status}</p>

      <div>
        <p>Count History</p>
        {countHistory.map((value, index) => {
          return <div key={index}>{value}</div>;
        })}
      </div>
      <div>
        <p>Use ArrowUp to increment and ArrowDown to decrement.</p>
      </div>
    </div>
  );
}
