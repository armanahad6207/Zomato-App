import { useState } from "react";
import { useNavigate } from "react-router-dom";

const url = "http://localhost:9000/api/auth/register";

export default function Register() {
  const [state, setState] = useState({
    name: "arman",
    email: "arman@gmail.com",
    password: "2sjdf13123",
    phone: "32980192",
    role: "user", // Ensure role is included
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent default form submission
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(state),
    })
      .then((res) => {
        if (!res.ok) {
          return res.json().then((error) => {
            throw new Error(
              `HTTP error! status: ${res.status}, message: ${error.message}`
            );
          });
        }
        return res.json();
      })
      .then((data) => {
        console.log(data); // Log the response for debugging
        navigate("/login");
      })
      .catch((error) => {
        console.error("Error during registration:", error.message);
      });
  };

  return (
    <>
      <div className="w-[1110px] container mx-auto py-4 px-4 md:px-8 lg:px-16 border border-blue-600 my-2">
        <h2 className="text-3xl text-white rounded-sm font-bold mb-4 bg-blue-600 px-2 py-4">
          User Registration
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid md:grid-cols-2 gap-4 items-center">
            <div>
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="name"
              >
                User Name:
              </label>
              <input
                type="text"
                name="name"
                value={state.name}
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
                name="email"
                value={state.email}
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
                htmlFor="password"
              >
                Password:
              </label>
              <input
                type="password"
                name="password"
                value={state.password}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
            <div className="gap-3">
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="phone"
              >
                Phone:
              </label>
              <input
                type="tel"
                name="phone"
                value={state.phone}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
            <div className="gap-3">
              <label
                className="block text-lg font-semibold mb-2 md:mb-0"
                htmlFor="role"
              >
                Role:
              </label>
              <input
                type="text"
                name="role"
                value={state.role}
                onChange={handleChange}
                required
                className="w-full p-2 border border-blue-400 rounded"
              />
            </div>
          </div>
          <div className="md:flex md:px-4 gap-2 items-center"></div>
          <div className="md:px-4">
            <button
              type="submit"
              className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
            >
              Register
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
