import React from "react";

export const Rank = ({ name, entries }) => {
  console.log("name :>>", name);
  console.log("entries :>> ", entries);
  return (
    <div>
      <div className="white f3">
        {`Hi, ${name}. 
          Your current entry count is...`}
      </div>
      <div className="white f1">{entries}</div>
    </div>
  );
};
