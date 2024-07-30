import Header from "../Components/Header/Header";
import Search from "../Components/Search/Search";
import Quicksearch from "../Components/Quicksearch/Quicksearch.1";
import Footer from "../Components/Footer/Footer";

function Homepage() {
  return (
    <>
      <Header bgColor="bg-white" />
      <Search />
      <Quicksearch />
      <Footer />
    </>
  );
}

export default Homepage;
