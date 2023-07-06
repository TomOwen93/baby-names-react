interface FilterButtonProps {
  activeButton: number;
  sex: string;
  handleFilterButton: () => void;
  expectedButton: number;
}

export function FilterButton({
  handleFilterButton,
  activeButton,
  sex,
  expectedButton,
}: FilterButtonProps): JSX.Element {
  return (
    <button
      className={`${
        activeButton === expectedButton
       ? "active-button" : "plain-button"}`}
      onClick={handleFilterButton}
    >
      {sex}
    </button>
  );
}
