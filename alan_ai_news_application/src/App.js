import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";
import alanTuring from "./imageFolder/alan-turing-rapp-art.jpg";
import "./index.css";

const alanKey =
  "2c0ab51777316753ef8cf83bde8e67772e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [theme, setTheme] = useState("theme1");
  const [location, setLocation] = useState(null);
  const [news, setNews] = useState([]);
  const [yelpBusiness, setYelpBusiness] = useState([]);
  const [generalQuestions, setGeneralQuestions] = useState(null);
  const [weather, setWeather] = useState(null);
  const [song, setSong] = useState("");
  const alanInstance = useRef(null);

  const toggleTheme = () => {
    setTheme(theme === "theme1" ? "theme2" : "theme1");
  };

  useEffect(() => {
    alanInstance.current = alanBtn({
      key: alanKey,
      onCommand: handleCommand,
    });
  }, []);

  function handleCommand(commandData) {
    console.log(commandData);

    switch (commandData.command) {
      case "getLocation":
        handleGetLocation();
        break;

      case "getNews":
        handleGetNews(commandData.query, commandData.source);
        break;

      case "getYelpBusiness":
        handleGetYelpBusiness(commandData.searchType, commandData.location);
        break;

      case "getGeneralQuestions":
        handleGetGeneralQuestions(commandData.question);
        break;

      case "getWeather":
        handleWeather(commandData.city);
        break;

      case "playSong":
        handleSong(commandData.song);
        break;

      case "openTab":
        handleOpenTab(commandData.url);
        break;

      default:
        console.log("Default");
    }
  }

  function handleOpenTab(url) {
    console.log("Received URL: ", url);
    // Sanitize the raw URL here if needed, e.g., remove any suspicious characters

    // If the user only said the name of the website without ".com", add it
    if (!url.includes(".")) {
      const TLDs = [".com", ".org", ".net", ".edu", ".gov"];
      for (const TLD of TLDs) {
        url = url + TLD;
        break;
      }
    }

    // If the user didn't include "http://" or "https://", add it
    if (!url.startsWith("http://") && !url.startsWith("https://")) {
      url = "http://" + url;
    }

    console.log("Processed URL: ", url);

    window.open(url, "_blank");
  }

  function handleGetLocation() {
    fetch("http://localhost:5555/get-location")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.location);
        alanInstance.current.playText(
          `Your current location is ${data.current_location}`
        );
      });
  }

  //work on getting other news sources to work
  function handleGetNews(query, source) {
    fetch(`http://localhost:5555/get-news?q=${query}&sources=${source}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setNews(data.articles);

        alanInstance.current.playText(`Okay, these are the news headlines`);
        data.articles.forEach((article) => {
          console.log(article.name);
          alanInstance.current.playText(article.title);
        });

        console.log(data.news_data);
      });
  }

  function handleGetYelpBusiness(searchType, location) {
    fetch(
      `http://localhost:5555/search-business?search_type=${searchType}&location=${location}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setYelpBusiness(data.businesses);
        console.log(data.businesses);
        alanInstance.current.playText(`The restaurants are`);
        data.businesses.forEach((biz) => {
          console.log(biz.name);
          alanInstance.current.playText(biz.name);
        });
      });
  }

  function handleGetGeneralQuestions(question) {
    fetch(`http://localhost:5555/ask-gpt3?question=${question}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setGeneralQuestions(data.response);

        alanInstance.current.playText({
          command: `${data}`,
        });
      });
  }

  function handleWeather(city) {
    console.log(`Are you being invoked?`);
    fetch(`http://localhost:5555/get-weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data.weather_info);
        console.log(data.weather_info);

        alanInstance.current.playText(
          `finding the weather for you. ${data.weather_info}`
        );
        // alanInstance.current.playText({
        //   command: `${data.weather_info}`,
        // });
      });
  }

  function handleSong(song) {
    fetch(`http://localhost:5555/song?q=${song}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(song),
    })
      .then((res) => res.json())
      .then((data) => {
        setSong(data.video_id);
        console.log(data.video_id);
        // alanInstance.current.playText({
        //   command: `${data.video_id}`,
        // });
      });
  }

  return (
    <div className={`App ${theme}`}>
      <button onClick={toggleTheme}>Toggle Theme</button>
      <div className="avatar">
        <img src={alanTuring} alt="Alan Turinng" />
      </div>
      <div className="content">{/* <h1>Floating CSS animation</h1> */}</div>
      <div className="star"></div>
    </div>
  );
}

export default App;
