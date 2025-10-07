import React, { useEffect, useState } from "react";

const Header = () => {
  const [dark, setDark] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("darkMode") === "true";
    }
    return false;
  });

  useEffect(() => {
    localStorage.setItem("darkMode", dark);
    if (dark) document.documentElement.classList.add("dark");
    else document.documentElement.classList.remove("dark");
  }, [dark]);
  return (
    <header className="flex items-center border-b border-background-light/20 dark:border-background-dark/20 px-10 py-3">
      <button
        onClick={() => setDark(!dark)}
        className="absolute top-4 right-4 rounded-full bg-primary/10 px-3 py-2 text-sm font-medium text-primary hover:bg-primary/20"
      >
        {dark ? "Light Mode" : "Dark Mode"}
      </button>
      <div className="flex items-center gap-4 text-slate-800 dark:text-white">
        <div className="h-6 w-6">
          <svg
            className="text-primary"
            fill="none"
            viewBox="0 0 48 48"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 4H17.3334V17.3334H30.6666V30.6666H44V44H4V4Z"
              fill="currentColor"
            />
          </svg>
        </div>
        <h2 className="text-lg font-bold">AssetTrack</h2>
      </div>
    </header>
  );
};
export default Header;
