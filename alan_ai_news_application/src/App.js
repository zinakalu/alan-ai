import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "2c0ab51777316753ef8cf83bde8e67772e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [location, setLocation] = useState(null);
  const [news, setNews] = useState([]);
  const [yelpBusiness, setYelpBusiness] = useState([]);
  const [generalQuestions, setGeneralQuestions] = useState(null);
  const [weather, setWeather] = useState(null);
  const [song, setSong] = useState("");
  const alanInstance = useRef(null);

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
        handleGetNews(commandData.source);
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
      // case "playSong":
      //   setSong(commandData.song);
      //   break;

      default:
        console.log("Default");
    }
  }

  function handleGetLocation() {
    fetch("http://localhost:5555/get-location")
      .then((res) => res.json())
      .then((data) => {
        setLocation(data.location);
        alanInstance.current.playText({
          command: `Your current location is ${data.current_location}`,
        });
      });
  }

  function handleGetNews(source) {
    fetch(`http://localhost:5555/get-news?source=${source}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Render "news" to Component
        setNews(data.articles);

        alanInstance.current.playText({
          command: `${data.news_data}`,
        });
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

        alanInstance.current.playText({
          command: `${data}`,
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

        alanInstance.current.playText({
          command: `${data.weather_info}`,
        });
      });
  }

  function handleSong(song) {
    fetch(`http://localhost:5555/songs?q=${song}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setSong(data.video_id);
        console.log(data.video_id);
        alanInstance.current.playText({
          command: `${data.video_id}`,
        });
      });
  }

  const Business = ({ name }) => {
    return <h3>{name}</h3>;
  };

  const BusinessList = () => {
    return yelpBusiness.map((business) => {
      return <Business name={business.name} />;
    });
  };

  const Article = ({ article }) => {
    return <h1>{article.title}</h1>;
  };

  const ArticlesList = () =>
    news.map((article) => {
      return <Article article={article} />;
    });

  // useEffect(() => {
  //   alanInstance.current = alanBtn({
  //     key: alanKey,
  //     onCommand: (commandData) => {
  //       console.log("Before api call");
  //       if (commandData.command === "getLocation") {
  //         console.log("Received getLocation command");
  //         fetch("http://localhost:5555/get-location")
  //           .then((res) => res.json())
  //           .then(({ current_location }) => {
  //             // "New York, United States"
  //             console.log(current_location);

  //             // Render "current_location" to Component
  //             setLocation(current_location);

  //             alanInstance.current.playText({
  //               command: `Your current location is ${current_location}`,
  //             });
  //           });
  //         console.log("after api call");
  //       }
  //     },
  //   });
  // }, []);

  return (
    <div>
      <h1>AI Application</h1>
      <p>Your current location: {location}</p>
      <p>
        Your news: <ArticlesList />
      </p>

      <p>
        Your Business Search: <BusinessList />
      </p>

      <p>Weather Information: {weather}</p>

      <p>
        To play the song, click{" "}
        <a
          href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
            song
          )}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          here
        </a>
        .
      </p>
    </div>
  );
}

export default App;

//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
