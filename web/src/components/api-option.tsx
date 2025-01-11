import { Badge } from "@/components/ui/badge";

export function ApiOption({
  name,
  nativeType,
  description,
  possibleValues,
}: {
  name: string;
  nativeType: string;
  description: string;
  possibleValues: Array<{
    value: string;
    description: string;
    default?: boolean;
  }>;
}) {
  return (
    <div className="flex flex-col gap-1 my-6" id={`${name}-option`}>
      <div className="flex items-center gap-1">
        <p className="m-0 mb-1 -ml-2 font-mono text-lg font-semibold bg-sky-50 w-max px-2 rounded-sm text-sky-800">
          {name}
        </p>
        - <span className="font-mono text-neutral-500">{nativeType}</span>
      </div>
      <p className="m-0">{description}</p>
      <ul className="m-1">
        {possibleValues.map((posValue) => (
          <li key={`${name}-${posValue.value}`}>
            <span className="font-mono font-semibold">{posValue.value}</span>:{" "}
            {posValue.default && (
              <Badge variant="secondary" className="text-xs px-2 py-0.5 mx-1">
                default
              </Badge>
            )}
            {posValue.description}
          </li>
        ))}
      </ul>
    </div>
  );
}
