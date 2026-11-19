"use client"

import type { ReactNode } from "react"
import { Trash2Icon } from "lucide-react"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

type ConfirmDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  /** Defaults to the shadcn sample's destructive trash icon. */
  icon?: ReactNode
  onConfirm: () => void
}

/**
 * Destructive confirmation dialog built on the shadcn `alert-dialog`
 * primitive (Base UI). Controlled on purpose: the trigger usually lives in
 * a dropdown menu that unmounts when it closes, so the dialog is a
 * sibling opened via state rather than an `AlertDialogTrigger`.
 *
 * Base UI's `AlertDialogAction` is a plain button (unlike Radix — it does
 * not close the dialog), so this component closes itself after
 * `onConfirm()`.
 *
 * Dark-only app with no `.dark` class: `bg-popover`, `bg-muted` and
 * `border-border` resolve to the stock light tokens, so the content,
 * footer and cancel button override them explicitly.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  title,
  description,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  icon = <Trash2Icon />,
  onConfirm,
}: ConfirmDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent
        size="sm"
        className="border border-white/10 bg-[#151516] text-white ring-white/10"
      >
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive">
            {icon}
          </AlertDialogMedia>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription className="text-white/60">
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="border-white/10 bg-[#101010]">
          <AlertDialogCancel
            variant="outline"
            className="border-white/15 bg-transparent text-white hover:bg-white/10 hover:text-white"
          >
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={() => {
              onConfirm()
              onOpenChange(false)
            }}
          >
            {confirmLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
