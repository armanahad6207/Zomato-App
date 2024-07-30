import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import bgImage from "../../assets/shutterstock_348320018@2x.png";
const rurl = "http://localhost:3000/restaurant?state_id=";
const lurl = "http://localhost:3000/location";
function Search() {
  const [resturant, setResturant] = useState([]);
  const [city, setCity] = useState([]);
  const navigate = useNavigate();

  // Rest Api for city
  useEffect(() => {
    fetch(lurl).then((res) =>
      res.json().then((data) => {
        setCity(data);
      })
    );
  }, []);

  // call REST api for resturant

  let handleResturant = (event) => {
    const stateId = event.target.value;
    console.log(stateId);
    fetch(`${rurl}${stateId}`)
      .then((res) => res.json())
      .then((data) => {
        setResturant(data);
      });
  };

  // Navigate to restaurant details and pass the city state
  const handleRestaurantDetail = (event) => {
    const restaurantId = event.target.value;
    if (restaurantId !== "0") {
      const selectedCity = city.find(
        (city) => city.state_id === event.target.value
      );
      navigate(`/details/${restaurantId}`, { state: { city: selectedCity } });
    }
  };

  // return city Name
  function renderCity(data) {
    return data.map((val) => {
      return (
        <option key={val._id} value={val.state_id}>
          {val.state}
        </option>
      );
    });
  }

  // return resturant wrt city name

  function renderRestaurant(data) {
    return data.map((val) => {
      return (
        <option key={val._id} value={val.state_id}>
          {val.restaurant_name}
        </option>
      );
    });
  }
  console.log(resturant);

  return (
    <>
      <div
        className="w-full h-[85vh] bg-slate-600 box-border   "
        style={{
          background: `url(${bgImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="max-w-[1110px] mx-auto text-center text-white sm:py-[200px] py-[100px]  ">
          <h2 className="text-[40px] font-extrabold text-red-100 whitespace-nowrap  sm:hidden ">
            Zomato-app
          </h2>
          <h3 className="text-[30px] font-bold leading-[30px] px-[5px] sm:px-1">
            Find the best restaurants, cafés, and bars
          </h3>
          <div className="mt-[40px]">
            <form
              action=""
              className="grid grid-cols-1 sm:grid-cols-[40%_auto] sm:gap-[11px] gap-4   mx-auto sm:px-[50px] lg:px-[150px] "
            >
              <select
                onChange={handleResturant}
                className="text-[#636F88] outline-none px-[10px] py-[12px] text-[20px] mx-[40px] sm:mx-0  hover:bg-slate-100 bg-white "
                style={{ appearance: "none" }}
                defaultValue={0}
              >
                <option value={0} disabled defaultValue hidden>
                  Please Type a Location
                </option>
                {renderCity(city)}
              </select>

              <select
                onChange={handleRestaurantDetail}
                className="text-[#636F88] outline-none px-[10px] py-[12px] text-[20px] mx-[40px] sm:mx-0 hover:bg-slate-100 bg-white  "
                style={{ appearance: "none" }}
                defaultValue={0}
              >
                <option value={0} disabled hidden>
                  Search for restaurants
                </option>
                {renderRestaurant(resturant)}
              </select>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Search;
