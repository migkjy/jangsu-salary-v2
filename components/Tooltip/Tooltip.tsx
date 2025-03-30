"use client"

import * as RadixTooltip from "@radix-ui/react-tooltip"
import { cva, type VariantProps } from "class-variance-authority"
import React from "react"
import { twMerge } from "tailwind-merge"

const tooltipContent = cva(["animate-in", "fade-in-0", "zoom-in-95", "data-[state=closed]:animate-out", "data-[state=closed]:fade-out-0", "data-[state=closed]:zoom-out-95", "data-[side=bottom]:slide-in-from-top-2", "data-[side=left]:slide-in-from-right-2", "data-[side=right]:slide-in-from-left-2", "data-[side=top]:slide-in-from-bottom-2"], {
  variants: {
    intent: {
      primary: ["rounded-md", "bg-zinc-700", "font-sans", "text-white"],
      secondary: ["rounded-md", "bg-white", "font-sans", "text-zinc-700", "border", "border-zinc-200", "shadow-md"],
      error: ["rounded-md", "bg-red-500", "font-sans", "text-white"],
      warning: ["rounded-md", "bg-yellow-500", "font-sans", "text-white"],
      success: ["rounded-md", "bg-green-500", "font-sans", "text-white"],
    },
    size: {
      sm: ["px-2", "py-1", "text-xs"],
      md: ["px-4", "py-2.5", "text-xs"],
      lg: ["px-6", "py-3", "text-sm"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

const tooltipArrow = cva([], {
  variants: {
    intent: {
      primary: ["fill-zinc-700"],
      secondary: ["fill-white", "stroke-zinc-200"],
      error: ["fill-red-500"],
      warning: ["fill-yellow-500"],
      success: ["fill-green-500"],
    },
    size: {
      sm: ["w-3", "h-1.5"],
      md: ["w-4", "h-2"],
      lg: ["w-5", "h-2.5"],
    },
  },
  defaultVariants: {
    intent: "primary",
    size: "md",
  },
})

export interface TooltipProps extends VariantProps<typeof tooltipContent>, RadixTooltip.TooltipProps {
  explainer: React.ReactElement | string
  children: React.ReactElement
  className?: string
  withArrow?: boolean
  side?: "top" | "right" | "bottom" | "left"
}

export function Tooltip({
  children,
  explainer,
  open,
  defaultOpen,
  onOpenChange,
  intent,
  size,
  side = "top",
  className,
  withArrow,
}: TooltipProps) {
  return (
    <RadixTooltip.Provider delayDuration={100}>
      <RadixTooltip.Root open={open} defaultOpen={defaultOpen} onOpenChange={onOpenChange}>
        <RadixTooltip.Trigger asChild>{children}</RadixTooltip.Trigger>
        <RadixTooltip.Portal>
          <RadixTooltip.Content
            side={side}
            sideOffset={5}
            className={twMerge(tooltipContent({ intent, size, className }))}
            role="tooltip"
          >
            {explainer}
            {withArrow ? <RadixTooltip.Arrow className={twMerge(tooltipArrow({ intent, size, className }))} /> : null}
          </RadixTooltip.Content>
        </RadixTooltip.Portal>
      </RadixTooltip.Root>
    </RadixTooltip.Provider>
  )
}
