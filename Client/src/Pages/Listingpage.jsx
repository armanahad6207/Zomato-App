import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "../Components/Header/Header";
import Filterbycuisine from "../Components/Filter/Filterbycuisine";
import Filterbycost from "../Components/Filter/Filterbycost";
import Filterrestaurant from "../Components/Filter/Filterrestaurant";

function Listingpage() {
  const murl = "http://localhost:3000/restaurant?mealId=";
  const [restaurant, setRestaurant] = useState([]);
  // eslint-disable-next-line no-unused-vars
  const [activeFilter, setActiveFilter] = useState("");

  const { mealId } = useParams();

  //   get Restaurant w.r.t mealtype
  useEffect(() => {
    console.log("mealid", mealId);
    sessionStorage.setItem("mealId", mealId);

    fetch(`${murl}${mealId}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRestaurant(data);
      });
  }, []);

  const setDataFilter = (data) => {
    setRestaurant(data);
  };

  return (
    <div>
      <Header bgColor="bg-red-500" />

      <div className=" h-full w-full">
        <div className=" grid sm:grid-cols-[25%_auto] grid-cols-1 pt-3 ">
          {/* Left side - Filter */}
          <div className="bg-white   m-2  sm:h-[100%] h-[250px] sm:py-[20px]  px-[10px] sm:my-[80px] sm:mx-[10px] ">
            <div className="flex flex-col  items-center sm:items-start">
              <h2 className="text-xl font-bold mb-4 text-[#192F60]">Filters</h2>
            </div>
            {/* filter by cuisine */}
            <Filterbycuisine
              mealId={mealId}
              restaurantCuisine={(data) => {
                setDataFilter(data);
              }}
              setActiveFilter={setActiveFilter}
            />

            {/* filter by cost */}
            <Filterbycost
              mealId={mealId}
              restaurantCost={(data) => {
                setDataFilter(data);
              }}
              setActiveFilter={setActiveFilter}
            />
          </div>
          {/* Left side - Filter-end */}

          {/* product */}
          <div className="bg-gray-100  sm:px-[50px] px-[10px]  flex flex-col gap-3 items-center justify-center min-h-screen w-full py-[70px] ">
            {restaurant.map((item, index) => {
              return <Filterrestaurant key={index} resData={item} />;
            })}
            {/* <Filterrestaurant />; */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Listingpage;
