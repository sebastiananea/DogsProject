import React from "react";

import { Link } from "react-router-dom";

export default function Select({
  handleAlphFilter,
  handleClick,
  handleCreatedFilter,
  handleTempFilter,
  handleWeightFilter,
  allTemps,
}) {
  return (
    <div>
      <div className="btn-container">
        <Link className="btn" to="/dog">
          Create Dog
        </Link>
        <button className="btn" onClick={(e) => handleClick(e)}>
          Load all the breeds
        </button>
      </div>
      <div>
        <select onChange={(e) => handleAlphFilter(e)}>
          <option value="az">A-Z</option>
          <option value="za">Z-A</option>
        </select>
        <select onChange={(e) => handleWeightFilter(e)}>
          <option value="menor">Lower to Higher</option>
          <option value="mayor">Higher to Lower</option>
        </select>
        <select onChange={(e) => handleCreatedFilter(e)}>
          <option value="todos">All existents</option>
          <option value="creado">Created by the user</option>
        </select>
        <select onChange={(e) => handleTempFilter(e)}>
          {allTemps?.map((temp, index) => (
            <option key={index} value={temp.name}>
              {temp.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
