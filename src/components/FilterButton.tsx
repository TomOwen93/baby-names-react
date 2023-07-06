interface FilterButtonProps {
  activeButton: number;
  sex: string;
  handleFilterSex: () => void;
  expectedButton: number;
}

export function FilterButton({
  handleFilterSex,
  activeButton,
  sex,
  expectedButton,
}: FilterButtonProps): JSX.Element {
  return (
    <button
      className={`${
        activeButton === expectedButton ? "active-button" : "plain-button"
      }`}
      onClick={handleFilterSex}
    >
      {sex}
    </button>
  );
}
