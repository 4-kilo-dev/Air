"use client";

import * as React from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  titleId: string;
  descriptionId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

function useDialog() {
  const ctx = React.useContext(DialogContext);
  if (!ctx) throw new Error("Dialog components must be used within <Dialog>");
  return ctx;
}

interface DialogProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

function Dialog({ open: controlledOpen, onOpenChange, children }: DialogProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const titleId = React.useId();
  const descriptionId = React.useId();
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : uncontrolledOpen;

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setUncontrolledOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  return (
    <DialogContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
}

function DialogTrigger({
  children,
  asChild,
  className,
  ...props
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { asChild?: boolean }) {
  const { onOpenChange } = useDialog();
  return (
    <button
      type="button"
      data-as-child={asChild || undefined}
      onClick={() => onOpenChange(true)}
      className={className}
      {...props}
    >
      {children}
    </button>
  );
}

function DialogContent({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const { open, onOpenChange, titleId, descriptionId } = useDialog();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previouslyFocusedElement = React.useRef<HTMLElement | null>(null);
  const onOpenChangeRef = React.useRef(onOpenChange);

  React.useEffect(() => {
    onOpenChangeRef.current = onOpenChange;
  }, [onOpenChange]);

  React.useEffect(() => {
    if (!open) return;

    previouslyFocusedElement.current = document.activeElement as HTMLElement | null;
    const content = contentRef.current;
    const focusableSelector = [
      "a[href]",
      "button:not([disabled])",
      "textarea:not([disabled])",
      "input:not([disabled])",
      "select:not([disabled])",
      "[tabindex]:not([tabindex='-1'])",
    ].join(",");
    const getFocusableElements = () =>
      Array.from(
        content?.querySelectorAll<HTMLElement>(focusableSelector) ?? [],
      ).filter((element) => element.getClientRects().length > 0);

    const focusFrame = window.requestAnimationFrame(() => {
      const initialFocus = content?.querySelector<HTMLElement>(
        "[data-dialog-initial-focus]",
      );
      (initialFocus ?? getFocusableElements()[0] ?? content)?.focus();
    });
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onOpenChangeRef.current(false);
        return;
      }
      if (event.key !== "Tab") return;

      const focusableElements = getFocusableElements();
      if (focusableElements.length === 0) {
        event.preventDefault();
        content?.focus();
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement = focusableElements[focusableElements.length - 1];
      const activeElement = document.activeElement;

      if (event.shiftKey && activeElement === firstElement) {
        event.preventDefault();
        lastElement.focus();
      } else if (!event.shiftKey && activeElement === lastElement) {
        event.preventDefault();
        firstElement.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.cancelAnimationFrame(focusFrame);
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocusedElement.current?.focus();
    };
  }, [open]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/45 backdrop-blur-sm motion-safe:animate-in motion-safe:fade-in-0 motion-safe:duration-200"
        onClick={() => onOpenChange(false)}
      />
      {/* Modal Dialog */}
      <div
        ref={contentRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-describedby={descriptionId}
        tabIndex={-1}
        className={cn(
          "relative z-50 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-[1.5rem] border border-border/70 bg-background/95 p-6 shadow-[0_24px_80px_rgb(0_0_0_/0.2),0_2px_8px_rgb(0_0_0_/0.08)] backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in-0 motion-safe:zoom-in-95 motion-safe:slide-in-from-bottom-2 motion-safe:duration-200 sm:p-7",
          className
        )}
      >
        <button
          type="button"
          onClick={() => onOpenChange(false)}
          aria-label="Close dialog"
          className="absolute right-3 top-3 z-10 inline-flex size-11 items-center justify-center rounded-full border border-white/80 bg-background/95 text-muted-foreground shadow-sm transition-[color,background-color,border-color,box-shadow,transform] duration-200 hover:bg-background hover:text-foreground focus:outline-none focus:ring-4 focus:ring-ring/20 focus:ring-offset-2 focus:ring-offset-background active:scale-95 sm:right-4 sm:top-4"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        {children}
      </div>
    </div>
  );
}

function DialogHeader({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mb-5 flex flex-col gap-2 pr-8 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.HTMLAttributes<HTMLHeadingElement>) {
  const { titleId } = useDialog();
  return (
    <h2
      id={titleId}
      className={cn("text-xl font-semibold leading-tight tracking-[-0.025em] text-foreground", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.HTMLAttributes<HTMLParagraphElement>) {
  const { descriptionId } = useDialog();
  return (
    <p
      id={descriptionId}
      className={cn("text-sm leading-relaxed text-muted-foreground", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("mt-7 flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};
