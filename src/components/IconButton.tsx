import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import { PencilIcon, XIcon } from "public/icons/index";

const ButtonVariants = cva(`w-16 h-16 rounded-full`, {
  variants: {
    colors: {
      primary: "bg-slate-200 text-slate-500",
      slate: "bg-[#0F172A80] text-white border-2 border-slate-900",
    },
  },
  defaultVariants: {
    colors: "primary",
  },
});

export type ButtonColors = VariantProps<typeof ButtonVariants>["colors"];
type IconType = "plus" | "pencil";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  iconType?: IconType;
}

const IconButton = ({ colors, iconType = "plus", ...props }: ButtonProps) => {
  const renderIcon = () => {
    if (!iconType) return null;

    switch (iconType) {
      case "plus":
        return <XIcon className="w-4.5 h-4.5 rotate-45" />;
      case "pencil":
        return <PencilIcon className="w-6 h-6" />;
      default:
        return null;
    }
  };

  return (
    <button
      className={cn(
        ButtonVariants({ colors }),
        "flex items-center justify-center shrink-0 cursor-pointer",
      )}
      {...props}
    >
      {renderIcon()}
    </button>
  );
};

export default IconButton;
