import { useState } from "react";

import { zuji } from "../../src/index";

const TEST_CASES = [
  {
    value: 100,
    format: "short-currency",
    description: "Shorten a currency like a dollar amount",
  },
  {
    value: 1000,
    format: "short-number",
    description: "Shorten a number like a count",
  },
  {
    value: 0.53,
    format: "short-percent",
    description: "Shorten a percentage like a decimal",
  },
  {
    value: 100,
    format: "long-currency",
    description: "Lengthen a currency like a dollar amount",
  },
  {
    value: 1000,
    format: "long-number",
    description: "Lengthen a number like a count",
  },
] as const;

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Zuji</h1>
      <h2>{zuji(1000000, "short-currency")}</h2>
      <div className="relative rounded-xl overflow-auto bg-slate-50">
        <div className="shadow-sm overflow-hidden px-4 py-8 sm:px-8">
          <table className="border-collapse table-auto w-full text-sm">
            <caption className="text-slate-500 dark:text-slate-400 pb-4 text-xs caption-top">
              Zuji by example
            </caption>
            <thead>
              <tr>
                <th className="border dark:border-slate-600 font-medium p-4 pl-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Value
                </th>
                <th className="border dark:border-slate-600 font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Code
                </th>
                <th className="border dark:border-slate-600 font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Format
                </th>
                <th className="border dark:border-slate-600 font-medium p-4 pr-8 pt-3 pb-3 text-slate-400 dark:text-slate-200 text-left">
                  Result
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-slate-800">
              {TEST_CASES.map((testCase) => (
                <tr>
                  <td className="border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {testCase.value}
                  </td>
                  <td className="border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {testCase.description}
                  </td>
                  <td className="border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    <code>
                      zuji({testCase.value}, "{testCase.format}")
                    </code>
                  </td>
                  <td className="border border-slate-200 dark:border-slate-600 p-4 pl-8 text-slate-500 dark:text-slate-400">
                    {zuji(testCase.value, testCase.format)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
