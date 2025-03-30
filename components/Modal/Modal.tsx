"use client"

import * as Dialog from "@radix-ui/react-dialog"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"
import { twMerge } from "tailwind-merge"

const modalContent = cva(
  [
    "fixed",
    "left-[50%]",
    "top-[50%]",
    "z-50",
    "grid",
    "w-full",
    "max-w-lg",
    "translate-x-[-50%]",
    "translate-y-[-50%]",
    "gap-4",
    "border",
    "bg-white",
    "p-6",
    "shadow-lg",
    "duration-200",
    "data-[state=open]:animate-in",
    "data-[state=closed]:animate-out",
    "data-[state=closed]:fade-out-0",
    "data-[state=open]:fade-in-0",
    "data-[state=closed]:zoom-out-95",
    "data-[state=open]:zoom-in-95",
    "data-[state=closed]:slide-out-to-left-1/2",
    "data-[state=closed]:slide-out-to-top-[48%]",
    "data-[state=open]:slide-in-from-left-1/2",
    "data-[state=open]:slide-in-from-top-[48%]",
    "sm:rounded-lg",
  ],
  {
    variants: {
      size: {
        default: ["max-w-lg"],
        sm: ["max-w-sm"],
        lg: ["max-w-2xl"],
        xl: ["max-w-4xl"],
        full: ["max-w-[95vw]"],
      },
    },
    defaultVariants: {
      size: "default",
    },
  }
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
        <Dialog.Overlay className="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 bg-black/50 backdrop-blur-sm" />
        <Dialog.Content className={twMerge(modalContent({ size, className }))}>
          {children}
          {showClose && (
            <Dialog.Close className="absolute top-4 right-4 rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:outline-none disabled:pointer-events-none">
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
