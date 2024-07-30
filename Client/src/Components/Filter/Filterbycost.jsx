import { useState } from "react";
import PropTypes from "prop-types";

const url = "http://localhost:3000/filter";

function Filterbycost({ mealId, restaurantCost, setActiveFilter }) {
  const [selectedCost, setSelectedCost] = useState("");

  const filterCost = (event) => {
    const cost = event.target.value.split("-");
    setActiveFilter("cost");
    setSelectedCost(event.target.value);
    console.log("Selected cost:", cost);

    let lCost = cost[0];
    let hCost = cost[1];

    let costUrl = `${url}/${mealId}`;
    if (event.target.value !== "0") {
      costUrl = `${url}/${mealId}?lcost=${lCost}&hcost=${hCost}`;
    }

    fetch(costUrl)
      .then((res) => res.json())
      .then((item) => {
        if (item.length === 0) {
          restaurantCost(["not found"]); // No data found
        } else {
          restaurantCost(item);
        }
        console.log("filtered data", item);
      });
  };

  return (
    <div>
      <h3 className="my-[12px] text-[18px] text-[#192F60] border ">
        Cost For Two
      </h3>
      <div className="flex flex-row overflow-auto sm:flex-col sm:overflow-hidden">
        {[
          { id: "100-300", label: "100-300", value: "100-300" },
          { id: "301-500", label: "301-500", value: "301-500" },
          { id: "501-800", label: "501-800", value: "501-800" },
          { id: "801-1000", label: "801-1000", value: "801-1000" },
          { id: "1001-1200", label: "1001-1200", value: "1001-1200" },
          { id: "1201-2000", label: "1201-2000", value: "1201-2000" },
        ].map((cost) => (
          <div
            key={cost.id}
            className="px-[6px] py-[4px] sm:px-0 sm:py-0 gap-4 sm:gap-0 whitespace-nowrap text-center flex justify-between shadow-sm mb-[10px] sm:mb-0 mr-12 border sm:border-none sm:bg-transparent sm:shadow-none bg-white max-w-[220px]"
          >
            <label htmlFor={cost.id} className="radio">
              {cost.label}
            </label>
            <input
              type="radio"
              id={cost.id}
              name="cost"
              value={cost.value}
              checked={selectedCost === cost.value}
              onChange={filterCost}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

Filterbycost.propTypes = {
  mealId: PropTypes.string.isRequired,
  restaurantCost: PropTypes.func.isRequired,
  setActiveFilter: PropTypes.func.isRequired, //
};

export default Filterbycost;
