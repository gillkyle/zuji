import { zuji, type ZujiOptions, type ZujiShortcut } from "../../../src/index";
import { Copyable } from "./copyable";

interface Example {
  value: number;
  options: ZujiOptions | ZujiShortcut | null;
  description: string;
}

interface ExampleTableProps {
  examples: Example[];
}

export function ExampleTable({ examples }: ExampleTableProps) {
  return (
    <div className="relative overflow-aut">
      <div className="overflow-hidden">
        <table className="border-collapse table-auto w-full text-xs">
          {/* <caption className="text-neutral-500 dark:text-neutral-400 pb-4 text-xs caption-top">
            Zuji by example
          </caption> */}
          <thead className="rounded-lg bg-neutral-50">
            <tr>
              <th className="border-t border-b font-medium p-3 pt-3 pb-3 text-neutral-400 text-left">
                Number
              </th>
              <th className="border-t border-b font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 text-left">
                Description
              </th>
              <th className="border-t border-b font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 text-left">
                Code
              </th>
              <th className="border-t border-b font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 text-left">
                Output
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {examples.map((example, index) => (
              <tr key={index}>
                <td className="border-t border-b border-neutral-200 border-dashed p-3 text-neutral-700 dark:text-neutral-400">
                  {example.value}
                </td>
                <td className="border-t border-b border-neutral-200 border-dashed p-3 text-neutral-500 dark:text-neutral-400">
                  {example.description}
                </td>
                <td className="border-t border-b border-neutral-200 border-dashed p-3 text-neutral-500 dark:text-neutral-400 font-mono min-w-48">
                  <Copyable
                    text={
                      example.options === null
                        ? `zuji(${example.value})`
                        : `zuji(${example.value}, ${JSON.stringify(example.options)})`
                    }
                  >
                    {example.options === null ? (
                      <code>
                        <span className="text-neutral-700 font-semibold">
                          zuji
                        </span>
                        ({example.value})
                      </code>
                    ) : (
                      <code>
                        <span className="text-neutral-700 font-semibold">
                          zuji
                        </span>
                        (
                        <span className="text-amber-600 font-medium">
                          {example.value}
                        </span>
                        ,{" "}
                        <span className="text-sky-600 font-medium">
                          {JSON.stringify(example.options, null, 2)}
                        </span>
                        )
                      </code>
                    )}
                  </Copyable>
                </td>
                <td className="border-t border-b border-neutral-200 border-dashed p-3 font-semibold text-neutral-700 dark:text-neutral-400">
                  {zuji(example.value, example.options)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
