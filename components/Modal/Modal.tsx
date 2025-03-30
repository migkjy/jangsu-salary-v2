"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"
import { cn } from "@/lib/utils"

const modalContent = cva(
  cn(
    "fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg",
  ),
  {
    variants: {
      size: {
        default: "w-full max-w-lg",
        sm: "w-full max-w-sm",
        lg: "w-full max-w-2xl",
        xl: "w-full max-w-4xl",
        full: "w-full max-w-[95vw]",
      },
    },
    defaultVariants: {
      size: "default",
    },
  },
)

export interface ModalProps extends Dialog.DialogProps, VariantProps<typeof modalContent> {
  className?: string
  children: React.ReactNode
  showClose?: boolean
  size?: "default" | "sm" | "lg" | "xl" | "full"
}

export function Modal({ children, className, showClose = true, size, ...props }: ModalProps) {
  return (
    <Dialog.Root {...props}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className={twMerge(modalContent({ size, className }))}>
          {children}
          {showClose && (
            <Dialog.Close className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 disabled:pointer-events-none">
              <X className="h-4 w-4" />
              <span className="sr-only">닫기</span>
            </Dialog.Close>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}

export const ModalTrigger = Dialog.Trigger
export const ModalClose = Dialog.Close
export const ModalTitle = Dialog.Title
export const ModalDescription = Dialog.Description 