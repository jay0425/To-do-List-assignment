import { cn } from "@/utils/cn";
import clsx from "clsx";

interface SpinnerProps {
  size?: "medium" | "large";
  className?: string;
}

const Spinner = ({ size = "large", className }: SpinnerProps) => {
  return (
    <div className={clsx("w-full flex justify-center items-center", className)}>
      <div
        className={clsx(
          cn(
            "w-10 h-10 tablet:w-16 tablet:h-16 border-4 border-gray-700 border-t-transparent border-solid rounded-full animate-spin",
            size === "medium" && "w-8 h-8 tablet:w-8 tablet:h-8",
          ),
        )}
      ></div>
    </div>
  );
};

export default Spinner;
