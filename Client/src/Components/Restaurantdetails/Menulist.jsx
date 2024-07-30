import PropTypes from "prop-types";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const url = "http://localhost:3000";

function Menulist({ menu, restaurant }) {
  const [order, setOrder] = useState([]);
  const [totalCost, setTotalCost] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const storedOrder = JSON.parse(sessionStorage.getItem("finalOrder"));
    const storedCost = sessionStorage.getItem("totalCost");
    if (storedOrder) {
      setOrder(storedOrder);
    }
    if (storedCost) {
      setTotalCost(parseFloat(storedCost));
    }
  }, []);

  useEffect(() => {
    sessionStorage.setItem("finalOrder", JSON.stringify(order));
    sessionStorage.setItem("totalCost", totalCost.toString());
  }, [order, totalCost]);

  const addToOrder = (item) => {
    setOrder((prevOrder) => {
      const updatedOrder = [...prevOrder, item];
      const orderIds = updatedOrder.map((val) => val.menu_id);
      sessionStorage.setItem("finalOrder", JSON.stringify(orderIds));

      const requestBody = {
        menu_id: orderIds,
      };

      fetch(`${url}/menuItem`, {
        method: "POST",
        body: JSON.stringify(requestBody),
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            return res.json().then((error) => {
              throw new Error(error.error);
            });
          }
          return res.json();
        })
        .then((data) => {
          let newTotalCost = totalCost;
          data.forEach((item) => {
            newTotalCost += parseFloat(item.menu_price);
          });
          setTotalCost(newTotalCost);
        })
        .catch((error) => {
          console.error("Error:", error.message);
        });

      return updatedOrder;
    });
  };

  const removeFromOrder = (menu_id) => {
    setOrder((prevOrder) => {
      const updatedOrder = prevOrder.filter((item) => item.menu_id !== menu_id);
      const removedItem = prevOrder.find((item) => item.menu_id === menu_id);
      setTotalCost((prevCost) => prevCost - parseFloat(removedItem.menu_price));
      sessionStorage.setItem(
        "finalOrder",
        JSON.stringify(updatedOrder.map((val) => val.menu_id))
      );
      sessionStorage.setItem(
        "totalCost",
        (totalCost - parseFloat(removedItem.menu_price)).toString()
      );
      return updatedOrder;
    });
  };

  const finalizeOrder = () => {
    navigate(`/placeorder/${encodeURIComponent(restaurant.restaurant_name)}`);
  };

  const totalItems = order.length;

  return (
    <div className="container mx-auto py-4">
      <div className="mt-4">
        <p className="text-3xl">
          Total items added: <span className="font-bold">{totalItems}</span>
        </p>
        <p className="text-3xl">
          Total cost: <span className="font-bold">Rs/- {totalCost}</span>
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {menu.map((item) => (
          <div
            key={item.menu_id}
            className="shadow-lg rounded-lg p-4 grid grid-cols-[40%_auto] md:grid-cols-1 gap-4"
          >
            <div>
              <img
                src={item.menu_image}
                alt={item.menu_name}
                className="rounded-lg mb-2 h-full object-cover md:w-full md:h-50"
              />
            </div>
            <div>
              <div className="mb-2">
                <h3 className="text-lg font-semibold">{item.menu_name}</h3>
                <p className="text-gray-800 font-bold">
                  Rs/- {item.menu_price}
                </p>
                <p className="my-2">
                  <span className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-2 rounded">
                    {item.menu_type}
                  </span>
                </p>
              </div>
              <div className="flex flex-col md:flex-row gap-2">
                <button
                  onClick={() => addToOrder(item)}
                  className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                >
                  Add to Cart
                </button>
                <button
                  onClick={() => removeFromOrder(item.menu_id)}
                  className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
                >
                  Remove from Cart
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-center">
        <button
          onClick={finalizeOrder}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mt-4"
        >
          Proceed
        </button>
      </div>
      <ToastContainer position="top-right" autoClose={3000} hideProgressBar />
    </div>
  );
}

Menulist.propTypes = {
  menu: PropTypes.arrayOf(
    PropTypes.shape({
      menu_name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      menu_price: PropTypes.number.isRequired,
      menu_type: PropTypes.string.isRequired,
      menu_image: PropTypes.string.isRequired,
      menu_id: PropTypes.string.isRequired,
    })
  ).isRequired,
  restaurant: PropTypes.shape({
    restaurant_name: PropTypes.string.isRequired,
  }).isRequired,
};

export default Menulist;
