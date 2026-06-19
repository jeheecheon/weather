import { cn, type Nullable } from "@/shared/lib";
import { Suspense, useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useDesktopBreakpoint } from "../lib/use-desktop-breakpoint";
import type { District } from "../model/district";
import { useTargetCoordinates } from "../model/use-target-coordinates";
import { FavoriteFullscreenModal } from "./favorite-fullscreen-modal";
import { FavoriteSidebar } from "./favorite-sidebar";
import { WeatherDetail, WeatherDetailError, WeatherDetailSkeleton } from "./weather-detail";

type HomePageProps = {
  className?: string;
};

export function HomePage({ className }: HomePageProps) {
  const [isFavoritesPanelOpen, setIsFavoritesPanelOpen] = useState(true);
  const [activeDistrict, setActiveDistrict] = useState<Nullable<District>>(null);
  const isDesktop = useDesktopBreakpoint();
  const coordinates = useTargetCoordinates(activeDistrict);

  const isSidebarOpen = isDesktop && isFavoritesPanelOpen;

  useDesktopBreakpoint({ onChange: setIsFavoritesPanelOpen });

  return (
    <div
      className={cn(
        "relative isolate grid h-dvh min-h-dvh gap-lg bg-page/50 px-md py-lg transition-[grid-template-columns] ease-in-out md:px-xl md:py-xl",
        isSidebarOpen ? "grid-cols-[18rem_1fr] duration-100" : "grid-cols-[0rem_1fr] duration-50",
        className,
      )}
    >
      <div className="relative z-20 min-w-0 overflow-hidden">
        <FavoriteSidebar
          className="h-full w-72"
          activeDistrict={activeDistrict}
          onActiveDistrictChange={handleActiveDistrictChange}
        />
      </div>
      <div className="relative z-10 mx-auto h-full w-full max-w-5xl min-w-0 overflow-y-auto">
        {coordinates == null ? (
          <WeatherDetailSkeleton />
        ) : (
          <ErrorBoundary
            resetKeys={[coordinates.lat, coordinates.lon]}
            fallback={<WeatherDetailError />}
          >
            <Suspense fallback={<WeatherDetailSkeleton />}>
              <WeatherDetail
                coordinates={coordinates}
                activeDistrict={activeDistrict}
                onToggleFavorites={handleIsFavoritesPanelOpenChange(!isFavoritesPanelOpen)}
              />
            </Suspense>
          </ErrorBoundary>
        )}
      </div>

      {!isDesktop && (
        <FavoriteFullscreenModal
          activeDistrict={activeDistrict}
          isOpen={isFavoritesPanelOpen}
          onActiveDistrictChange={handleActiveDistrictChange}
          onClose={handleIsFavoritesPanelOpenChange(false)}
        />
      )}
    </div>
  );

  function handleActiveDistrictChange(district: Nullable<District>) {
    setActiveDistrict(district);
    if (isDesktop) {
      return;
    }
    setIsFavoritesPanelOpen(false);
  }

  function handleIsFavoritesPanelOpenChange(isOpen: boolean) {
    return () => setIsFavoritesPanelOpen(isOpen);
  }
}
