import Image from "next/image";

type LogoProps = {
  size?: number;
  className?: string;
};

const ASPECT_RATIO = 601 / 587;

export default function Logo({ size = 44, className = "" }: LogoProps) {
  return (
    <Image
      src="/logo.png"
      alt="MQ Media"
      width={size}
      height={Math.round(size * ASPECT_RATIO)}
      priority
      className={className}
    />
  );
}
