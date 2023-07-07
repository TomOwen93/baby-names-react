import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface Baby {
  favourite: { sex: string; id: number; name: string };
  handleRemoveFavourites: () => void;
}

export function FavouritesSection({
  favourite,
  handleRemoveFavourites,
}: Baby): JSX.Element {
  const [animationParent] = useAutoAnimate();
  return (
    <button
      ref={animationParent}
      className={`gender-${favourite.sex}`}
      key={favourite.id}
      onClick={handleRemoveFavourites}
    >
      {favourite.name}{" "}
    </button>
  );
}
