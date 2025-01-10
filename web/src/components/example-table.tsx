import { zuji, type ZujiOptions, type ZujiShortcut } from "../../../src/index";

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
    <div className="relative rounded-xl overflow-auto bg-neutral-50">
      <div className="shadow-sm overflow-hidden p-4">
        <table className="border-collapse table-auto w-full text-xs">
          <caption className="text-neutral-500 dark:text-neutral-400 pb-4 text-xs caption-top">
            Zuji by example
          </caption>
          <thead className="rounded-lg">
            <tr>
              <th className="border dark:border-slate-600 font-medium p-3 pt-3 pb-3 text-neutral-400 dark:text-neutral-200 text-left">
                Number
              </th>
              <th className="border dark:border-slate-600 font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 dark:text-neutral-200 text-left">
                Description
              </th>
              <th className="border dark:border-slate-600 font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 dark:text-neutral-200 text-left">
                Code
              </th>
              <th className="border dark:border-slate-600 font-medium p-3 pr-8 pt-3 pb-3 text-neutral-400 dark:text-neutral-200 text-left">
                String
              </th>
            </tr>
          </thead>
          <tbody className="bg-white dark:bg-slate-800">
            {examples.map((example, index) => (
              <tr key={index}>
                <td className="border border-slate-200 dark:border-slate-600 p-3 text-neutral-500 dark:text-neutral-400">
                  {example.value}
                </td>
                <td className="border border-slate-200 dark:border-slate-600 p-3 text-neutral-500 dark:text-neutral-400">
                  {example.description}
                </td>
                <td className="border border-slate-200 dark:border-slate-600 p-3 text-neutral-500 dark:text-neutral-400 font-mono min-w-48">
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
                        {JSON.stringify(example.options)}
                      </span>
                      )
                    </code>
                  )}
                </td>
                <td className="border border-slate-200 dark:border-slate-600 p-3 text-neutral-500 dark:text-neutral-400">
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
