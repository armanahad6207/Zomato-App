import { useState } from "react";
import PropTypes from "prop-types";
const url = "http://localhost:3000/filter";

function Filterbycuisine({ mealId, restaurantCuisine, setActiveFilter }) {
  const [selectedCuisine, setSelectedCuisine] = useState(null);

  const filterCuisine = (event) => {
    setSelectedCuisine(event.target.value);
    setActiveFilter("cuisine");
    console.log(event.target.value);
    const cuisineId = event.target.value;
    let cuisineUrl = `${url}/${mealId}`;
    if (cuisineId !== "0") {
      cuisineUrl = `${url}/${mealId}?cuisineId=${cuisineId}`;
    }
    fetch(cuisineUrl)
      .then((res) => res.json())
      .then((item) => {
        if (item.length > 0) {
          restaurantCuisine(item);
        } else {
          restaurantCuisine(["data not found"]);
        }

        console.log("filtered data", item);
      });
  };
  return (
    <div className="">
      <h3 className="my-[4px] text-[18px] text-[#192F60]">Cuisine</h3>
      <div className="flex flex-row overflow-auto sm:flex-col sm:overflow-hidden">
        {[
          { id: "All", label: "All", value: "0" },
          { id: "Nindian", label: "North Indian", value: "1" },
          { id: "Sindian", label: "South Indian", value: "2 " },
          { id: "Chinese", label: "Chinese", value: " 3" },
          { id: "Ffood", label: "Fast Food", value: "4" },
          { id: "Sfood", label: "Street Food", value: "5" },
        ].map((cuisine) => (
          <div
            key={cuisine.id}
            className="px-[6px] py-[4px] sm:px-0 sm:py-0 gap-4 sm:gap-0 whitespace-nowrap text-center flex justify-between shadow-sm mb-[10px] sm:mb-0 mr-12 border sm:border-none sm:bg-transparent sm:shadow-none bg-white max-w-[220px]"
          >
            <label htmlFor={cuisine.id} className="radio">
              {cuisine.label}
            </label>
            <input
              type="radio"
              id={cuisine.id}
              name="cuisine"
              value={cuisine.value}
              checked={selectedCuisine == cuisine.value}
              onChange={filterCuisine}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
Filterbycuisine.propTypes = {
  mealId: PropTypes.string.isRequired,
  restaurantCuisine: PropTypes.func.isRequired,
  setActiveFilter: PropTypes.func.isRequired,
};

export default Filterbycuisine;
