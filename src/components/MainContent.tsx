import { useState } from "react";
import babyNamesData from "../babyNamesData.json";

function MainContent(): JSX.Element {
  const data = babyNamesData;

  data.sort((a, b) => {
    if (a.name < b.name) {
      return -1;
    }
    if (a.name > b.name) {
      return 1;
    } else {
      return 0;
    }
  });

  return (
    <>
      <div className="baby-button">
        {data.map((baby) => (
          <button className={`gender-${baby.sex}`} key={baby.id}>
            {" "}
            {baby.name}{" "}
          </button>
        ))}
      </div>
    </>
  );
}

export default MainContent;
