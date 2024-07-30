import PropTypes from "prop-types";
import { Link } from "react-router-dom";
function Filterrestaurant({ resData }) {
  return (
    <div className="md:w-[700px] sm:w-[400px] w-[350px] mx-auto bg-white shadow-md rounded-lg overflow-hidden md:max-w-2xl">
      {/* First Row */}
      <div className="md:flex">
        <div className="md:flex-shrink-0">
          <Link to={`/details/restId=${resData.restaurant_id}`}>
            <img
              className="h-48 w-full object-cover md:w-48 px-2 py-3 rounded-lg hover:p-0"
              src={resData.restaurant_thumb}
              alt="Image"
            />
          </Link>
        </div>
        <div className="p-8">
          <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold ">
            <Link to={`/details/restId=${resData.restaurant_id}`}>
              {resData.restaurant_name}
            </Link>
          </div>
          <p className="mt-2 text-gray-500">{resData.address}</p>
        </div>
      </div>
      {/* Second Row */}
      <div className="p-8 bg-gray-100">
        <div className="flex justify-between items-center">
          <span className="text-gray-700 font-medium whitespace-nowrap flex sm:flex-row flex-col gap-1">
            Cuisine:
            {resData.cuisines.map((val) => {
              return (
                <button
                  key={val.cuisine_id}
                  className=" bg-red-500 text-center text-[12px] px-[5px] py-[2px]  whitespace-nowrap"
                >
                  {val.cuisine_name}
                </button>
              );
            })}
          </span>
          <span className="text-gray-900 font-semibold">${resData.cost}</span>
        </div>
      </div>
    </div>
  );
}
Filterrestaurant.propTypes = {
  resData: PropTypes.shape({
    restaurant_name: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    cuisines: PropTypes.string.isRequired,
    cost: PropTypes.number.isRequired,
    restaurant_thumb: PropTypes.string.isRequired,
    restaurant_id: PropTypes.string.isRequired,
  }).isRequired,
};

export default Filterrestaurant;
