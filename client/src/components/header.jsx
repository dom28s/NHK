import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { ThemeLogo } from '../assets/logoList';

export default function Header() {
  const navigate = useNavigate();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex flex-row w-full justify-between items-center p-5 bg-white text-gray-800 dark:bg-gray-900 dark:text-white transition-colors duration-200 select-none shadow-sm ">
      <div className="flex flex-col items-center cursor-pointer" onClick={toggleTheme} title="Click to toggle theme">
        <ThemeLogo theme={theme} className="h-12 w-auto" />
      </div>
      <ul className="flex flex-row space-x-5 items-center">
        <li className="cursor-pointer hover:text-orange-600 transition-colors" onClick={() => navigate("/favorite")}>FAVORITE</li>
        <li className="cursor-pointer hover:text-orange-600 transition-colors" onClick={() => navigate("/home")}>HOME</li>
        <li className="cursor-pointer hover:text-orange-600 transition-colors" onClick={() => navigate("/chat")}>CHAT</li>
        <li>
          <div className="flex flex-col">
            <div className="flex flex-row items-center">
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80" className="w-12 h-12 rounded-full" />
              <div className="flex flex-col">
                <p className="text-sm font-medium">Thanawat</p>
                <p className="text-xs text-gray-500">Online</p>
              </div>
            </div>

          </div>
        </li>
      </ul>
    </div>
  );
}
