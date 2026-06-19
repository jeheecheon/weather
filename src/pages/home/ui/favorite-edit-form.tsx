import { cn } from "@/shared/lib";
import { Button, Input } from "@/shared/ui";
import { MapPinIcon, Trash2Icon } from "lucide-react";
import { useState, type SyntheticEvent } from "react";
import type { Favorite } from "../model/use-favorites";

type FavoriteEditFormProps = {
  className?: string;
  favorite: Favorite;
  onCancel: () => void;
  onRemoveFavorite: (favorite: Favorite) => void;
  onUpdateFavorite: (favorite: Favorite) => void;
};

export function FavoriteEditForm({
  className,
  favorite,
  onCancel,
  onRemoveFavorite,
  onUpdateFavorite,
}: FavoriteEditFormProps) {
  const [invalid, setInvalid] = useState(false);
  const [isTouched, setIsTouched] = useState(false);

  return (
    <form className={cn("flex flex-col gap-lg", className)} onSubmit={handleSubmit}>
      <div className="flex flex-col gap-2xs">
        <label className="text-title-sm text-ink" htmlFor="favorite-alias">
          별칭
        </label>
        <Input
          defaultValue={favorite.alias ?? ""}
          name="alias"
          placeholder={favorite.name}
          id="favorite-alias"
          aria-invalid={invalid}
          onChange={handleAliasChange}
        />
        <p className="flex items-center gap-2xs text-caption text-meta">
          <MapPinIcon className="size-3.5" />
          {favorite.name}
        </p>
      </div>

      <div className="flex flex-col gap-xs desktop:flex-row desktop:items-center">
        <Button
          className="order-1 w-full desktop:order-3 desktop:w-auto"
          type="submit"
          disabled={!isTouched || invalid}
        >
          저장
        </Button>
        <div className="order-2 flex gap-xs desktop:contents">
          <Button
            className="flex-1 desktop:order-1 desktop:flex-none"
            type="button"
            variant="destructive"
            onClick={handleRemove}
          >
            <Trash2Icon />
            삭제
          </Button>
          <Button
            className="flex-1 desktop:order-2 desktop:ml-auto desktop:flex-none"
            type="button"
            variant="secondary"
            onClick={onCancel}
          >
            취소
          </Button>
        </div>
      </div>
    </form>
  );

  function handleSubmit(event: SyntheticEvent<HTMLFormElement>) {
    event.preventDefault();
    if (invalid) {
      return;
    }

    const formData = new FormData(event.currentTarget);
    const nextAlias = String(formData.get("alias") ?? "").trim();
    onUpdateFavorite({ ...favorite, alias: nextAlias });
    onCancel();
  }

  function handleAliasChange(event: SyntheticEvent<HTMLInputElement>) {
    setIsTouched(true);
    setInvalid(event.currentTarget.value.trim().length === 0);
  }

  function handleRemove() {
    onRemoveFavorite(favorite);
    onCancel();
  }
}
