import { cn } from "@/shared/lib";
import type { LucideIcon } from "lucide-react";
import { type PropsWithChildren } from "react";

type WeatherTileProps = PropsWithChildren<{
  className?: string;
  contentClassName?: string;
  icon: LucideIcon;
  label: string;
}>;

export function WeatherTile({
  className,
  contentClassName,
  children,
  icon: Icon,
  label,
}: WeatherTileProps) {
  return (
    <section
      className={cn(
        "flex flex-col gap-sm rounded-lg border border-hairline bg-canvas p-md shadow-raised",
        className,
      )}
    >
      <div className="flex items-center gap-2xs text-meta">
        <Icon className="size-3.5" />
        <span className="text-micro">{label}</span>
      </div>
      <div className={cn("flex flex-1 flex-col", contentClassName)}>{children}</div>
    </section>
  );
}
