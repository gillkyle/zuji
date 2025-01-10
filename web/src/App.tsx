import { AppSidebar } from "@/components/app-sidebar";
import { ExampleTable } from "@/components/example-table";
import { ProseContainer } from "@/components/prose-container";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Tooltip, TooltipProvider } from "@/components/ui/tooltip";
import { WideContainer } from "@/components/wide-container";
import { TooltipContent, TooltipTrigger } from "@radix-ui/react-tooltip";
import { type ZujiOptions, type ZujiShortcut } from "../../src/index";

type TestCase = {
  value: number;
  options: ZujiOptions | ZujiShortcut | null;
  description: string;
};

const TEST_CASES: Array<TestCase> = [
  {
    value: 100,
    options: "small-currency",
    description: "Get a precise a currency like a dollar amount",
  },
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

const NUMBER_EXAMPLES: Array<TestCase> = [
  {
    value: 10000,
    options: {
      comma: true,
      precision: 4,
    },
    description: "Four decimal places",
  },
  {
    value: 10000.23,
    options: {
      sign: "+",
    },
    description: "Show plus sign",
  },
  {
    value: 100.1234,
    options: {
      comma: true,
      fill: "0=",
    },
    description: "Leading zeros",
  },
  {
    value: 10,
    options: {
      comma: true,
      fill: "0=",
    },
    description: "Leading zeros with decimals",
  },
  {
    value: 10000.1234,
    options: { d3format: "0[.]00000" },
    description: "Optional decimal point",
  },
];

const CURRENCY_EXAMPLES: Array<TestCase> = [
  {
    value: 1000.234,
    options: { d3format: "$0,0.00" },
    description: "Standard currency",
  },
  {
    value: 1000.2,
    options: { d3format: "0,0[.]00 $" },
    description: "Currency symbol at end",
  },
  {
    value: -1000.234,
    options: { d3format: "($0,0)" },
    description: "Negative with parentheses",
  },
  {
    value: 1230974,
    options: { d3format: "($ 0.00 a)" },
    description: "Abbreviated currency",
  },
];

const BYTE_EXAMPLES: Array<TestCase> = [
  {
    value: 100,
    options: { d3format: "0b" },
    description: "Bytes",
  },
  {
    value: 1024,
    options: { d3format: "0 ib" },
    description: "Binary bytes with space",
  },
  {
    value: 7884486213,
    options: { d3format: "0.00b" },
    description: "Bytes with precision",
  },
  {
    value: 3467479682787,
    options: { d3format: "0.000 ib" },
    description: "Binary bytes with precision",
  },
];

const PERCENTAGE_EXAMPLES: Array<TestCase> = [
  {
    value: 1,
    options: { d3format: "0%" },
    description: "Basic percentage",
  },
  {
    value: 0.974878234,
    options: { d3format: "0.000%" },
    description: "Three decimal places",
  },
  {
    value: -0.43,
    options: { d3format: "0 %" },
    description: "With space",
  },
  {
    value: 0.43,
    options: { d3format: "(0.000 %)" },
    description: "With parentheses",
  },
];

const TIME_EXAMPLES: Array<TestCase> = [
  {
    value: 25,
    options: { d3format: "00:00:00" },
    description: "Seconds",
  },
  {
    value: 238,
    options: { d3format: "00:00:00" },
    description: "Minutes and seconds",
  },
  {
    value: 63846,
    options: { d3format: "00:00:00" },
    description: "Hours, minutes, and seconds",
  },
];

const EXPONENTIAL_EXAMPLES: Array<TestCase> = [
  {
    value: 1123456789,
    options: { d3format: "0,0e+0" },
    description: "Standard exponential",
  },
  {
    value: 12398734.202,
    options: { d3format: "0.00e+0" },
    description: "With decimal precision",
  },
  {
    value: 0.000123987,
    options: { d3format: "0.000e+0" },
    description: "Small number exponential",
  },
];

export default function Page() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 border-b">
            <div className="flex items-center gap-2 px-3">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>
          <div className="flex flex-1 flex-col items-center gap-4 p-16">
            <ProseContainer>
              <h1 className="text-neutral-800 text-mono font-mono text-2xl font-semibold flex items-center justify-center">
                zuji
              </h1>
              <hr className="border-neutral-200 border-dashed" />
              <h2 className="text-neutral-900 font-normal text-xl">
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
                zuji aims to be:
                <ul>
                  <li>
                    <b>straightforward to pick up</b>, the entire API surface is
                    a single function + and a few exported types if you need
                    them
                  </li>
                  <li>
                    but <b>flexible</b> when you need to configure it
                  </li>
                </ul>
                The design leans into the principle of progressive disclosure.
                You can start using preconfigured options that are friendly and
                easy to understand, and tweak options as you need to.
              </p>
            </ProseContainer>
            <WideContainer>
              <ExampleTable examples={TEST_CASES} />
            </WideContainer>
            <ProseContainer>
              <h2>Installation</h2>
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

const formattedCurrency = zuji(100, "short-currency");
console.log(formattedCurrency); // $100
`}
                  </code>
                </pre>
              </p>
            </ProseContainer>

            <ProseContainer>
              <h2>Format Types</h2>

              <h3>Numbers</h3>
              <p>
                Use <code>0</code> for required digits and <code>#</code> for
                optional digits. Add commas for thousand separators and dots for
                decimal places.
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={NUMBER_EXAMPLES} />
            </div>

            <ProseContainer>
              <h3>Currency</h3>
              <p>
                Prefix with <code>$</code> or any currency symbol. Use
                parentheses for negative values.
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={CURRENCY_EXAMPLES} />
            </div>

            <ProseContainer>
              <h3>Bytes</h3>
              <p>
                Use <code>b</code> suffix for automatic byte conversion (B, KB,
                MB, GB, etc.).
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={BYTE_EXAMPLES} />
            </div>

            <ProseContainer>
              <h3>Percentages</h3>
              <p>
                Add <code>%</code> suffix for percentage formatting. Combines
                well with decimal precision.
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={PERCENTAGE_EXAMPLES} />
            </div>

            <ProseContainer>
              <h3>Time</h3>
              <p>
                Use <code>00:00:00</code> format for time representation in
                hours:minutes:seconds.
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={TIME_EXAMPLES} />
            </div>

            <ProseContainer>
              <h3>Exponential</h3>
              <p>
                Use <code>e+0</code> suffix for scientific notation.
              </p>
            </ProseContainer>
            <div className="w-full max-w-[1400px]">
              <ExampleTable examples={EXPONENTIAL_EXAMPLES} />
            </div>
          </div>
        </SidebarInset>
      </SidebarProvider>
    </TooltipProvider>
  );
}
