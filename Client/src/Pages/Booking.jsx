import Placeorder from "../Components/Booking/Placeorder";
import Header from "../Components/Header/Header";

function Booking() {
  return (
    <div className="flex flex-col gap-[100px]">
      <Header />
      <Placeorder />
    </div>
  );
}

export default Booking;
