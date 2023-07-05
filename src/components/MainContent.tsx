import babyNamesData from "../babyNamesData.json";
import { useState } from "react";
import { compareBaby } from "../utils/sortBaby";
import { filterBabyInput, filterBabyId } from "../utils/filterBaby";

type Baby = {
  name: string;
  id: number;
  sex: string;
};

function MainContent(): JSX.Element {
  const babyData: Baby[] = babyNamesData.sort((a: Baby, b: Baby) =>
    compareBaby(a, b)
  );

  const [searchInput, setSearchInput] = useState("");
  const [babyList, setBabyList] = useState<Baby[]>(babyData);
  const [favourites, setFavourites] = useState<Baby[]>([]);

  const filteredData = babyList.filter((el) =>
    filterBabyInput(el.name, searchInput)
  );

  const handleAddFavourites = (baby: Baby) => {
    setFavourites(
      [...favourites, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
    const filteredList = babyList.filter((el) => filterBabyId(el.id, baby.id));

    setBabyList(filteredList.sort((a: Baby, b: Baby) => compareBaby(a, b)));
  };

  const handleRemoveFavourites = (baby: Baby) => {
    setFavourites(favourites.filter((el) => el.id !== baby.id));

    setBabyList(
      [...babyList, baby].sort((a: Baby, b: Baby) => compareBaby(a, b))
    );
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
            <button
              className={`gender-${favouriteBaby.sex}`}
              key={favouriteBaby.id}
              onClick={() => handleRemoveFavourites(favouriteBaby)}
            >
              {favouriteBaby.name}{" "}
            </button>
          ))}
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

export default MainContent;
