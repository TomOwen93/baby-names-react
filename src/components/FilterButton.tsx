import { useAutoAnimate } from "@formkit/auto-animate/react";

interface FilterButtonProps {
  activeSex: number;
  sex: string;
  handleFilterSex: () => void;
  expectedButton: number;
}

export function FilterButton({
  handleFilterSex,
  activeSex,
  sex,
  expectedButton,
}: FilterButtonProps): JSX.Element {
  const [animationParent] = useAutoAnimate();

  return (
    <button
      ref={animationParent}
      className={`${
        activeSex === expectedButton
          ? `active-button${activeSex}`
          : "plain-button"
      }`}
      onClick={handleFilterSex}
    >
      {sex}
    </button>
  );
}
