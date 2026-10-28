import Image from "next/image";
import { cn } from "@/lib/utils";
import logo from "@/public/logo.png";

export default function Logo({ className, size = 56, priority = false }: { className?: string; size?: number; priority?: boolean }) {
  return (
    <Image
      src={logo}
      alt="Road 8"
      width={size}
      height={size}
      priority={priority}
      className={cn("rounded-full shadow-[0_4px_14px_-4px_rgba(0,0,0,0.5)]", className)}
    />
  );
}
