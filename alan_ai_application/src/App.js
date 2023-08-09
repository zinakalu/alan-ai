import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import alanBtn from "@alan-ai/alan-sdk-web";
import alanTuring from "./imageFolder/alan-turing-rapp-art.jpg";
import "./index.css";
import "./index.scss";

const alanKey =
  "2c0ab51777316753ef8cf83bde8e67772e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const location1 = useLocation();
  // const [userDetails, setUserDetails] = useState({
  //   username: location1.state?.username || "User",
  //   email: location1.state?.email,
  // });
  const username = location1.state?.username || "User";
  const [questionsList, setQuestionsList] = useState([]);
  const [theme, setTheme] = useState("theme2");
  const [location, setLocation] = useState(null);
  const [news, setNews] = useState([]);
  const [yelpBusiness, setYelpBusiness] = useState([]);
  const [generalQuestions, setGeneralQuestions] = useState(null);
  const [weather, setWeather] = useState(null);
  const [song, setSong] = useState("");
  const [country, setCountry] = useState([]);
  const [translatedText, setTranslatedText] = useState("");
  const alanInstance = useRef(null);
  const navigate = useNavigate();

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
    console.log(" Received commandData", commandData);
    setQuestionsList((prevQuestions) => [
      ...prevQuestions,
      commandData.command,
    ]);
    console.log(commandData.command);

    // saveQuestionToBackend(commandData.command);

    switch (commandData.command) {
      case "getLocation":
        handleGetLocation();
        break;

      case "getNews":
        handleGetNews(commandData.sources);
        break;

      case "getYelpBusiness":
        handleGetYelpBusiness(commandData.searchType, commandData.location);
        break;

      // case "getGeneralQuestions":
      //   handleGetGeneralQuestions(commandData.question);
      //   break;

      case "getWeather":
        handleWeather(commandData.city);
        break;

      case "playSong":
        handleSong(commandData.song);
        break;

      case "openTab":
        handleOpenTab(commandData.url);
        break;

      case "getTime":
        handleTime(commandData.time);
        break;

      case "getTranslation":
        handleTranslation(commandData.text, commandData.target);
        break;

      // case "sendQuestions":
      //   console.log(questionsList, "??????");
      //   if (commandData.email === "default") {
      //     sendQuestionsByEmail(userDetails.email, questionsList);
      //   } else {
      //     sendQuestionsByEmail(commandData.email, questionsList);
      //   }
      //   console.log(questionsList);
      //   break;

      default:
        console.log("Default");
    }
  }

  // function saveQuestionToBackend(question) {
  //   console.log("😭🤞🏾", question);
  //   fetch("http://localhost:5555/save-question", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       question: question,
  //       username: userDetails.username,
  //       email: userDetails.email,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log(data.message);
  //     })
  //     .catch((error) => {
  //       console.error("Error saving question:", error);
  //     });
  // }

  function handleTranslation(text, target) {
    console.log("Translating text:", text, "to language:", target);
    if (target === "French") {
      target = "fr";
    } else if (target === "Spanish") {
      target = "es";
    } else if (target === "Igbo") {
      target = "ig";
    } else {
      console.log(`Unsupported : ${target}`);
      return;
    }
    console.log(target);
    fetch("http://localhost:5555/translate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: text, target: target }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("🥰", data);
        setTranslatedText(data.translatedText);
        console.log("🥰", data.translatedText);
      })
      .catch((error) => console.error("Error:", error));
  }

  function handleLogout() {
    navigate("/login");
  }

  // function fetchUserQuestions() {
  //   const userEmail = userDetails.email;

  //   fetch(`http://localhost:5555/get-questions?email=${userEmail}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       if (data.questions) {
  //         console.log("Questions asked by John:", data.questions);
  //       } else if (data.error) {
  //         console.error(data.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error fetching questions:", error);
  //     });
  // }

  // function sendQuestionsByEmail(email, questionsList) {
  //   console.log("LJAHSRGJQGS");
  //   fetch("http://localhost:5555/send-email", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //     body: JSON.stringify({
  //       email: email,
  //       questions: questionsList,
  //     }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       if (data.message) {
  //         alert(data.message);
  //       } else if (data.error) {
  //         alert(data.error);
  //       }
  //     })
  //     .catch((error) => {
  //       console.error("Error:", error);
  //     });
  //   console.log("❤️😓", email, questionsList);
  // }

  function handleTime() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();

    const formattedTime = formatTime(`${hours}:${minutes}`);
    alanInstance.current.playText(`The time is ${formattedTime}`);
  }

  function formatTime(time) {
    let [hours, minutes] = time.split(":");

    hours = parseInt(hours);
    minutes = parseInt(minutes);

    let period = "AM";
    if (hours >= 12) {
      period = "PM";
    }

    if (hours > 12) {
      hours -= 12;
    } else if (hours === 0) {
      hours = 12;
    }
    hours = hours < 10 ? `0${hours}` : hours;
    console.log("line 103", hours);
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    return `${hours} ${minutes} ${period}`;
  }

  function handleOpenTab(url) {
    console.log("Received URL: ", url);
    if (!url.includes(".")) {
      const TLDs = [".com", ".org", ".net", ".edu", ".gov"];
      for (const TLD of TLDs) {
        url = url + TLD;
        break;
      }
    }

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

  function handleGetNews(sources) {
    fetch(`http://localhost:5555/get-news?sources=${sources}`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🤷🏾‍♀️🤷🏾‍♀️", data);
        setNews(data.articles);
        console.log(data.articles);
        if (Array.isArray(data.articles)) {
          alanInstance.current.playText(`Okay, these are the news headlines`);
          data.articles.forEach((article) => {
            console.log(article.name);
            alanInstance.current.playText(article.title);
          });
        } else {
          const infoType = data.query.split(" ")[0];
          console.log("🧐", infoType);
          let responseText;
          switch (infoType) {
            case "currency":
              responseText = `The currency of ${
                data.result.name
              } is ${data.result.currencies.join(",")}`;
              break;
            case "language":
              responseText = `The language of ${
                data.result.name
              } is ${data.result.languages.join(",")}`;
              break;
            case "population":
              responseText = `The population of ${data.result.name} is ${data.result.population}`;
              break;
            case "capital":
              responseText = `The capital of ${data.result.name} is ${data.result.capital}`;
              break;
            default:
              responseText = `I'm sorry, I don't have the information you're asking for.`;
          }
          alanInstance.current.playText(responseText);
        }

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
        alanInstance.current.playText(`Okay, here they are`);
        data.businesses.forEach((biz) => {
          console.log(biz.name);
          alanInstance.current.playText(biz.name);
        });
      });
  }

  // function handleGetGeneralQuestions(question) {
  //   fetch(`http://localhost:5555/ask-gpt3?question=${question}`)
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log(data);
  //       setGeneralQuestions(data.response);

  //       alanInstance.current.playText({
  //         command: `${data}`,
  //       });
  //     });
  // }

  function handleWeather(city) {
    console.log(`Are you being invoked?`);
    fetch(`http://localhost:5555/get-weather?city=${city}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setWeather(data.weather_info);
        console.log(data.weather_info);

        alanInstance.current.playText(
          `Let me get that for you. It's ${data.weather_info}`
        );
      });
  }

  function handleSong(song) {
    console.log("I heard this song: ", song);
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
        window.open(`https://youtube.com/watch?v=${data.video_id}`, "_blank");
      });
  }

  return (
    <div className={`App ${theme}`}>
      <button className="name-btn" onClick={toggleTheme}>
        Hello {username}!
      </button>
      <div className="avatar">
        <img src={alanTuring} alt="Alan Turing" />
      </div>
      <div className="content"></div>
      <div id="stars"></div>
      <div id="stars2"></div>
      <div id="stars3"></div>
      <button className="logout" onClick={handleLogout}>
        Log Out
      </button>
      {/* <button onClick={fetchUserQuestions}>Fetch My Questions</button> */}
    </div>
  );
}

export default App;
