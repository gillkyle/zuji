import { useState } from "react";

export function useCopy(text: string) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 500);
    } catch (err) {
      console.error("Failed to copy text:", err);
    }
  };

  return { copied, handleCopy };
}
