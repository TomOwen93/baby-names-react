import babyNamesData from "../babyNamesData.json";
import { useState } from "react";
import { compareBaby } from "../utils/sortBaby";
import { filterBabyInput, filterBabyId } from "../utils/filterBaby";
import { FavouritesSection } from "./FavouritesSection";
import { FilterButton } from "./FilterButton";
import { useAutoAnimate } from "@formkit/auto-animate/react";

export interface Baby {
  name: string;
  id: number;
  sex: string;
}

const sexLookup: { [key: number]: string | undefined } = { 1: "f", 2: "m" };
const sexLookupFull: { [key: number]: string } = {
  0: "All",
  1: "Female",
  2: "Male",
};

function BabyList(): JSX.Element {
  const originalBabyData: Baby[] = babyNamesData.sort((a: Baby, b: Baby) =>
    compareBaby(a, b)
  );
  const [animationParent] = useAutoAnimate();

  const potentialFilters = [0, 1, 2];

  const [searchInput, setSearchInput] = useState("");
  const [babyList, setBabyList] = useState<Baby[]>(originalBabyData);
  const [favourites, setFavourites] = useState<Baby[]>([]);
  const [activeSex, setActiveSex] = useState(0);

  const filteredData = babyList.filter((el) => {
    const isSexMatch = activeSex === 0 || el.sex === sexLookup[activeSex];
    return filterBabyInput(el.name, searchInput) && isSexMatch;
  });

  const handleAddFavourites = (baby: Baby) => {
    setFavourites(
      [...favourites, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
    const filteredByID = babyList.filter((el) => filterBabyId(el.id, baby.id));
    setBabyList(filteredByID.sort((a: Baby, b: Baby) => compareBaby(a, b)));
  };

  const handleRemoveFavourites = (baby: Baby) => {
    setFavourites(favourites.filter((el) => el !== baby));

    setBabyList(
      [...babyList, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
  };

  const handleResetFavourites = () => {
    setFavourites([]);
    setBabyList(originalBabyData);
  };

  const handleFilterSex = (num: number) => {
    setActiveSex(num);
  };

  return (
    <>
      <div className="main-section">
        <input
          onChange={(event) => setSearchInput(event.target.value)}
          className="search-input"
        />
        <hr />
        <div className="baby-section" ref={animationParent}>
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
          {potentialFilters.map((filterNumber) => (
            <FilterButton
              key={filterNumber}
              handleFilterSex={() => {
                handleFilterSex(filterNumber);
              }}
              activeSex={activeSex}
              expectedButton={filterNumber}
              sex={sexLookupFull[filterNumber]}
            />
          ))}
        </div>

        <hr />

        <div className="baby-section" ref={animationParent}>
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
