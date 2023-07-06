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

const sexLookup: { [key: number]: string|undefined } = {1: "f", 2: "m" };

function BabyList(): JSX.Element {
  const originalBabyData: Baby[] = babyNamesData.sort((a: Baby, b: Baby) =>
    compareBaby(a, b)
  );

  const [searchInput, setSearchInput] = useState("");
  const [babyList, setBabyList] = useState<Baby[]>(originalBabyData);
  const [favourites, setFavourites] = useState<Baby[]>([]);
  const [activeButton, setActiveButton] = useState(0);

  const filteredData = babyList.filter((el) => {
    const isSexMatch = activeButton === 0 || el.sex === sexLookup[activeButton];
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
    setBabyList(originalBabyData)
    
  };

  const handleFilterSex = (num: number) => {
    setActiveButton(num);
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
            handleFilterSex={() => {
              handleFilterSex(1);
            }}
            activeButton={activeButton}
            expectedButton={1}
            sex="Female"
          />
          <FilterButton
            handleFilterSex={() => {
              handleFilterSex(2);
            }}
            activeButton={activeButton}
            sex="Male"
            expectedButton={2}
          />
          <FilterButton
            handleFilterSex={() => {
              handleFilterSex(0);
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
