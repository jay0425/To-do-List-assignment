import { cn } from "@/utils/cn";
// import React, { TextareaHTMLAttributes } from "react";
import React from "react";

const Textarea = React.forwardRef<HTMLTextAreaElement>(() => {
  // const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

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
          className={cn(
            "w-full h-full resize-none outline-0",
            "text-slate-800 text-base text-center leading-none",
            "scrollbar-memo",
          )}
        />
      </div>
    </div>
  );
});

Textarea.displayName = "Textarea";
export default Textarea;
