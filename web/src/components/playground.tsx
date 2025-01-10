import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useState } from "react";
import { zuji, type ZujiOptions, type ZujiShortcut } from "../../../src/index";

const TYPE_OPTIONS: { value: ZujiShortcut; label: string }[] = [
  { value: "small-currency", label: "Small Currency (precise dollar amounts)" },
  { value: "short-currency", label: "Short Currency (abbreviated <1000)" },
  { value: "long-currency", label: "Long Currency (precise large amounts)" },
  { value: "big-currency", label: "Big Currency (abbreviated large amounts)" },
  { value: "small-number", label: "Small Number (shortened counts)" },
  { value: "short-number", label: "Short Number (abbreviated counts)" },
  { value: "short-percent", label: "Short Percent (decimal percentages)" },
  { value: "long-number", label: "Long Number (full number display)" },
];

export function Playground() {
  const [value, setValue] = useState("1234.56");
  const [type, setType] = useState<ZujiShortcut>("small-currency");
  const [options, setOptions] = useState<ZujiOptions>({
    comma: true,
    precision: 2,
    sign: undefined,
    fill: undefined,
    d3format: "",
  });

  const formattedValue = zuji(Number(value), type || options);

  return (
    <div className="w-full max-w-3xl border border-neutral-200 rounded-lg p-6">
      <h3 className="text-xl font-semibold mb-6">Playground</h3>

      <div className="space-y-6">
        {/* Input value */}
        <div className="space-y-2">
          <Label htmlFor="value">Number to format</Label>
          <Input
            id="value"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Enter a number..."
          />
        </div>

        {/* Type selector */}
        <div className="space-y-2">
          <Label htmlFor="type">Format Type</Label>
          <Select
            value={type}
            onValueChange={(value) => setType(value as ZujiShortcut)}
          >
            <SelectTrigger id="type">
              <SelectValue placeholder="Select a format type" />
            </SelectTrigger>
            <SelectContent>
              {TYPE_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Comma option */}
          <div className="flex items-center justify-between">
            <Label htmlFor="comma">Use comma separators</Label>
            <Switch
              id="comma"
              checked={options.comma}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, comma: checked }))
              }
            />
          </div>

          {/* Precision option */}
          <div className="space-y-2">
            <Label htmlFor="precision">Precision (decimal places)</Label>
            <Input
              id="precision"
              type="number"
              min={0}
              max={20}
              value={options.precision || ""}
              onChange={(e) =>
                setOptions((prev) => ({
                  ...prev,
                  precision: e.target.value
                    ? Number(e.target.value)
                    : undefined,
                }))
              }
            />
          </div>

          {/* Sign option */}
          <div className="flex items-center justify-between">
            <Label htmlFor="sign">Show plus sign</Label>
            <Switch
              id="sign"
              checked={Boolean(options.sign)}
              onCheckedChange={(checked) =>
                setOptions((prev) => ({ ...prev, sign: checked ? "+" : false }))
              }
            />
          </div>

          {/* Fill option */}
          <div className="space-y-2">
            <Label htmlFor="fill">Fill character</Label>
            <Input
              id="fill"
              value={options.fill || ""}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, fill: e.target.value }))
              }
              placeholder="e.g. 0="
            />
          </div>

          {/* D3Format option */}
          <div className="space-y-2">
            <Label htmlFor="d3format">D3 Format string</Label>
            <Input
              id="d3format"
              value={options.d3format || ""}
              onChange={(e) =>
                setOptions((prev) => ({ ...prev, d3format: e.target.value }))
              }
              placeholder="e.g. $0,0.00"
            />
          </div>
        </div>

        {/* Output */}
        <div className="mt-8 p-4 bg-neutral-50 rounded-lg">
          <div className="text-sm text-neutral-500 mb-2">Output:</div>
          <div className="font-mono text-lg">{formattedValue}</div>
        </div>
      </div>
    </div>
  );
}
