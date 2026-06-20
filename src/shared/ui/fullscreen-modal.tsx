import { cn, useCloseOnBack } from "@/shared/lib";
import { XIcon } from "lucide-react";
import { Dialog as DialogPrimitive } from "radix-ui";
import type { PropsWithChildren } from "react";
import { Button } from "./button";

type FullscreenModalProps = PropsWithChildren<{
  className?: string;
  headerClassName?: string;
  isOpen: boolean;
  title: string;
  onClose: () => void;
}>;

export function FullscreenModal({
  className,
  headerClassName,
  isOpen,
  title,
  children,
  onClose,
}: FullscreenModalProps) {
  useCloseOnBack(isOpen, onClose);

  const handleOpenChange = (open: boolean) => {
    if (!open) {
      onClose();
    }
  };

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={handleOpenChange}>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Content className="fixed inset-0 z-50 flex bg-canvas outline-none data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:slide-out-to-left data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:slide-in-from-left">
          <div
            className={cn(
              "scrollbar-hidden flex flex-1 flex-col gap-md overflow-y-auto overscroll-contain p-md",
              className,
            )}
          >
            <div className="flex justify-between">
              <DialogPrimitive.Title
                className={cn("pr-xl text-display-sm text-ink", headerClassName)}
              >
                {title}
              </DialogPrimitive.Title>

              <DialogPrimitive.Close asChild>
                <Button size="icon" variant="secondary" aria-label="닫기">
                  <XIcon />
                </Button>
              </DialogPrimitive.Close>
            </div>

            <div className="flex-1">{children}</div>
          </div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
