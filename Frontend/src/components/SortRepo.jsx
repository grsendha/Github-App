import React from "react";

const SortRepo = ({ onSort, sortType }) => {
  return (
    <div className="mb-2 flex justify-center lg:justify-end">
      <button
        onClick={() => onSort("recent")}
        type="button"
        className={`py-2.5 px-5 me-2 mb-2 text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass border 
         ${
           sortType === "recent"
             ? "border border-blue-300"
             : "border-transparent"
         }`}
      >
        Most Recent
      </button>
      <button
        onClick={() => onSort("stars")}
        type="button"
        className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass border  
        ${
          sortType === "stars" ? "border border-blue-300" : "border-transparent"
        }`}
      >
        Most Stars
      </button>
      <button
        onClick={() => onSort("forks")}
        type="button"
        className={`py-2.5 px-5 me-2 mb-2  text-xs sm:text-sm font-medium focus:outline-none rounded-lg bg-glass border 
        ${
          sortType === "forks" ? "border border-blue-300" : "border-transparent"
        }`}
      >
        Most Forks
      </button>
    </div>
  );
};

export default SortRepo;
