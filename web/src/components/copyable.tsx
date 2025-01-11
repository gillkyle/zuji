import { useCopy } from "@/hooks/use-copy";
import { ClipboardCheckIcon, ClipboardCopyIcon } from "lucide-react";

interface CopyableProps {
  text: string;
  children: React.ReactNode;
}

export function Copyable({ text, children }: CopyableProps) {
  const { copied, handleCopy } = useCopy(text);

  return (
    <div className="group relative">
      {children}
      <button
        onClick={handleCopy}
        className="absolute right-2 top-1/2 -translate-y-1/2 opacity-20 group-hover:opacity-100 transition-opacity"
        aria-label={copied ? "Copied!" : "Copy to clipboard"}
      >
        {copied ? (
          <ClipboardCheckIcon size={16} className="text-green-500" />
        ) : (
          <ClipboardCopyIcon
            size={16}
            className="text-neutral-400 hover:text-neutral-600"
          />
        )}
      </button>
    </div>
  );
}
