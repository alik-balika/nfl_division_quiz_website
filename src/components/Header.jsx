import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

function Header() {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header className="bg-blue-900 text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="lg:text-2xl font-bold">NFL Division Quiz</h1>
        <div className="block lg:hidden">
          <FontAwesomeIcon
            onClick={toggleMenu}
            className="cursor-pointer text-2xl"
            icon={faBars}
          />
        </div>
        <nav
          className={`lg:flex ${showMenu ? "block" : "hidden"} mt-4 lg:mt-0`}
        >
          <ul className="flex space-x-4">
            <li className="transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110">
              <a href="#" className="hover:text-gray-300">
                Quiz 1
              </a>
            </li>
            <li className="transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110">
              <a href="#" className="hover:text-gray-300">
                Quiz 2
              </a>
            </li>
            <li className="transition ease-in-out duration-300 hover:-translate-y-1 hover:scale-110">
              <a href="#" className="hover:text-gray-300">
                Quiz 3
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
