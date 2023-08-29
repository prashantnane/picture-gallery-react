import React, { useEffect, useRef, useState } from "react";
import axios from "axios";

const apiUrl = "https://api.unsplash.com/search/photos";
const imagePerPage = 20;

const Home = () => {
  const search = useRef(null);
  const [pictures, setPictures] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        `${apiUrl}?query=${search.current.value}&page=1&per_page=${imagePerPage}&client_id=${process.env.REACT_APP_ACCESS_KEY}`
      );
      setPictures(data.results);
      // console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    fetchData();
  };

  return (
    <>
      <h1 className="header">Picture Gallery</h1>
      <div className="container">
        <form onSubmit={handleSearchForm}>
          <input
            type="search"
            id="search"
            placeholder="Search image by category like food or landscape..."
            ref={search}
          />
          <br />
          <button>Search</button>
        </form>
      </div>
      <h1 className="searchConvert">Results on: {search.current.value}</h1>
      <div className="grid">
        {pictures.map((picture) => (
          <img
            key={picture.id}
            src={picture.urls.small}
            alt={picture.alt_description}
            className="picture"
          />
        ))}
      </div>
      <footer>Created by Prashant</footer>
    </>
  );
};

export default Home;
