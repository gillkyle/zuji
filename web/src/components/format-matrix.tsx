import { zuji } from "../../../src/index";

interface FormatCell {
  value: string;
  format: string;
  description?: string;
}

const SOURCE_NUMBER = 1540.1;

// I think the best way to do this might be to have 2 combo shortcuts in a template string. Never more than 2. Each 1 has a set of options configured by default. Then we put every combo shortcut down the column and rows like this:
/*
| --- | --- | short | long | int | decimal | pct |
| --- | --- | --- | --- | --- | --- | --- |
| short | 1.5k | 1.5k | 1.5k | 1.5k | 1.5k | 1.5k |
| long | 1,500 | 1,500 | 1,500 | 1,500 | 1,500 | 1,500 |
| int | 1,500 | 1,500 | 1,500 | 1,500 | 1,500 | 1,500 |
| decimal | 1,540.1 | 1,540.1 | 1,540.1 | 1,540.1 | 1,540.1 | 1,540.1 |
| pct | 154,010% | 154,010% | 154,010% | 154,010% | 154,010% | 154,010% |
*/

const formatMatrix: Record<string, Record<string, FormatCell>> = {
  "1540.1": {
    "---": { value: zuji(SOURCE_NUMBER), format: "default" },
    "1540.1": {
      value: zuji(SOURCE_NUMBER, { precision: 1 }),
      format: "precision: 1",
    },
    pct: { value: zuji(SOURCE_NUMBER, { type: "p" }), format: "type: 'p'" },
    int: {
      value: zuji(SOURCE_NUMBER, { precision: 0 }),
      format: "precision: 0",
    },
    decimal: {
      value: zuji(SOURCE_NUMBER, { precision: 1 }),
      format: "precision: 1",
    },
  },
  "---": {
    "1540.1": { value: zuji(SOURCE_NUMBER), format: "default" },
    short: { value: zuji(SOURCE_NUMBER, { type: "s" }), format: "type: 's'" },
    long: {
      value: zuji(SOURCE_NUMBER, { comma: true }),
      format: "comma: true",
    },
  },
  short: {
    "1.5k": {
      value: zuji(SOURCE_NUMBER, { type: "s", precision: 1 }),
      format: "type: 's', precision: 1",
    },
  },
  long: {
    "1,500": {
      value: zuji(SOURCE_NUMBER, { comma: true, precision: 0 }),
      format: "comma: true, precision: 0",
    },
  },
};

export function FormatMatrix() {
  // Get unique column and row headers
  const columnHeaders = Array.from(
    new Set(Object.values(formatMatrix).flatMap((row) => Object.keys(row)))
  );
  const rowHeaders = Object.keys(formatMatrix);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2 bg-neutral-50"></th>
            {columnHeaders.map((header) => (
              <th key={header} className="border p-2 bg-neutral-50 font-mono">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rowHeaders.map((rowHeader) => (
            <tr key={rowHeader}>
              <th className="border p-2 bg-neutral-50 font-mono">
                {rowHeader}
              </th>
              {columnHeaders.map((colHeader) => {
                const cell = formatMatrix[rowHeader]?.[colHeader];
                return (
                  <td key={colHeader} className="border p-2 font-mono">
                    {cell?.value || ""}
                    {cell?.description && (
                      <div className="text-xs text-neutral-500">
                        {cell.description}
                      </div>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
