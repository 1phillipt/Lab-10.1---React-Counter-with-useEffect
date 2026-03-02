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
  const [status, setStatus] = useState<
    "idle" | "changes saving" | "changes saved"
  >("idle");

  useEffect(() => {
    setCountHistory((previousCountHistory) => [...previousCountHistory, count]);
  }, [count]);

  //timeout
  useEffect(() => {
    setStatus("changes saving");
    const timeout = window.setTimeout(() => {
      localStorage.setItem(COUNT_KEY, String(count));
      setStatus("changes saved");
    }, 600);
    return () => {
      clearTimeout(timeout);
    };
  }, [step, count]);

  //handles the increment
  function increment() {
    setCount((prev) => prev + step);
  }

  //handles decrement
  function decrement() {
    setCount((prev) => prev - step);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-lg rounded-xl border bg-white p-8 shadow-lg space-y-6">
        <div className="text-center space-y-2">
          <h2 className="text-sm text-gray-500 uppercase tracking-wide">
            Counter
          </h2>
          <h1 className="text-4xl font-bold">{count}</h1>
        </div>
        <div className="mt-6 flex items-center justify-center gap-6">
          <button
            className="flex-1 rounded-lg bg-blue-500 text-white px-4 py-2 font-medium transition hover:bg-white-600 active:scale-95"
            onClick={increment}
          >
            Increment
          </button>
          <button
            className="flex-1 rounded-lg bg-red-500 text-white px-4 py-2 font-medium transition hover:bg-white-600 active:scale-95"
            onClick={decrement}
          >
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
              className="w-24 border rounded-md px-3 py-1 text-center focus:outline-none focus:ring-2 focus:ring-blue-400"
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
    </div>
  );
}
