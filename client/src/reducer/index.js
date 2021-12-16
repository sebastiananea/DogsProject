const initialState = {
  dogsBackup: [],
  dogs: [],
  temps: [{ name: "All" }],
  dogDetail: [],
};

export function rootReducer(state = initialState, action) {
  const allDogs = state.dogsBackup;

  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        dogsBackup: action.payload,
      };
    case "GET_TEMPS":
      return {
        ...state,
        temps: [...state.temps, ...action.payload],
      };
    case "FILTER_TEMP":
      const filteredTempApi =
        action.payload === "All"
          ? allDogs
          : allDogs.filter(
              (dog) =>
                dog.temperament && dog.temperament.includes(action.payload)
            );
      const filteredTempDB = allDogs.filter(
        (dog) => dog.tempsString && dog.tempsString.includes(action.payload)
      );
      const filteredTemp = filteredTempApi.concat(filteredTempDB);
      return {
        ...state,
        dogs: filteredTemp,
      };
    case "FILTER_ALPH":
      const result =
        action.payload === "az"
          ? state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return 1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return -1;
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name.toLowerCase() > b.name.toLowerCase()) return -1;
              if (b.name.toLowerCase() > a.name.toLowerCase()) return 1;
              return 0;
            });
      return {
        ...state,
        dogs: result,
      };

    case "FILTER_WEIGHT":
      //Obtengo el peso minimo
      let resultMinWeight = [];
      const splitWeight = state.dogs.map((dog) =>
        typeof dog.weight === "string" ? dog.weight.split("-") : dog.weight
      );

      splitWeight.forEach((weight) =>
        resultMinWeight.push(parseInt(weight[0]))
      );

      //Agrego el peso minimo al objeto de dogs
      state.dogs.forEach(
        (dog, index) => (dog.min_weight = resultMinWeight[index])
      );

      const resultWeight =
        action.payload === "menor"
          ? state.dogs.sort(function (a, b) {
              return a.min_weight - b.min_weight;
            })
          : state.dogs.sort(function (a, b) {
              return b.min_weight - a.min_weight;
            });
      return {
        ...state,
        dogs: resultWeight,
      };
    case "FILTER_CREATED":
      const filteredCreated =
        action.payload === "todos"
          ? allDogs
          : allDogs.filter((dog) => dog.hasOwnProperty("createdInDB"));

      return {
        ...state,
        dogs: filteredCreated,
      };

    case "GET_DOGS_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "POST_NEW_DOG":
      return {
        ...state,
      };

    case "GET_DOG_DETAIL":
      return {
        ...state,
        dogDetail: action.payload,
      };
    default:
      return { ...state };
  }
}

export default rootReducer;
