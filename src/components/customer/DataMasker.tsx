import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

export interface DataMaskerProps {
  value: string;
  maskedValue?: string;
  type?: "account" | "mobile" | "email" | "id";
  className?: string;
}

export function DataMasker({
  value,
  maskedValue,
  type = "account",
  className = "",
}: DataMaskerProps) {
  const [revealed, setRevealed] = useState(false);

  const getMasked = () => {
    if (maskedValue) return maskedValue;
    if (!value) return "";
    if (type === "mobile") {
      // e.g. +63 917 555 1234 -> +63 XXX XXX 1234
      return value.replace(
        /(\+\d{2}\s*)?(\d{3})\s*(\d{3})\s*(\d{4})/,
        "$1 XXX XXX $4",
      );
    }
    if (type === "email") {
      // e.g. juan.delacruz@gmail.com -> j***@gmail.com
      const parts = value.split("@");
      if (parts.length === 2) {
        return `${parts[0][0]}***@${parts[1]}`;
      }
      return value;
    }
    if (type === "account" || type === "id") {
      if (value.length > 4) {
        return `XXXX XXXX ${value.slice(-4)}`;
      }
      return `XXXX ${value}`;
    }
    return "XXXXXXX";
  };

  return (
    <span className={`inline-flex items-center gap-1.5 font-mono ${className}`}>
      <span>{revealed ? value : getMasked()}</span>
      <button
        type="button"
        onClick={() => setRevealed(!revealed)}
        className="text-muted-foreground hover:text-foreground transition-colors focus:outline-none"
        title={revealed ? "Mask data" : "Reveal data"}
      >
        {revealed ? (
          <EyeOff className="h-3.5 w-3.5 text-primary" />
        ) : (
          <Eye className="h-3.5 w-3.5" />
        )}
      </button>
    </span>
  );
}
