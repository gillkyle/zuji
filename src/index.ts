import { format } from "d3-format";

type ZujiOptions = {
  format?: string;
};

const SHORTCUT_FORMATS = {
  "short-currency": { format: "$,.2f", value: "short-currency" },
  "short-number": { format: ",.0f", value: "short-number" },
  "short-percent": { format: ".1%", value: "short-percent" },
  "short-decimal": { format: ".2f", value: "short-decimal" },
  "long-currency": { format: "$,.0f", value: "long-currency" },
  "long-number": { format: ",.0f", value: "long-number" },
} as const;

type ZujiShortcut = keyof typeof SHORTCUT_FORMATS;

/*
The general form of a specifier is:
`[​[fill]align][sign][symbol][0][width][,][.precision][~][type]

This is the API we are converting into something more heavily typed and well documented.
*/

export function zuji(number: number, options: ZujiShortcut | ZujiOptions = {}) {
  let formatString: string;

  if (typeof options === "string") {
    formatString = SHORTCUT_FORMATS[options].format;
  } else {
    formatString = options.format || ",";
  }

  return format(formatString)(number);
}
