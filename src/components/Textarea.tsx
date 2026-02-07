import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import React, { TextareaHTMLAttributes } from "react";

const TextareaVariants = cva(
  `relative w-full rounded-[0.313rem] px-[0.938rem] py-3 text-base overflow-y-auto overflow-x-hidden
  placeholder:text-gray-400 has-[textarea:not(:placeholder-shown)]:border-gray-200`,
  {
    variants: {
      size: {
        small: "min-h-[4.375rem] text-base leading-[1.375rem]",
      },
      required: {
        true: "bg-secondary-light border-gray-900",
      },
      readOnly: {
        true: "border-transparent",
        false: "border border-gray-400",
      },
      disabled: {
        true: "bg-gray-100 cursor-default text-gray-400 border-gray-400",
        false: "",
      },
    },
    defaultVariants: {
      size: "small",
      readOnly: false,
      disabled: false,
    },
  },
);

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement>, VariantProps<typeof TextareaVariants> {
  required?: boolean;
  readOnly?: boolean;
  disabled?: boolean;
  hideButton?: boolean;
}

const Textarea = React.forwardRef<HTMLTextAreaElement, TextareaProps>(
  (
    {
      size,
      value,
      className,
      placeholder,
      required,
      readOnly = false,
      disabled = false,
      hideButton = false,
      ...props
    },
    ref,
  ) => {
    const textareaRef = React.useRef<HTMLTextAreaElement | null>(null);

    const setRefs = React.useCallback(
      (node: HTMLTextAreaElement | null) => {
        textareaRef.current = node;
        if (typeof ref === "function") ref(node);
        else if (ref) (ref as { current: HTMLTextAreaElement | null }).current = node;
      },
      [ref],
    );
    const resize = (el: HTMLTextAreaElement) => {
      el.style.height = "auto";
      const minHeight = (el.parentElement?.clientHeight || 0) - 12 * 2;
      el.style.height = `${Math.max(el.scrollHeight, minHeight)}px`;
    };

    const handleInput = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      resize(e.target);
    };

    React.useEffect(() => {
      if (textareaRef.current) {
        resize(textareaRef.current);
      }
    }, [value]);

    const handleClear = () => {
      const el = textareaRef.current;
      if (!el) return;

      el.value = "";
      el.dispatchEvent(new Event("input", { bubbles: true }));
      el.focus();
    };

    return (
      <div
        className={cn(
          TextareaVariants({ size, required, readOnly, disabled }),
          "scroll-custom",
          className,
        )}
      >
        <textarea
          ref={setRefs}
          value={value}
          // onInput={handleInput}
          required={required}
          readOnly={readOnly}
          disabled={disabled}
          data-has-value={value ? "true" : "false"}
          className={cn(
            "peer block resize-none outline-none focus:outline-none focus:ring-0 w-full h-full overflow-hidden",
            value && !disabled && "pr-[1.563rem]",
            readOnly && " cursor-default",
          )}
          placeholder={readOnly ? "" : placeholder}
          spellCheck={false}
          {...props}
        />
      </div>
    );
  },
);

Textarea.displayName = "Textarea";
export default Textarea;
