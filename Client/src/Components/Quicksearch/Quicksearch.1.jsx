import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const murl = "http://localhost:3000/mealtype";
export default function Quicksearch() {
  const [mealType, setMealType] = useState([]);

  useEffect(() => {
    const fetchMealData = async () => {
      const response = await fetch(murl);
      const data = await response.json();
      setMealType(data);
    };
    fetchMealData();
  }, []);
  console.log("mealtype data", mealType);

  return (
    <div className="bg-slate-200">
      <section className="max-w-[1110px] mx-auto py-[50px]">
        <h1 className="text-[30px] text-left font-bold text-[#192F60] sm:px-0 px-[20px]">
          Quick Searches
        </h1>
        <h3 className="text-[18px] text-[#8C96AB] text-left sm:px-0 px-[20px] whitespace-nowrap">
          Discover restaurants by type of meal
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6 sm:px-[30px] px-[20px]">
          {mealType.map((item) => (
            <Link key={item._id} to={`/listing/${item.mealtype_id}`}>
              <div
                key={item.mealtype_id}
                className="max-w-md mx-auto  shadow-md rounded-lg overflow-hidden md:max-w-2xl hover:scale-110 bg-white "
              >
                <div className="sm:flex">
                  <div className="md:flex-shrink-0">
                    <img
                      className="w-full object-cover h-[100%] rounded-sm  md:w-48"
                      src={item.meal_image}
                    />
                  </div>
                  <div className="px-5 py-6">
                    <h2 className="text-2xl  font-bold text-[#192F60]">
                      {item.mealtype}
                    </h2>
                    <p className="mt-2 text-gray-600 leading-[18px]">
                      {item.content}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
