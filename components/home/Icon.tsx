import Image from "next/image"

const sizeClass: Record<number, string> = {
  16: "size-4",
  24: "size-6",
  32: "size-8",
  40: "size-10",
}

/**
 * Static SVG icon exported from Figma (`public/icons/*.svg`).
 * Rendered unoptimized so the browser serves the exact vector bytes.
 */
export function Icon({
  src,
  size = 24,
  className,
  alt = "",
}: {
  src: string
  size?: number
  className?: string
  alt?: string
}) {
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized
      className={className ?? sizeClass[size] ?? "size-6"}
    />
  )
}
