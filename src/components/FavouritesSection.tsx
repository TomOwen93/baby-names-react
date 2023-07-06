export interface Baby {
  favourite: { sex: string; id: number; name: string };
  handleRemoveFavourites: () => void;
}

export function FavouritesSection({
  favourite,
  handleRemoveFavourites,
}: Baby): JSX.Element {
  return (
    <button
      className={`gender-${favourite.sex}`}
      key={favourite.id}
      onClick={handleRemoveFavourites}
    >
      {favourite.name}{" "}
    </button>
  );
}
