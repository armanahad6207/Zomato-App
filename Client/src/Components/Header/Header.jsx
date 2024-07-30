import { Link, useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useEffect, useState } from "react";

const url = "http://localhost:9000/api/auth/userInfo";

function Header() {
  const [userData, setUserData] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = sessionStorage.getItem("ltk");

    if (!token) {
      console.error("No authentication token found");
      navigate("/login");
      return;
    }

    fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-access-token": token,
      },
    })
      .then((res) => {
        if (!res.ok) {
          if (res.status === 403) {
            console.error("Access forbidden: invalid or missing token");
            navigate("/login");
          }
          throw new Error(`HTTP error! status: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setUserData(data);
      })
      .catch((error) => {
        console.error("Error fetching user info:", error.message);
      });
  }, [navigate]);

  const handleLogout = () => {
    sessionStorage.setItem("loginstatus", "loggedOut");
    sessionStorage.setItem("userInfo", "");
    setUserData("");
    sessionStorage.removeItem("ltk");
    navigate("/login");
  };

  const conditionalHandler = () => {
    if (userData.name) {
      sessionStorage.setItem("loginstatus", "loggedIn");
      sessionStorage.setItem("userInfo", JSON.stringify(userData));
      return (
        <div className="mr-[20px] sm:mr-[40px] space-x-3 sm:space-x-6 text-white mt-[25px] sm:mt-[10px] ">
          <Link
            to="#"
            className=" bg-slate-600 text-white border  border-white px-[14px] py-[8px] text-center rounded-sm hover:text-slate-200"
          >
            Hi, {userData.name}
          </Link>
          <button
            className=" bg-red-400  px-[13px] py-[7px]  rounded-sm"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      );
    } else {
      return (
        <div className="mr-[20px] sm:mr-[40px] space-x-3 sm:space-x-6 text-white">
          <Link
            to="/login"
            className="border border-white px-[12px] py-[4px] text-center rounded-sm hover:text-slate-200"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="border border-white px-[12px] py-[4px] text-center rounded-sm hover:text-slate-200"
          >
            SignUp
          </Link>
        </div>
      );
    }
  };

  return (
    <div className="w-full">
      <header className="w-full bg-transparent fixed  p-1">
        <nav className="container mx-auto flex justify-between items-center w-full">
          <div className="mx-[20px] hidden sm:block ">
            <h2 className="text-[40px] font-extrabold hover:text-[#4f1c1c] text-red-600  whitespace-nowrap">
              <Link to="/"> Zomato-app</Link>
            </h2>
          </div>
          {conditionalHandler()}
        </nav>
      </header>
    </div>
  );
}

Header.propTypes = {
  bgColor: PropTypes.string.isRequired,
};

export default Header;
