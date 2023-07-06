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
  return (
    <button
      className={`${
        activeSex === expectedButton ? "active-button" : "plain-button"
      }`}
      onClick={handleFilterSex}
    >
      {sex}
    </button>
  );
}
