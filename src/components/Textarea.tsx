import { cn } from "@/utils/cn";
import React from "react";

type TextareaProps = {
  value: string;
  onChange: (value: string) => void;
};

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ value, onChange }, ref) => {
    return (
      <div
        className={cn(
          "w-full h-77.75 border-0 rounded-3xl px-4 py-6",
          "bg-[url('/memo.svg')] bg-no-repeat bg-cover",
        )}
      >
        <div className="w-full h-full flex flex-col items-center gap-4">
          <span className="text-base font-extrabold text-amber-800">Memo</span>
          <textarea
            ref={ref}
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className={cn(
              "w-full h-full resize-none outline-0",
              "text-slate-800 text-base text-center leading-none",
              "scrollbar-memo",
            )}
          />
        </div>
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
