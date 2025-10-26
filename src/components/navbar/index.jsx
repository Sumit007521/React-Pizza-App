import { useContext, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { GlobalContext } from "../../context";
import logo from "./logo.png";

const options = ["pizza", "pasta", "burger", "salad", "cake", "soup", "sushi", "sandwich"];

export default function Navbar() {
  const [dropdown, setDropDown] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
  const { searchParam, setSearchParam , handleSubmit, toggleTheme, theme } = useContext(GlobalContext);

  console.log(searchParam)
  useEffect(() => {
    if (isTyping && searchParam.length > 0) {
      setDropDown(true);
    } else {
      setDropDown(false);
    }
  }, [searchParam, isTyping]);

  return (
    <nav className="flex justify-between items-center py-8 container mx-auto flex-col lg:flex-row gap-5 lg:gap-0">
      <h2 className="text-2xl font-semibold flex items-center gap-3">
        <NavLink to={"/"} className="flex items-center gap-3">
          <img src={logo} alt="Food logo" className="w-20 h-20 rounded-full shadow-sm" />
          <span className="text-black dark:text-white hover:opacity-90" style={{ color: "#FF6347" }}>Food Recipes</span>
        </NavLink>
      </h2>
      <form onSubmit={handleSubmit} className="relative">
        <input
          type="text"
          name="search"
          value={searchParam}
          onChange={(event) => {
            setSearchParam(event.target.value);
            setIsTyping(true); // user is typing
          }}
          placeholder="Enter Items..."
          className="bg-white/75 dark:bg-white/10 dark:text-white p-3 px-8 rounded-full outline-none lg:w-96 shadow-lg shadow-red-100 focus:shadow-red-200 focus:ring-2 focus:ring-red-300"
        />

        {dropdown && (
          <div className="absolute top-full left-0 mt-2 w-96 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
            <ul className="max-h-60 overflow-y-auto">
              {options
                .filter((item) =>
                  item.toLowerCase().includes(searchParam.toLowerCase())
                )
                .map((ele, index) => (
                  <li
                    key={index}
                    className="px-4 py-2 cursor-pointer hover:bg-red-100 dark:hover:bg-gray-700 rounded-md"
                    onClick={() => {
                      setSearchParam(ele);
                      setDropDown(false);
                      setIsTyping(false); // stop showing dropdown
                      handleSubmit(null, ele);
                    }}
                  >
                    {ele}
                  </li>
                ))}
            </ul>
          </div>
        )}

      </form>

      <ul className="flex gap-5 items-center">
        <li>
          <NavLink
            to={"/"}
            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 duration-300"
          >
            Home
          </NavLink>
        </li>
        <li>
          <NavLink
            to={"/favorites"}
            className="text-black dark:text-white hover:text-gray-700 dark:hover:text-gray-300 duration-300"
          >
            favorites
          </NavLink>
        </li>
        <li>
          <button type="button" onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full shadow hover:shadow-md bg-black text-white dark:bg-white dark:text-black duration-200">
            {theme === 'dark' ? (
              // Sun icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M12 18a6 6 0 100-12 6 6 0 000 12z" />
                <path fillRule="evenodd" d="M12 2.25a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0V3a.75.75 0 01.75-.75zm0 16.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm9-7.5a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5H20.25a.75.75 0 01.75.75zM5.25 12a.75.75 0 01-.75.75H3a.75.75 0 010-1.5h1.5a.75.75 0 01.75.75zm12.728 6.022a.75.75 0 010 1.06l-1.06 1.061a.75.75 0 11-1.061-1.06l1.06-1.061a.75.75 0 011.061 0zM8.143 4.917a.75.75 0 010 1.061L7.083 7.04A.75.75 0 015.99 5.98l1.06-1.06a.75.75 0 011.092-.003zM18.01 5.98a.75.75 0 10-1.061-1.06l-1.06 1.06A.75.75 0 0017.95 7.04l1.06-1.06zM6.272 18.022a.75.75 0 10-1.061 1.06l1.06 1.061a.75.75 0 101.061-1.06l-1.06-1.061z" clipRule="evenodd" />
              </svg>
            ) : (
              // Moon icon
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M21.752 15.002A9 9 0 1112.998 2.248a7 7 0 108.754 12.754z" />
              </svg>
            )}
          </button>
        </li>
      </ul>
    </nav>
  );
}
