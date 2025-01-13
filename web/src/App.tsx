import { ApiOption } from "@/components/api-option";
import { AppSidebar } from "@/components/app-sidebar";
import { ExampleTable } from "@/components/example-table";
import { Playground } from "@/components/playground";
import { ProseContainer } from "@/components/prose-container";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { WideContainer } from "@/components/wide-container";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { ExternalLinkIcon } from "lucide-react";
import { type ZujiOptions, type ZujiShortcut } from "../../src/index";

type TestCase = {
  value: number;
  options: ZujiOptions | ZujiShortcut | null;
  description: string;
};

const TEST_CASES: Array<TestCase> = [
  {
    value: 100,
    options: "short-currency",
    description:
      "Abbreviate a currency like a dollar amount that you expect to be a smallish value (<1000)",
  },
  {
    value: 100_000_000,
    options: "long-currency",
    description: "Display a precise currency like a dollar amount",
  },
  {
    value: 100_000_000,
    options: "big-currency",
    description: "Abbreviate a currency like a dollar amount",
  },
  {
    value: 1000,
    options: "small-number",
    description: "Shorten a number like a count",
  },
  {
    value: 1000,
    options: "short-number",
    description: "Shorten a number like a count",
  },
  {
    value: 0.53,
    options: "short-percent",
    description: "Shorten a percentage like a decimal",
  },
  {
    value: 1000,
    options: "long-number",
    description: "Lengthen a number like a count",
  },
  {
    value: Infinity,
    options: null,
    description: "Handle Infinity",
  },
  {
    value: -Infinity,
    options: null,
    description: "Handle -Infinity",
  },
] as const;

const STYLE_EXAMPLES: Array<TestCase> = [
  {
    value: 1234.56,
    options: { style: "decimal" },
    description: "Basic decimal formatting",
  },
  {
    value: 1234.56,
    options: { style: "currency", currency: "USD" },
    description: "US Dollar currency",
  },
  {
    value: 1234.56,
    options: { style: "currency", currency: "EUR" },
    description: "Euro currency",
  },
  {
    value: 0.1234,
    options: { style: "percent" },
    description: "Basic percentage",
  },
  {
    value: 123,
    options: { style: "unit", unit: "kilometer" },
    description: "Kilometer unit",
  },
  {
    value: 123,
    options: { style: "unit", unit: "mile" },
    description: "Mile unit",
  },
  {
    value: 21,
    options: { style: "unit", unit: "celsius" },
    description: "Temperature unit",
  },
];

const DIGIT_EXAMPLES: Array<TestCase> = [
  {
    value: 1.23,
    options: { minimumIntegerDigits: 3 },
    description: "Minimum integer digits (pad with zeros)",
  },
  {
    value: 123,
    options: { minimumIntegerDigits: 5 },
    description: "Minimum 5 integer digits",
  },
  {
    value: 1.2,
    options: { minimumFractionDigits: 3 },
    description: "Minimum fraction digits (pad with zeros)",
  },
  {
    value: 1.23456,
    options: { maximumFractionDigits: 2 },
    description: "Maximum 2 fraction digits (round)",
  },
  {
    value: 1234.5678,
    options: { minimumSignificantDigits: 6 },
    description: "Minimum 6 significant digits",
  },
  {
    value: 1234.5678,
    options: { maximumSignificantDigits: 3 },
    description: "Maximum 3 significant digits",
  },
  {
    value: 1.23456,
    options: { minimumFractionDigits: 2, maximumFractionDigits: 4 },
    description: "Between 2-4 fraction digits",
  },
  {
    value: 123.456,
    options: { minimumSignificantDigits: 4, maximumSignificantDigits: 6 },
    description: "Between 4-6 significant digits",
  },
];

const SIGN_DISPLAY_EXAMPLES: Array<TestCase> = [
  {
    value: 123,
    options: { signDisplay: "always" },
    description: "Always show sign",
  },
  {
    value: -123,
    options: { signDisplay: "always" },
    description: "Negative with always",
  },
  {
    value: 0,
    options: { signDisplay: "always" },
    description: "Zero with always",
  },
  {
    value: -123,
    options: { signDisplay: "exceptZero" },
    description: "Negative with zero",
  },
  {
    value: 0,
    options: { signDisplay: "exceptZero" },
    description: "Zero with exceptZero",
  },
  {
    value: 123,
    options: { signDisplay: "exceptZero" },
    description: "Positive with exceptZero",
  },
  {
    value: -123,
    options: { signDisplay: "negative" },
    description: "Show only negative signs",
  },
  {
    value: -123,
    options: { signDisplay: "never" },
    description: "Never show signs (negative)",
  },
  {
    value: 123,
    options: { signDisplay: "never" },
    description: "Never show signs (positive)",
  },
];

const NOTATION_EXAMPLES: Array<TestCase> = [
  {
    value: 1234,
    options: { notation: "scientific" },
    description: "Scientific notation",
  },
  {
    value: 1234,
    options: { notation: "compact", compactDisplay: "short" },
    description: "Compact notation (short)",
  },
  {
    value: 1234,
    options: { notation: "compact", compactDisplay: "long" },
    description: "Compact notation (long)",
  },
];

const LOCALE_EXAMPLES: Array<TestCase> = [
  {
    value: 1234567.89,
    options: { locale: "en-US" },
    description: "US English format",
  },
  {
    value: 1234567.89,
    options: { locale: "de-DE" },
    description: "German format",
  },
  {
    value: 1234567.89,
    options: { locale: "fr-FR" },
    description: "French format",
  },
  {
    value: 1234567.89,
    options: { locale: "ja-JP" },
    description: "Japanese format",
  },
  {
    value: 1234567.89,
    options: { locale: "es-ES" },
    description: "Spanish format",
  },
];

const ROUNDING_EXAMPLES: Array<TestCase> = [
  {
    value: 2.5,
    options: { roundingMode: "ceil" },
    description: "Round up to nearest integer",
  },
  {
    value: 2.5,
    options: { roundingMode: "floor" },
    description: "Round down to nearest integer",
  },
  {
    value: 1.234,
    options: {
      maximumSignificantDigits: 3,
      maximumFractionDigits: 2,
      roundingPriority: "morePrecision",
    },
    description:
      "Use more precise rounding between significant and fraction digits",
  },
  {
    value: 100.0,
    options: { trailingZeroDisplay: "stripIfInteger" },
    description: "Strip trailing zeros for integers",
  },
];

const CURRENCY_EXAMPLES: Array<TestCase> = [
  {
    value: 1234.56,
    options: { style: "currency", currency: "USD", currencyDisplay: "symbol" },
    description: "US Dollar with symbol",
  },
  {
    value: 1234.56,
    options: { style: "currency", currency: "EUR", currencyDisplay: "code" },
    description: "Euro with currency code",
  },
  {
    value: -1234.56,
    options: { style: "currency", currency: "JPY", currencySign: "accounting" },
    description: "Japanese Yen with accounting notation",
  },
];

const UNIT_EXAMPLES: Array<TestCase> = [
  {
    value: 123,
    options: { style: "unit", unit: "kilometer", unitDisplay: "short" },
    description: "Distance in kilometers (short)",
  },
  {
    value: 3.5,
    options: { style: "unit", unit: "liter", unitDisplay: "short" },
    description: "Volume in liters (short)",
  },
  {
    value: 21,
    options: { style: "unit", unit: "celsius", unitDisplay: "narrow" },
    description: "Temperature in Celsius (narrow)",
  },
  {
    value: 180,
    options: { style: "unit", unit: "degree", unitDisplay: "narrow" },
    description: "Angle in degrees (narrow)",
  },
  {
    value: 1024,
    options: { style: "unit", unit: "megabyte", unitDisplay: "long" },
    description: "Digital storage in megabytes (long)",
  },
  {
    value: 75,
    options: { style: "unit", unit: "kilogram", unitDisplay: "long" },
    description: "Weight in kilograms (long)",
  },
];

const GROUPING_EXAMPLES: Array<TestCase> = [
  {
    value: 1234567,
    options: { useGrouping: "always" },
    description: "Always use grouping separators",
  },
  {
    value: 1234,
    options: { useGrouping: "min2" },
    description: "Use grouping only for 2+ digit groups",
  },
  {
    value: 1234567,
    options: { useGrouping: false },
    description: "No grouping separators",
  },
];

export default function Page() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3 justify-between w-full">
              <div className="flex items-center gap-2">
                <SidebarTrigger />
                <Separator orientation="vertical" className="mr-2 h-4" />
                <div className="text-neutral-800 font-mono font-semibold">
                  千 zuji
                </div>
              </div>
              <a href="https://github.com/zuji-js/zuji">
                <Button variant="secondary">
                  <svg
                    height="32"
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    version="1.1"
                    width="32"
                    data-view-component="true"
                  >
                    <path d="M12.5.75C6.146.75 1 5.896 1 12.25c0 5.089 3.292 9.387 7.863 10.91.575.101.79-.244.79-.546 0-.273-.014-1.178-.014-2.142-2.889.532-3.636-.704-3.866-1.35-.13-.331-.69-1.352-1.18-1.625-.402-.216-.977-.748-.014-.762.906-.014 1.553.834 1.769 1.179 1.035 1.74 2.688 1.25 3.349.948.1-.747.402-1.25.733-1.538-2.559-.287-5.232-1.279-5.232-5.678 0-1.25.445-2.285 1.178-3.09-.115-.288-.517-1.467.115-3.048 0 0 .963-.302 3.163 1.179.92-.259 1.897-.388 2.875-.388.977 0 1.955.13 2.875.388 2.2-1.495 3.162-1.179 3.162-1.179.633 1.581.23 2.76.115 3.048.733.805 1.179 1.825 1.179 3.09 0 4.413-2.688 5.39-5.247 5.678.417.36.776 1.05.776 2.128 0 1.538-.014 2.774-.014 3.162 0 .302.216.662.79.547C20.709 21.637 24 17.324 24 12.25 24 5.896 18.854.75 12.5.75Z"></path>
                  </svg>
                  GitHub
                  <ExternalLinkIcon size={16} />
                </Button>
              </a>
            </div>
          </header>
          <div className="flex flex-1 flex-col items-center gap-4 p-4 sm:p-6 md:p-8 lg:p-10">
            <ProseContainer>
              <div className="flex items-center justify-center gap-2 text-lg my-2">
                千
              </div>
              <h1
                id="overview"
                className="text-neutral-800 text-mono font-mono text-2xl font-semibold flex items-center justify-center"
              >
                zuji
              </h1>
              <hr className="border-neutral-200 border-dashed" />
              <h2 className="text-neutral-900 font-semibold text-xl">
                TypeScript first, human-readable numeric formatting
              </h2>
              <p>zuji is a single function that takes two arguments:</p>
              <ol>
                <li>
                  <strong>value</strong> - The number to format.
                </li>
                <li>
                  <strong>options</strong> - The <b>strongly typed</b> options
                  to use for formatting.
                </li>
              </ol>
            </ProseContainer>
            <WideContainer>
              <div className="flex items-baseline justify-center gap-x-4 md:gap-x-8 lg:gap-x-12 border border-neutral-200 border-dashed rounded-lg p-6 py-20">
                <div className="text-neutral-400 text-sm font-medium font-mono">
                  154025
                </div>
                <div className="text-neutral-400 text-sm font-medium font-mono">
                  →
                </div>
                <div className="text-neutral-800 text-mono font-mono text-lg lg:text-xl xl:text-2xl font-semibold ">
                  zuji(
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-amber-600 font-medium px-2 py-0 bg-amber-50 rounded-lg mx-1">
                        value
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-neutral-900 text-amber-100 px-2 text-base"
                    >
                      number: number | NumeralString
                    </TooltipContent>
                  </Tooltip>
                  ,{" "}
                  <Tooltip>
                    <TooltipTrigger>
                      <span className="text-sky-600 font-medium px-2 py-0 bg-sky-50 rounded-lg mx-1">
                        options
                      </span>
                    </TooltipTrigger>
                    <TooltipContent
                      side="bottom"
                      className="bg-neutral-900 text-sky-100 px-2 text-base"
                    >
                      options?: ZujiShortcut | ZujiOptions
                    </TooltipContent>
                  </Tooltip>
                  )
                </div>
                <div className="text-neutral-400 text-sm font-medium font-mono">
                  =
                </div>
                <div className="text-neutral-400 text-sm font-medium font-mono">
                  $154k
                </div>
              </div>
            </WideContainer>
            <ProseContainer>
              <h2>Overview</h2>
              <p>
                zuji is a developer friendly API for formatting numbers. It is:
                <ul>
                  <li>
                    <b>straightforward to pick up</b>, the entire API surface is
                    a single function + a few exported types if you need them,
                    and makes formatting numbers easy
                  </li>
                  <li>
                    <b>standards based</b>, the API extends the{" "}
                    <code>Intl.NumberFormat</code> API, which makes the API you
                    pick up consistent with what is built-in to JavaScript
                    runtimes
                  </li>
                  <li>
                    <b>comprehensive</b>, the API covers virtually every option
                    you need to format numbers, and supports every ISO standard
                    locale out of the box
                  </li>
                  <li>
                    <b>tiny</b>, with <span>zero dependencies</span> and a
                    single purpose
                  </li>
                  <li>
                    and <b>flexible</b> when you need to configure it further
                  </li>
                </ul>
                The design leans into the principle of progressive disclosure.
                You can start using preconfigured{" "}
                <a href="#shortcuts">shortcuts</a> that are friendly and easy to
                understand, and tweak options as you need to.
              </p>
            </ProseContainer>
            <ProseContainer>
              <h2>Why zuji?</h2>
              <p>
                Number formatting is a task that is simple on the surface, but
                becomes increasingly complex when you introduce challenges like
                supporting different grouping separators (1,000 in US vs 1.000
                in Spain), currencies ($ vs ¥), notations (1,000,000 vs 1M vs
                1e6), rounding (0.99 {`->`} 100% vs 0.99 {`->`} 99%), and more.
              </p>
              <p>
                Web APIs set out to conquer many of these challenges, but it
                takes understanding the large number of options (documented in
                extra depth on this page) to implement them yourself.
              </p>
              <p>
                zuji gives you a method to cover these problems out of the box.{" "}
                <b>
                  You won't have to learn a new formatting grammar or pour
                  through MDN docs to get it right
                </b>
                .
              </p>
              <p className="italic">Why the name?</p>
              <p>
                The name zuji comes from the Japanese word sūji, which means
                "number" or "numeral", but had a 4 letter npm package name that
                wasn't already taken :)
              </p>
            </ProseContainer>
            <ProseContainer>
              <h2 id="installation">Installation</h2>
              <p>
                To use in your own project, install the package:
                <pre>
                  <code>npm install zuji</code>
                </pre>
                <pre>
                  <code>pnpm add zuji</code>
                </pre>
                <pre>
                  <code>bun add zuji</code>
                </pre>
                <pre>
                  <code>yarn add zuji</code>
                </pre>
                Then you can import the function and call it anywhere.
                <pre>
                  <code>
                    {`import { zuji } from "zuji";

const formattedNumber = zuji(1000);
console.log(formattedNumber); // 1,000
`}
                  </code>
                </pre>
              </p>
            </ProseContainer>
            <ProseContainer>
              <h2 id="shortcuts">Shortcuts</h2>
              <p>
                The easiest way to format numbers is to use the pre-configured
                shortcuts zuji offers.
              </p>
              <p>
                A shortcut is simply a string that maps to a combination of
                options that will be applied automatically. These shortcuts
                cover the most common use cases for number formatting. If your
                case extends beyond these, you can use the{" "}
                <a href="#api-reference">API Reference</a> to configure the
                options yourself.
              </p>
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={TEST_CASES} />
            </WideContainer>
            <ProseContainer>
              <h2 id="playground">Interactive Playground</h2>
              <p>
                Use this playground to experiment with different formatting
                options and see the results in real-time. Add additional test
                cases to see how options work on different numbers.
              </p>
            </ProseContainer>
            <Playground />
            <ProseContainer>
              <h2 id="api-reference">API Reference</h2>
              <p></p>
            </ProseContainer>
            <ProseContainer>
              <ApiOption
                name="style"
                nativeType="string"
                description="Control the basic formatting style of the provided number."
                possibleValues={[
                  {
                    value: "decimal",
                    description:
                      "Plain number formatting, that will add commas and decimal points.",
                    default: true,
                  },
                  {
                    value: "currency",
                    description:
                      "Currency formatting for with symbols like $ or abbreviations like USD.",
                  },
                  {
                    value: "percent",
                    description:
                      "Percentage formatting, that will add a % symbol and convert 0-1 decimals into a percentage.",
                  },
                  {
                    value: "unit",
                    description:
                      "Unit formatting, that will add a unit like km, mi, C, F, etc. from sanctioned CLDR units.",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={STYLE_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="unit"
                nativeType="string"
                description="The unit to use for formatting. Required when style is 'unit'."
                possibleValues={[
                  {
                    value: "kilometer",
                    description: "Distance in kilometers",
                  },
                  {
                    value: "celsius",
                    description: "Temperature in Celsius",
                  },
                  {
                    value: "megabyte",
                    description: "Digital storage in megabytes",
                  },
                  // Add more common units as needed
                ]}
              />
              <ApiOption
                name="unitDisplay"
                nativeType="string"
                description="How to display the unit."
                possibleValues={[
                  {
                    value: "short",
                    description: "Short unit formatting (e.g., 16 km)",
                    default: true,
                  },
                  {
                    value: "narrow",
                    description: "Narrow unit formatting (e.g., 16km)",
                  },
                  {
                    value: "long",
                    description: "Long unit formatting (e.g., 16 kilometers)",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={UNIT_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="notation"
                nativeType="string"
                description="Choose different notations for number display."
                possibleValues={[
                  {
                    value: "standard",
                    description: "Standard decimal notation",
                    default: true,
                  },
                  {
                    value: "scientific",
                    description: "Scientific notation (e.g. 1.23e4)",
                  },
                  {
                    value: "engineering",
                    description: "Engineering notation (e.g. 12.3E3)",
                  },
                  {
                    value: "compact",
                    description: "Compact notation (e.g. 1K, 1M, 1B)",
                  },
                ]}
              />
              <ApiOption
                name="compactDisplay"
                nativeType="string"
                description="How to display compact numbers. Only used when notation is 'compact'."
                possibleValues={[
                  {
                    value: "short",
                    description: "Short compact notation (e.g., 12K)",
                    default: true,
                  },
                  {
                    value: "long",
                    description: "Long compact notation (e.g., 12 thousand)",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={NOTATION_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="minimumIntegerDigits"
                nativeType="number"
                description="The minimum number of integer digits to use. Possible values are from 1 to 21. Can be useful for cases like spreadsheets or data grids adding leading zeros."
                possibleValues={[
                  {
                    value: "1-21",
                    description: "Number between 1 and 21",
                  },
                ]}
              />
              <ApiOption
                name="minimumFractionDigits"
                nativeType="number"
                description="The minimum number of fraction digits to use. Possible values are from 0 to 20. Useful for cases like spreadsheets or data grids adding trailing zeros."
                possibleValues={[
                  {
                    value: "0-20",
                    description: "Number between 0 and 20",
                  },
                ]}
              />
              <ApiOption
                name="maximumFractionDigits"
                nativeType="number"
                description="The maximum number of fraction digits to use. Possible values are from 0 to 20."
                possibleValues={[
                  {
                    value: "0-20",
                    description: "Number between 0 and 20",
                  },
                ]}
              />
              <ApiOption
                name="minimumSignificantDigits"
                nativeType="number"
                description="The minimum number of significant digits to use. Possible values are from 1 to 21."
                possibleValues={[
                  {
                    value: "1-21",
                    description: "Number between 1 and 21",
                  },
                ]}
              />
              <ApiOption
                name="maximumSignificantDigits"
                nativeType="number"
                description="The maximum number of significant digits to use. Possible values are from 1 to 21."
                possibleValues={[
                  {
                    value: "1-21",
                    description: "Number between 1 and 21",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={DIGIT_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="signDisplay"
                nativeType="string"
                description="Control when and how number signs are displayed."
                possibleValues={[
                  {
                    value: "auto",
                    description: "Sign display for negative numbers only",
                    default: true,
                  },
                  {
                    value: "always",
                    description: "Always display the sign",
                  },
                  {
                    value: "exceptZero",
                    description: "Display the sign for all numbers except zero",
                  },
                  {
                    value: "negative",
                    description: "Display the sign for negative numbers only",
                  },
                  {
                    value: "never",
                    description: "Never display the sign",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={SIGN_DISPLAY_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="roundingMode"
                nativeType="string"
                description="Control how numbers are rounded when they exceed the maximum number of digits."
                possibleValues={[
                  {
                    value: "halfExpand",
                    description: "Round away from zero at the halfway point",
                    default: true,
                  },
                  {
                    value: "ceil",
                    description: "Round toward positive infinity",
                  },
                  {
                    value: "floor",
                    description: "Round toward negative infinity",
                  },
                  {
                    value: "expand",
                    description: "Round away from zero",
                  },
                  {
                    value: "trunc",
                    description: "Round toward zero",
                  },
                  {
                    value: "halfCeil",
                    description:
                      "Round toward positive infinity at halfway point",
                  },
                  {
                    value: "halfFloor",
                    description:
                      "Round toward negative infinity at halfway point",
                  },
                  {
                    value: "halfTrunc",
                    description: "Round toward zero at halfway point",
                  },
                  {
                    value: "halfEven",
                    description:
                      "Round toward nearest even number at halfway point",
                  },
                ]}
              />
              <ApiOption
                name="roundingIncrement"
                nativeType="number"
                description="Specify the increment to which numbers should be rounded."
                possibleValues={[
                  {
                    value: "1",
                    description: "Round to whole numbers",
                    default: true,
                  },
                  {
                    value: "2, 5, 10, 20, 25, 50, 100, ...",
                    description: "Round to specified increment",
                  },
                ]}
              />
              <ApiOption
                name="roundingPriority"
                nativeType="string"
                description="Control how conflicts between significant digits and fraction digits rounding are resolved."
                possibleValues={[
                  {
                    value: "auto",
                    description:
                      "Use significant digits if specified, otherwise fraction digits",
                    default: true,
                  },
                  {
                    value: "morePrecision",
                    description:
                      "Use the option that results in more precision",
                  },
                  {
                    value: "lessPrecision",
                    description:
                      "Use the option that results in less precision",
                  },
                ]}
              />
              <ApiOption
                name="trailingZeroDisplay"
                nativeType="string"
                description="Control how trailing zeros in the fraction should be displayed."
                possibleValues={[
                  {
                    value: "auto",
                    description:
                      "Show trailing zeros according to minimum digits settings",
                    default: true,
                  },
                  {
                    value: "stripIfInteger",
                    description:
                      "Remove trailing zeros if the number is an integer",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={ROUNDING_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="currency"
                nativeType="string"
                description="The currency to use for formatting. Required when style is 'currency'."
                possibleValues={[
                  {
                    value: "USD",
                    description: "US Dollar",
                  },
                  {
                    value: "EUR",
                    description: "Euro",
                  },
                  {
                    value: "JPY",
                    description: "Japanese Yen",
                  },
                  // Add more common currencies as needed
                ]}
              />
              <ApiOption
                name="currencyDisplay"
                nativeType="string"
                description="How to display the currency."
                possibleValues={[
                  {
                    value: "symbol",
                    description: "Use currency symbol (e.g., $)",
                    default: true,
                  },
                  {
                    value: "narrowSymbol",
                    description: "Use narrow symbol (e.g., $ instead of US$)",
                  },
                  {
                    value: "code",
                    description: "Use currency code (e.g., USD)",
                  },
                  {
                    value: "name",
                    description: "Use currency name (e.g., US Dollar)",
                  },
                ]}
              />
              <ApiOption
                name="currencySign"
                nativeType="string"
                description="How to handle negative currency values."
                possibleValues={[
                  {
                    value: "standard",
                    description: "Use minus sign (e.g., -$1.00)",
                    default: true,
                  },
                  {
                    value: "accounting",
                    description: "Use accounting notation (e.g., ($1.00))",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={CURRENCY_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="useGrouping"
                nativeType="boolean | string"
                description="Whether and how to use grouping separators."
                possibleValues={[
                  {
                    value: "auto",
                    description: "Use locale preferences",
                    default: true,
                  },
                  {
                    value: "always",
                    description: "Always use grouping separators",
                  },
                  {
                    value: "min2",
                    description: "Use separators for 2+ digit groups",
                  },
                  {
                    value: "true",
                    description:
                      "Same as always, ie always use grouping separators",
                  },
                  {
                    value: "false",
                    description: "Never use grouping separators",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={GROUPING_EXAMPLES} />
            </WideContainer>
            <ProseContainer>
              <ApiOption
                name="locale"
                nativeType="string"
                description="Format numbers according to different locale conventions. Possible values are any valid ISO 4217 locale. A few examples are provided below. zuji will automatically find the best fit locale if one is not specified."
                possibleValues={[
                  {
                    value: "en-US",
                    description: "US English format",
                    default: true,
                  },
                  {
                    value: "de-DE",
                    description: "German format",
                  },
                  {
                    value: "fr-FR",
                    description: "French format",
                  },
                  {
                    value: "ja-JP",
                    description: "Japanese format",
                  },
                  {
                    value: "es-ES",
                    description: "Spanish format",
                  },
                ]}
              />
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={LOCALE_EXAMPLES} />
            </WideContainer>
            <footer className="bg-white mt-8">
              <div className="mx-auto max-w-7xl px-6 py-12 md:flex md:items-center md:justify-between">
                <div className="flex justify-center space-x-6 md:order-2">
                  <a
                    target="_blank"
                    href="https://github.com/gillkyle/zuji"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">GitHub</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </a>
                  <a
                    target="_blank"
                    href="https://twitter.com/gill_kyle"
                    className="text-gray-400 hover:text-gray-500"
                  >
                    <span className="sr-only">Twitter</span>
                    <svg
                      className="h-6 w-6"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                      aria-hidden="true"
                    >
                      <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                    </svg>
                  </a>
                </div>
                <div className="mt-8 md:order-1 md:mt-0 px-6">
                  <p className="text-center text-sm leading-5 text-gray-500">
                    &copy; {new Date().getFullYear()} All rights reserved.
                  </p>
                </div>
              </div>
            </footer>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
