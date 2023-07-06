import babyNamesData from "../babyNamesData.json";
import { useState } from "react";
import { compareBaby } from "../utils/sortBaby";
import { filterBabyInput, filterBabyId } from "../utils/filterBaby";
import { FavouritesSection } from "./FavouritesSection";
import { FilterButton } from "./FilterButton";

export interface Baby {
  name: string;
  id: number;
  sex: string;
}

function BabyList(): JSX.Element {
  const babyData: Baby[] = babyNamesData.sort((a: Baby, b: Baby) =>
    compareBaby(a, b)
  );

  const [searchInput, setSearchInput] = useState("");
  const [babyList, setBabyList] = useState<Baby[]>(babyData);
  const [favourites, setFavourites] = useState<Baby[]>([]);
  const [activeButton, setActiveButton] = useState(0);

  const filteredData = babyList.filter((el) =>
    filterBabyInput(el.name, searchInput)
  );

  const handleAddFavourites = (baby: Baby) => {
    setFavourites(
      [...favourites, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
    const filteredByID = babyList.filter((el) => filterBabyId(el.id, baby.id));
    setBabyList(filteredByID.sort((a: Baby, b: Baby) => compareBaby(a, b)));
  };

  const handleRemoveFavourites = (baby: Baby) => {
    setFavourites(favourites.filter((el) => el.id !== baby.id));

    setBabyList(
      [...babyList, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
  };

  const handleResetFavourites = () => {
    setFavourites([]);
    setBabyList(babyData);
    setActiveButton(0);
  };

  const handleFilterButton = (num: number) => {
    const sexLookup: { [key: number]: string } = { 1: "f", 2: "m" };

    setActiveButton(num);
    const filteredBySex =
      num !== 0
        ? babyData.filter(
            (el) => el.sex === sexLookup[num] && !favourites.includes(el)
          )
        : babyList;

    if (num !== 0) {
      setBabyList(filteredBySex.sort((a: Baby, b: Baby) => compareBaby(a, b)));
    } else {
      setBabyList(
        babyData.filter(
          (el) =>
            filterBabyInput(el.name, searchInput) && !favourites.includes(el)
        )
      );
    }
  };

  return (
    <>
      <div className="main-section">
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          className="search-input"
        />
        <hr />
        <div className="baby-section">
          <h3>Favourites:</h3>
          {favourites.map((favouriteBaby) => (
            <FavouritesSection
              key={favouriteBaby.id}
              favourite={favouriteBaby}
              handleRemoveFavourites={() =>
                handleRemoveFavourites(favouriteBaby)
              }
            />
          ))}

          <button className="plain-button" onClick={handleResetFavourites}>
            Reset Favourites
          </button>
        </div>
        <div className="filter-button-section">
          <h3>Filter:</h3>
          <FilterButton
            handleFilterButton={() => {
              handleFilterButton(1);
            }}
            activeButton={activeButton}
            expectedButton={1}
            sex="Female"
          />
          <FilterButton
            handleFilterButton={() => {
              handleFilterButton(2);
            }}
            activeButton={activeButton}
            sex="Male"
            expectedButton={2}
          />
          <FilterButton
            handleFilterButton={() => {
              handleFilterButton(0);
            }}
            activeButton={activeButton}
            sex="All"
            expectedButton={0}
          />
        </div>

        <hr />

        <div className="baby-section">
          {filteredData.map((baby) => (
            <button
              onClick={() => handleAddFavourites(baby)}
              className={`gender-${baby.sex}`}
              key={baby.id}
            >
              {baby.name}
            </button>
          ))}
        </div>
        <hr />
      </div>
    </>
  );
}

export default BabyList;
