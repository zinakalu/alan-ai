import React, { useState, useEffect, useRef } from "react";
import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "2c0ab51777316753ef8cf83bde8e67772e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [location, setLocation] = useState(null);
  const [news, setNews] = useState(null);
  const alanInstance = useRef(null);

  useEffect(() => {
    alanInstance.current = alanBtn({
      key: alanKey,
      onCommand: handleCommand,
    });
  }, []);

  function handleCommand(commandData) {
    switch (commandData.command) {
      case "getLocation":
        handleGetLocation();
        break;

      case "getNews":
        handleGetNews();
        break;

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

  function handleGetNews() {
    fetch("http://localhost:5555/get-news")
      .then((res) => res.json())
      .then((data) => {
        setNews(data.news);
        alanInstance.current.playText({
          command: `${data.news_data}`,
        });
      });
  }

  // useEffect(() => {
  //   alanInstance.current = alanBtn({
  //     key: alanKey,
  //     onCommand: (commandData) => {
  //       console.log("Before api call");
  //       if (commandData.command === "getLocation") {
  //         console.log("Received getLocation command");
  //         fetch("http://localhost:5555/get-location")
  //           .then((res) => res.json())
  //           .then((data) => {
  //             setLocation(data.location);
  //             alanInstance.current.playText({
  //               command: `Your current location is ${data.current_location}`,
  //             });
  //           });
  //         console.log("after api call");
  //       }
  //     },
  //   });
  // }, []);

  return (
    <div>
      <h1>Alan AI News Application</h1>
      <p>Your current location: {location}</p>
      {news && <p>Your news: {news}</p>}
    </div>
  );
}

export default App;

//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
