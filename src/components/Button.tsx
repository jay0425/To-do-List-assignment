import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";
import Spinner from "./Spinner";
import { SmallCheckIcon, XIcon } from "public/icons/index";

const ButtonVariants = cva(
  `w-[10.272rem] h-[3.25rem] rounded-3xl border-2 border-slate-900 text-center font-bold`,
  {
    variants: {
      colors: {
        primary: "bg-slate-200 text-slate-900",
        rose: "bg-rose-500 text-white",
        violet: "bg-violet-600 text-white",
        lime: "bg-lime-300 text-slate-900",
      },
    },
    defaultVariants: {
      colors: "primary",
    },
  },
);

export type ButtonColors = VariantProps<typeof ButtonVariants>["colors"];
type IconType = "plus" | "delete" | "check";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  isPending?: boolean;
  iconType?: IconType;
  isLabel?: boolean;
}

const Button = ({
  children,
  colors,
  isPending = false,
  iconType = "plus",
  isLabel = true,
  ...props
}: ButtonProps) => {
  const renderIcon = () => {
    if (!iconType) return null;

    switch (iconType) {
      case "plus":
        return <XIcon className="w-4 h-4 rotate-45" />;
      case "delete":
        return <XIcon className="w-4 h-4" />;
      case "check":
        return <SmallCheckIcon className="w-4 h-4 text-slate-900" />;
      default:
        return null;
    }
  };

  const content = isPending ? (
    <Spinner />
  ) : (
    <>
      {renderIcon()}
      {isLabel && children}
    </>
  );

  return (
    <button
      className={cn(
        ButtonVariants({ colors }),
        "flex items-center justify-center shrink-0 cursor-pointer",
        "shadow-[0.25rem_0.219rem_0_0_var(--color-slate-900)]",
        isLabel ? "gap-1" : "rounded-full w-13.75 h-13",
      )}
      {...props}
    >
      {content}
    </button>
  );
};

export default Button;
