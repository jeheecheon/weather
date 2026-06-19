import { cn } from "@/shared/lib";
import { Button } from "@/shared/ui";
import { PanelLeftIcon, StarIcon } from "lucide-react";

type WeatherDetailHeaderProps = {
  className?: string;
  isFavorite: boolean;
  onFavoritePanelToggle: () => void;
  onFavoriteToggle: () => void;
};

export function WeatherDetailHeader({
  className,
  isFavorite,
  onFavoritePanelToggle,
  onFavoriteToggle,
}: WeatherDetailHeaderProps) {
  return (
    <div className={cn("flex items-center justify-between gap-md", className)}>
      <div className="flex items-center gap-xs">
        <Button
          size="icon"
          variant="secondary"
          aria-label="사이드바 토글"
          onClick={onFavoritePanelToggle}
        >
          <PanelLeftIcon />
        </Button>
        <Button
          className={cn(
            isFavorite && "border-transparent bg-ink text-on-ink hover:bg-ink active:bg-ink/90",
          )}
          size="icon"
          variant="secondary"
          aria-label={isFavorite ? "즐겨찾기 삭제" : "즐겨찾기 추가"}
          onClick={onFavoriteToggle}
        >
          <StarIcon className={cn(isFavorite && "fill-current")} />
        </Button>
      </div>
    </div>
  );
}
