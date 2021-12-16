import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getDogs,
  getTemps,
  filterByTemp,
  filterAlph,
  filterWeight,
  filterCreated,
} from "../../actions";

import Card from "./Card";
import Paginado from "./Paginado";
import "./Home.css";
import { SearchBar } from "./SearchBar";
import Select from "./Select";

export default function Home() {
  const dispatch = useDispatch();
  const allDogs = useSelector((state) => state.dogs);
  const allTemps = useSelector((state) => state.temps);

  const [, setOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [dogsPerPage] = useState(8);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;
  const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    dispatch(getDogs());
    dispatch(getTemps());
  }, [dispatch]);

  function handleClick(e) {
    e.preventDefault();
    dispatch(getDogs());
  }

  function handleTempFilter(e) {
    e.preventDefault();
    dispatch(filterByTemp(e.target.value));
  }

  function handleAlphFilter(e) {
    e.preventDefault();
    dispatch(filterAlph(e.target.value));
    paginado(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  function handleWeightFilter(e) {
    e.preventDefault();
    dispatch(filterWeight(e.target.value));
    paginado(1);
    setOrder(`ordenado ${e.target.value}`);
  }

  function handleCreatedFilter(e) {
    e.preventDefault();
    dispatch(filterCreated(e.target.value));
  }

  return (
    <div>
      <div className="nav">
        <Select
          handleClick={handleClick}
          handleAlphFilter={handleAlphFilter}
          handleCreatedFilter={handleCreatedFilter}
          handleTempFilter={handleTempFilter}
          handleWeightFilter={handleWeightFilter}
          allTemps={allTemps}
        />
        <SearchBar />
      </div>

      <div className="cards">
        {currentDogs?.map((dog) => {
          return (
            <Card
              key={dog.id}
              id={dog.id}
              img={dog.img}
              name={dog.name}
              error={dog.error}
              temperament={dog.temperament}
              temp={dog.temps}
              weight={dog.weight}
            />
          );
        })}
      </div>
      <Paginado
        dogsPerPage={dogsPerPage}
        allDogs={allDogs.length}
        paginado={paginado}
      />
    </div>
  );
}
