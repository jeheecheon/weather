import { cn, type Nullable, type Optional } from "@/shared/lib";
import { Modal } from "@/shared/ui";
import { useState } from "react";
import { type District } from "../model/district";
import { type Favorite, useFavorites } from "../model/use-favorites";
import { FavoriteEditForm } from "./favorite-edit-form";
import { FavoriteList } from "./favorite-list";
import { FavoriteSearchCombobox } from "./favorite-search-combobox";

type FavoriteSidebarProps = {
  className?: string;
  activeDistrict: Nullable<District>;
  onActiveDistrictChange: (district: Nullable<District>) => void;
};

export function FavoriteSidebar({
  className,
  activeDistrict,
  onActiveDistrictChange,
}: FavoriteSidebarProps) {
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);
  const { favorites, removeFavorite, updateFavorite } = useFavorites();
  const [editingFavorite, setEditingFavorite] = useState<Optional<Favorite>>();

  return (
    <aside
      className={cn(
        "flex min-h-0 flex-col gap-md rounded-lg border border-hairline bg-canvas p-md shadow-raised",
        className,
      )}
    >
      <FavoriteSearchCombobox onSelectDistrict={onActiveDistrictChange} />

      <FavoriteList
        activeDistrict={activeDistrict}
        favorites={favorites}
        onEditFavorite={handleEditFavorite}
        onSelectFavorite={onActiveDistrictChange}
      />

      {editingFavorite && (
        <Modal isOpen={isEditOpen} title="즐겨찾기 편집" onClose={handleEditDialogClose}>
          <FavoriteEditForm
            favorite={editingFavorite}
            onCancel={handleEditDialogClose}
            onRemoveFavorite={handleRemoveEditedFavorite}
            onUpdateFavorite={handleUpdateEditedFavorite}
          />
        </Modal>
      )}
    </aside>
  );

  function handleEditFavorite(favorite: Favorite) {
    setEditingFavorite(favorite);
    setIsEditOpen(true);
  }

  function handleEditDialogClose() {
    setIsEditOpen(false);
  }

  function handleRemoveEditedFavorite(favorite: Favorite) {
    removeFavorite(favorite);

    if (favorite.name === activeDistrict?.name) {
      onActiveDistrictChange(favorites.find((item) => item.name !== favorite.name) ?? null);
    }
  }

  function handleUpdateEditedFavorite(favorite: Favorite) {
    updateFavorite(favorite);

    if (favorite.name === activeDistrict?.name) {
      onActiveDistrictChange(favorite);
    }
  }
}
