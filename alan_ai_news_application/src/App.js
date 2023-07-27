import React, { useState, useEffect } from "react";
// import alanBtn from "@alan-ai/alan-sdk-web";

const alanKey =
  "2c01bb80615f6b45ef8cf83bde8e67772e956eca572e1d8b807a3e2338fdd0dc/stage";

function App() {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    if (window.AlanBtn) {
      window.AlanBtn({
        key: alanKey,
        onCommand: (commandData) => {
          if (commandData.command === "getLocation") {
            fetch("http://localhost:5555/get-location")
              .then((res) => res.json())
              .then((data) => {
                setLocation(data.location);
                window
                  .AlanBtn()
                  .playText(`Your current location is ${data.location}`);
              })
              .catch((error) => {
                console.error("Error", error);
                window.AlanBtn().playText("An error occurred");
              });
          }
        },
      });
    }
  }, []);

  return (
    <div>
      <h1>Alan AI News Application</h1>
      <p>Your current location: {location}</p>
    </div>
  );
}

export default App;

//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
