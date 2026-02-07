import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes } from "react";

const ButtonVariants = cva(
  `h-9 px-[1.688rem] rounded-3xl font-santokki font-bold text-lg font-normal leading-none`,
  {
    variants: {
      colors: {
        lime: "bg-lime-300 text-green-700",
        green: "bg-green-700 text-white text-amber-300",
      },
    },
    defaultVariants: {
      colors: "lime",
    },
  },
);

export type ButtonColors = VariantProps<typeof ButtonVariants>["colors"];

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  children: React.ReactNode;
  isPending?: boolean;
  isLabel?: boolean;
}

const Badge = ({ children, colors }: ButtonProps) => {
  return (
    <button
      className={cn(
        ButtonVariants({ colors }),
        "inline-flex w-fit self-start items-center justify-center",
      )}
    >
      {children}
    </button>
  );
};

export default Badge;
