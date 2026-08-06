import Image from "next/image";
import logoImage from "../../../public/logo.png";

interface LogoProps {
  className?: string;
  preload?: boolean;
}

export function Logo({
  className = "w-[140px]",
  preload = false,
}: LogoProps) {
  return (
    <Image
      alt="Scalryx"
      className={`h-auto max-w-full ${className}`}
      preload={preload}
      sizes="(max-width: 639px) 112px, 140px"
      src={logoImage}
    />
  );
}
