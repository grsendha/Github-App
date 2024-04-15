import React from "react";

const EmptyLike = () => {
  return (
    <div className="w-full h-1/3 flex bg-glass">
      <h1 className="text-white text-center text-2xl m-auto">
        <span role="img" aria-label="No Likes">
          👎
        </span>{" "}
        No Likes
      </h1>
    </div>
  );
};

export default EmptyLike;
