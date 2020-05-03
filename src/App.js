import React, { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";
import Recipe from "./components/Recipe";
import { v4 as uuidv4 } from "uuid";
import Alert from "./components/Alert";
const App = () => {
  const [query, setQuery] = useState("");
  const [recipe, setRecipe] = useState([]);
  const [alert, setAlert] = useState("");
  const APP_ID = "859546e1";
  const APP_KEY = "1f71c94bb1e20d6049d5aac3996224c0";
  const url = `https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`;

  const getData = async () => {
    if (query !== "") {
      const { data } = await axios.get(url);
      if(!data.more){
          return setAlert('No food with such name')
      }
      setRecipe(data.hits);
      setAlert('')
      console.log(data);
    }else{
        setAlert('Please fill the form')
    }
  };
  const onSubmit = (e) => {
    e.preventDefault();
    getData();
    setQuery("");
  };
  const onChange = (e) => {
    setQuery(e.target.value);
  };
  return (
    <div className="App">
      <h1>Food Searching App</h1>
      <form className="search-form" onSubmit={onSubmit}>
        {alert !=="" && <Alert alert={alert} />}
        <input
          type="text"
          placeholder="Search Food"
          autoComplete="off"
          onChange={onChange}
          value={query}
        />
        <input type="submit" value="search" />
      </form>

      <div className="recipes">
        {recipe !== [] &&
          recipe.map(recipe => <Recipe key={uuidv4()} recipe={recipe} />)}
      </div>
    </div>
  );
};
export default App;
