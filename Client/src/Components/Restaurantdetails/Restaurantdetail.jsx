import { Link, useLocation } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import { useState, useEffect } from "react";
import Menulist from "./Menulist";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "http://localhost:3000";
function Restaurantdetail() {
  let [details, setDetails] = useState("");
  let [menuList, setMenuList] = useState([]);
  let [mealId, setMealId] = useState("");
  let [img, setImg] = useState();
  let location = useLocation();

  useEffect(() => {
    const storedMealId = sessionStorage.getItem("mealId");
    if (storedMealId) {
      setMealId(storedMealId);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      let restId = location.pathname.split("=")[1];

      //restaurant details api calling
      try {
        let response = await fetch(`${url}/details/${restId}`);
        let data = await response.json();
        setDetails(data[0]);
        setImg(data[0].image_gallery[2]);
        console.log("details", data);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }

      //menuList Api calling
      try {
        let resp = await fetch(`${url}/menu/${restId}`);
        let menuData = await resp.json();
        setMenuList(menuData);
        console.log("menuList", menuData[0]);
      } catch (error) {
        console.error("Error fetching restaurant details:", error);
      }
    };

    fetchData();
  }, [location.pathname]);
  console.log("menulist", menuList);

  return (
    <div className="container mx-auto py-4">
      {Object.keys(details).length > 0 && (
        <div className="flex flex-wrap items-center justify-center">
          {/* Left side: Restaurant image */}
          <div className="w-full md:w-1/2 lg:w-1/3 px-12 mb-4">
            <img
              src={img}
              alt={details.restaurant_name}
              className="rounded-lg shadow-lg w-full"
            />
          </div>
          {/* Right side: Restaurant details */}
          <div className="w-full md:w-1/2 lg:w-2/3 pr-12 pl-[20px]">
            <h1 className="text-3xl font-bold mb-2">
              {details.restaurant_name}
            </h1>
            <p className="text-gray-700 text-lg mb-4">
              200+ customers say it's "{details.rating_text}"
            </p>
            <div className=" mb-4">
              <div className="mr-8">
                <del className="text-gray-600">Old Price: Rs/- 1000</del>
                <p className="text-gray-800 font-bold">
                  New Price: ${details.cost}
                </p>
                <p className="text-gray-600">
                  Best Taste of Fresh and hot food at your Door step and
                  Dine-in.
                </p>
              </div>
            </div>
            <div className="mb-4">
              <button className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 mr-2">
                Veg
              </button>
              <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4">
                Non-Veg
              </button>
            </div>
            <Tabs>
              <TabList>
                <Tab>About Us</Tab>
                <Tab>Contact Us</Tab>
              </TabList>

              <TabPanel>
                <h2>
                  {details.restaurant_name} with the ratting as{" "}
                  {details.average_rating} which us {details.rating_text}.
                </h2>
              </TabPanel>
              <TabPanel>
                <h2>
                  address: {details.address}. --- Ph. {details.contact_number}.
                </h2>
              </TabPanel>
            </Tabs>
          </div>
        </div>
      )}

      <div className="bg-slate-200">
        <Menulist menu={menuList} restaurant={details} />
        <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
      </div>
      <div className="  my-2 flex flex-row-reverse m-0">
        <Link
          to={`/listing/${mealId}`}
          className=" bg-slate-800 text-white px-[30px] py-[6px] text-center mx-2"
        >
          Back
        </Link>
      </div>
    </div>
  );
}

export default Restaurantdetail;
