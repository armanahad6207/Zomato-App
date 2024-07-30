// import Orderdmenu from "./Components/Booking/Orderdmenu";
import Booking from "./Pages/Booking";
import Homepage from "./Pages/Homepage";
import Listingpage from "./Pages/Listingpage";
import Restdetail from "./Pages/Restdetail";

function Layout() {
  return (
    <>
      <Homepage />
      <Listingpage />
      <Restdetail />
      <Booking />
      {/* <Orderdmenu /> */}
    </>
  );
}

export default Layout;
