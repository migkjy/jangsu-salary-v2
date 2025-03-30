import { cva, type VariantProps } from "class-variance-authority"
import { Loader2 } from "lucide-react"
import { twMerge } from "tailwind-merge"

const button = cva(
  [
    "justify-center",
    "inline-flex",
    "items-center",
    "rounded-xl",
    "text-center",
    "border",
    "border-blue-400",
    "transition-all",
    "duration-200",
    "ease-in-out",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-blue-500",
    "focus:ring-offset-2",
    "disabled:opacity-50",
    "disabled:cursor-not-allowed",
  ],
  {
    variants: {
      intent: {
        primary: [
          "bg-blue-400",
          "text-white",
          "hover:enabled:bg-blue-700",
          "active:enabled:bg-blue-800",
        ],
        secondary: [
          "bg-transparent",
          "text-blue-400",
          "hover:enabled:bg-blue-400",
          "hover:enabled:text-white",
          "active:enabled:bg-blue-500",
        ],
      },
      size: {
        sm: ["min-w-20", "h-full", "min-h-10", "text-sm", "py-1.5", "px-4", "gap-1.5"],
        lg: ["min-w-32", "h-full", "min-h-12", "text-lg", "py-2.5", "px-6", "gap-2"],
      },
      underline: { true: ["underline"], false: [] },
      isLoading: { true: ["cursor-wait"], false: [] },
    },
    defaultVariants: {
      intent: "primary",
      size: "lg",
      isLoading: false,
    },
  }
)

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLAnchorElement>, VariantProps<typeof button> {
  underline?: boolean
  href: string
  isLoading?: boolean
  loadingText?: string
}

export function Button({
  className,
  intent,
  size,
  underline,
  isLoading,
  loadingText,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={twMerge(button({ intent, size, className, underline, isLoading }))}
      {...props}
      aria-disabled={isLoading}
      role="button"
    >
      {isLoading && <Loader2 className="animate-spin" />}
      {isLoading ? loadingText || children : children}
    </a>
  )
}
