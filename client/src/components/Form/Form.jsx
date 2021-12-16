import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTemps, postNewDog } from "../../actions";
import { useHistory } from "react-router-dom";
import "./form.css";

// function validate(input) {
//   let errors = {};
//   if (!input.name) {
//     errors.name = "The name is required";
//   } else if (!input.summary) {
//     errors.summary = "Age is required";
//   } else if (input.score > 100) {
//     errors.score = "The score has to be lower than 100";
//   } else if (input.health > 100) {
//     errors.health = "The healt has to be lower than 100";
//   }
//   return errors;
// }

export function Form() {
  const obj = {
    name: "",
    weight: "",
    height: "",
    age: "",
    temperament: [],
    tempsString: "",
  };

  const dispatch = useDispatch();
  const temps = useSelector((state) => state.temps);
  const history = useHistory();

  useEffect(() => {
    dispatch(getTemps());
  }, [dispatch]);

  const [input, setInput] = useState(obj);

  function handleChange(e) {
    const { name, value } = e.target;
    if (name !== "temperament") {
      setInput({
        ...input,
        [name]: value,
      });
    } else {
      setInput({
        ...input,
        temperament: [...input.temperament, value],
      });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault(e);
    input.tempsString = input.temperament.join(", ");
    const flag = await postNewDog(input);
    setInput(obj);
    flag === true ? alert("Dog Created") : alert("An error has ocurred");
    history.push("/home");
  }

  return (
    <div className="container">
      <h1>Create New Dog</h1>
      <div className="form-container">
        <form
          onChange={(e) => handleChange(e)}
          onSubmit={(e) => handleSubmit(e)}
        >
          <label>Name: </label>
          <input
            onChange={(e) => handleChange(e)}
            name="name"
            placeholder=""
            value={input.name}
            required
            type="text"
          />

          <label>Weight: </label>
          <input
            onChange={(e) => handleChange(e)}
            name="weight"
            placeholder="Kg"
            value={input.weight}
            required
            type="number"
          />

          <label>Height: </label>
          <input
            onChange={(e) => handleChange(e)}
            name="height"
            placeholder="Cm"
            value={input.height}
            required
            type="number"
          />

          <label>Age: </label>
          <input
            onChange={(e) => handleChange(e)}
            name="age"
            placeholder="Years"
            value={input.age}
            type="number"
          />
          <div className="bot-form">
            <label>Select Temperament</label>
            <select
              onChange={(e) => handleChange(e)}
              multiple={true}
              name="temperament" //"temp"
            >
              {temps?.map((temp, index) => (
                <option key={index} value={temp.name}>
                  {temp.name}
                </option>
              ))}
            </select>
            {input.temperament.map((el, index) => (
              <li key={index}>{` ${el}`}</li>
            ))}
            <button className="btn" type="submit">
              Add Dog
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
