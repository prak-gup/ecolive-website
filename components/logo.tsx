import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

interface LogoProps {
  className?: string
  width?: number
  height?: number
  variant?: "default" | "icon"
}

export function Logo({ className, width = 151, height = 34, variant = "default" }: LogoProps) {
  const logoContent = (
    <Image
      src="/logo.svg"
      alt="EcoLive"
      width={width}
      height={height}
      className={cn("h-auto", className)}
      priority
    />
  )

  if (variant === "icon") {
    // For icon variant, you might want to use a different logo or crop this one
    return (
      <Link href="/" className={cn("inline-block", className)}>
        {logoContent}
      </Link>
    )
  }

  return (
    <Link href="/" className={cn("inline-block", className)}>
      {logoContent}
    </Link>
  )
}

