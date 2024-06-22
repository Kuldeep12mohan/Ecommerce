import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuOpenIcon from "@mui/icons-material/MenuOpen";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import axios from "axios";
import ProductCard from "./ProductCard";
import toast, { Toaster } from "react-hot-toast";

const LandingPage = () => {
  const [user, setUser] = useState();
  const [showUser, setShowUser] = useState(false);
  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios.get(
        "http://localhost:3001/api/v1/users/getUser",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      setUser(response.data.user);
      setShowUser(true);
      console.log(response);
    };
    fetchUser();
  }, []);
  const navigate = useNavigate();
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);
  const [isCategoryVisible, setIsCategoryVisible] = useState(false);
  const [products, setProducts] = useState([]);
  //basic function
  const toggleDropdown = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  const toggleCategory = () => {
    setIsCategoryVisible(!isCategoryVisible);
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) navigate("/login");
  }, []);
  useEffect(() => {
    const fetchProduct = async () => {
      const response = await axios.get("https://fakestoreapi.com/products/");
      setProducts(response.data);
    };
    fetchProduct();
  }, []);

  const logout = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/api/v1/users/logout",
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      console.log(response);
      localStorage.removeItem("token");
      toast.success("logout successfully");
      setShowUser(false);
      setUser(null);
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen p-4">
      <div className="sticky top-0 flex bg-black justify-around items-center p-3 shadow-md rounded-lg w-full z-20">
        <div className="bg-gradient-to-r from-orange-500 to-yellow-500 text-transparent bg-clip-text text-3xl font-bold w-1/5 break-words">
          EcomHaven
        </div>
        <div className="flex items-center border border-gray-300 rounded-lg p-2 w-2/5">
          <input
            type="text"
            placeholder="Search products here"
            className="outline-none flex-grow px-2 w-full"
          />
          <SearchIcon className="text-gray-500" />
        </div>
        <div className="flex justify-around w-1/5 relative">
          <div className="relative">
            <PersonIcon
              className="hover:cursor-pointer"
              onClick={toggleDropdown}
            />
            {isDropdownVisible && (
              <div
                className="absolute right-0 mt-2 w-48 bg-black border border-gray-300 rounded-lg shadow-lg hover:cursor-pointer"
                onClick={toggleDropdown}
              >
                {showUser ? (
                  <>
                    <div
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                      onClick={() => navigate("/profile")}
                    >
                      Profile
                    </div>
                    <div
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                      onClick={logout}
                    >
                      Logout
                    </div>
                  </>
                ) : (
                  <>
                    <div
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                      onClick={() => navigate("/signup")}
                    >
                      Signup
                    </div>
                    <div
                      className="block px-4 py-2 text-white hover:bg-white hover:text-black"
                      onClick={() => navigate("/login")}
                    >
                      Login
                    </div>
                  </>
                )}
              </div>
            )}
          </div>
          <FavoriteIcon className="hover:cursor-pointer" />
          <ShoppingCartIcon className="hover:cursor-pointer" />
        </div>
      </div>
      <div className="flex ml-2 mt-4 bg-black items-center border-b border-red-400">
        <div
          className=" hover:cursor-pointer py-2 px-3 relative"
          onClick={toggleCategory}
        >
          <MenuOpenIcon className="mr-3" />
          Browse All Category
          <ArrowDropDownIcon className="ml-2" />
          {isCategoryVisible && (
            <div className="absolute right-0 mt-2 w-full bg-black border border-gray-300 rounded-lg shadow-lg">
              <div className="block px-4 py-2 text-white hover:bg-white hover:text-black">
                Laptops
              </div>
              <div className="block px-4 py-2 text-white hover:bg-white hover:text-black">
                Mobiles
              </div>
              <div className="block px-4 py-2 text-white hover:bg-white hover:text-black">
                Households
              </div>
              <div className="block px-4 py-2 text-white hover:bg-white hover:text-black">
                Clothes
              </div>
            </div>
          )}
        </div>
        <div className="py-2 px-5 hover:cursor-pointer">Home</div>
        <div className="py-5 px-5 relative hover:cursor-pointer">
          Today's deal
          <span className="absolute top-0 right-0 mb-7 bg-red-500 px-2 rounded-lg text-sm">
            Hot
          </span>
        </div>
        <div className="py-2 px-5 hover:cursor-pointer">Smart watches</div>
        <div className="py-5 px-5 relative hover:cursor-pointer">
          New arrivals
          <span className="absolute top-0 right-0 mb-7 bg-yellow-500 px-2 rounded-lg text-sm">
            New
          </span>
        </div>
        <div className="py-2 px-5 hover:cursor-pointer">About Us</div>
        <div className="py-2 px-5 hover:cursor-pointer">All brands</div>
        <div className="py-2 px-5 hover:cursor-pointer">Blog</div>
      </div>
      <div className="flex flex-wrap justify-center">
        {products.map((item, index) => (
          <div key={index}>
            <ProductCard
              title={item.title}
              image={item.image}
              buttonText="Buy"
              description={item.description}
            />
          </div>
        ))}
      </div>
      <Toaster />
    </div>
  );
};

export default LandingPage;
