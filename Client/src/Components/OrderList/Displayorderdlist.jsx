// import { useState } from "react";
import Paymentform from "./Paymentform";
import PropTypes from "prop-types";

function DisplayOrderedList({ orderList }) {
  const renderData = () => {
    if (!Array.isArray(orderList)) {
      return null;
    }

    return orderList.map((order) => (
      <tr key={order.id}>
        <td className="border px-4 py-2">{order.id}</td>
        <td className="border px-4 py-2">{order.rest_name}</td>
        <td className="border px-4 py-2">{order.name}</td>
        <td className="border px-4 py-2">{order.email}</td>
        <td className="border px-4 py-2">{order.phone}</td>
        <td className="border px-4 py-2">{order.totalPrice}</td>
      </tr>
    ));
  };

  return (
    <div className="overflow-x-auto">
      <h2 className="text-xl font-bold mb-4">Ordered List</h2>
      <table className="w-full mt-4">
        <thead>
          <tr>
            <th className="bg-gray-200 text-left px-4 py-2">ID</th>
            <th className="bg-gray-200 text-left px-4 py-2">Restaurant Name</th>
            <th className="bg-gray-200 text-left px-4 py-2">Name</th>
            <th className="bg-gray-200 text-left px-4 py-2">Email</th>
            <th className="bg-gray-200 text-left px-4 py-2">Phone</th>
            <th className="bg-gray-200 text-left px-4 py-2">Cost</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
      <Paymentform />
    </div>
  );
}

DisplayOrderedList.propTypes = {
  orderList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      rest_name: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
      phone: PropTypes.string.isRequired,
      cost: PropTypes.number.isRequired,
    })
  ).isRequired,
};

export default DisplayOrderedList;
