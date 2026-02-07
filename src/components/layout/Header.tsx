import { cn } from "@/utils/cn";
import { useRouter } from "next/navigation";
import { LargeLogoIcon, SmallLogoIcon } from "public/icons";

interface HeaderProps {
  className?: string;
}

const Header = ({ className }: HeaderProps) => {
  const router = useRouter();

  return (
    <header
      className={cn(
        "w-full h-15 flex items-center border-b border-slate-200 mb-6 sm:mb-4",
        className,
      )}
    >
      <button
        type="button"
        onClick={() => router.push("/")}
        className="inline-flex"
        aria-label="홈으로 이동"
      >
        <SmallLogoIcon className="block md:hidden" />
        <LargeLogoIcon className="hidden md:block" />
      </button>
    </header>
  );
};

export default Header;
