import React from "react";
import "./Home.css";
import { Link } from "react-router-dom";

export default function Card({
  img,
  name,
  temperament,
  weight,
  id,
  error,
  temp,
}) {
  return (
    <Link to={`home/${id}`}>
      <div className="card">
        {name ? <h4>{name}</h4> : <h5>{error}</h5>}

        <div
          className="img"
          style={{
            backgroundImage: `url(${img})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            backgroundSize: "cover",
            width: "310px",
            height: "250px",
          }}
        ></div>
        {weight ? <h5>{weight} Kg</h5> : null}
        {temperament ? (
          <h5>{temperament}</h5>
        ) : (
          <h5>{temp?.map((dog) => ` ${dog.name}`)}</h5>
        )}
      </div>
    </Link>
  );
}
