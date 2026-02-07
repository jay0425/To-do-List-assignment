import { cn } from "@/utils/cn";
import { cva, type VariantProps } from "class-variance-authority";
import { CheckIcon } from "public/icons";
import { ButtonHTMLAttributes } from "react";

const ButtonVariants = cva(
  `h-9 px-[1.688rem] rounded-3xl font-santokki font-bold text-lg font-normal leading-none`,
  {
    variants: {
      colors: {
        yellow: "bg-lime-300 text-green-700",
        violet: "bg-green-700 text-white text-amber-300",
      },
    },
    defaultVariants: {
      colors: "yellow",
    },
  },
);

interface ChipProps
  extends ButtonHTMLAttributes<HTMLButtonElement>, VariantProps<typeof ButtonVariants> {
  colors?: VariantProps<typeof ButtonVariants>["colors"];
  isDone?: boolean;
}

const Chip = ({ colors, isDone = false, className, ...props }: ChipProps) => {
  return (
    <>
      <button
        className={cn(
          "flex justify-center items-center w-8 h-8 shrink-0 rounded-full",
          !isDone ? "border-2 border-slate-900 bg-yellow-50" : " bg-violet-600",
          className,
        )}
        disabled
        {...props}
      >
        {isDone ? <CheckIcon className="w-4 h-4 text-yellow-50" /> : ""}
      </button>
    </>
  );
};

export default Chip;
