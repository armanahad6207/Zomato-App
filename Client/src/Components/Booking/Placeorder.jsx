import { useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// const murl = "http://localhost:3000/menuItem";
const purl = "http://localhost:3000/placeorder";

function Placeorder() {
  const params = useParams();
  const { restName } = params;
  const { restaurantName } = useParams();
  console.log(restaurantName);
  const navigate = useNavigate();

  // get userdata from sessionStorage
  let userData = sessionStorage.getItem("userInfo");
  console.log("user", userData);
  let user = JSON.parse(userData);
  console.log(user);

  const [formData, setFormData] = useState({
    id: Math.floor(Math.random() * 1000),
    rest_name: restName,
    name: user.name,
    email: user.email,
    phone: user.phone,
    address: "piska nagri, ranchi",
    totalPrice: sessionStorage.getItem("totalCost"), // Assuming you have a state for total order price
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const CheckOut = (e) => {
    e.preventDefault();
    console.log("formData", formData);
    fetch(purl, {
      method: "POST",
      headers: {
        accept: "application/json",
        "Content-type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then(() => {
      navigate("/orderBooking");
    });
  };

  return (
    <div className="h-full w-full px-[10px] sm:px-[80px] md:px-[50px]">
      <div className="max-w-[1110px] container mx-auto py-4 px-4 md:px-8 lg:px-16 border border-blue-600 my-2">
        <h2 className="text-3xl text-white rounded-sm font-bold mb-4 bg-blue-600 px-2 py-4">
          Order from {restaurantName}
        </h2>
        <form className="space-y-4" onSubmit={CheckOut}>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="name"
              >
                Name:
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
            <div>
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="email"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="phone"
              >
                Phone Number:
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
            <div className="gap-2">
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="address"
              >
                Address:
              </label>
              <textarea
                id="address"
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              ></textarea>
            </div>
          </div>
          <div className="md:flex md:px-4 gap-2 items-center">
            <p className="text-lg font-semibold">
              Total Order Price:
              <span className="font-bold">Rs/-{formData.totalPrice} </span>
            </p>
          </div>
          <div className="md:px-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Place Order
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Placeorder;
