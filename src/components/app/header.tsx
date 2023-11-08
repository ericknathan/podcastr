import { formatLongDate } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export function Header() {
  return (
    <header className="flex items-center max-md:justify-between gap-8 bg-white border-b p-8 md:px-16">
      <Link href="/">
        <Image src="/logo.svg" alt="🎧 Podcastr" height={40} width={163} />
      </Link>
      <div className="h-6 w-px bg-gray-100" />
      <span className="text-sm text-end md:text-start">The best for you to hear, always</span>
      <span className="text-sm ml-auto max-sm:hidden">{formatLongDate(new Date())}</span>
    </header>
  );
}
