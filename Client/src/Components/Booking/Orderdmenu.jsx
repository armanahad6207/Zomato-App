import { useEffect, useState } from "react";
import Header from "../Header/Header";
import Displayorderdlist from "../OrderList/Displayorderdlist";
// import axios from "axios";

const url = "http://localhost:3000/orders";

function Orderdmenu() {
  let sessionData = sessionStorage.getItem("userInfo");
  let userData = JSON.parse(sessionData);
  console.log("userinfo", userData.email);
  let [orders, setOrders] = useState();

  useEffect(() => {
    const ordersDetail = async () => {
      let resp = await fetch(`${url}?email=${userData.email}`);
      let data = await resp.json();
      setOrders(data);
      console.log("data is w.r.t mail", data);
    };
    ordersDetail();
  }, []);

  console.log("my order", orders);

  return (
    <div className="flex flex-col gap-[100px]">
      <Header />
      <Displayorderdlist orderList={orders} />
    </div>
  );
}

export default Orderdmenu;
