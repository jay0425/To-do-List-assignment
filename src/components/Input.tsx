"use client";

import * as React from "react";
import { cn } from "@/utils/cn";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  wrapperClassName?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, wrapperClassName, ...props }, ref) => {
    return (
      <div
        className={cn(
          "w-full h-[3.281rem] rounded-3xl border-2 border-slate-900 flex items-center px-6 bg-slate-100",
          "shadow-[0.25rem_0.219rem_0_0_var(--color-slate-900)]",
          wrapperClassName,
        )}
      >
        <input
          ref={ref}
          {...props}
          className={cn(
            "w-full bg-transparent text-base font-normal leading-none tracking-[0] placeholder:text-slate-500 text-slate-900 outline-0",
            className,
          )}
          placeholder={props.placeholder ?? "할 일을 입력해주세요"}
        />
      </div>
    );
  },
);

Input.displayName = "Input";
export default Input;
