import { useState, useEffect } from "react";
import { Diary, Visibility, Weather } from "./types";
import { createDairy, getAllDiaries } from "./dairyService";

function App() {
  const [date, setDate] = useState("");
  const [visibility, setVisibility] = useState(Visibility.Good);
  const [weather, setWeather] = useState(Weather.Sunny);
  const [comment, setComment] = useState("");
  const [diaries, setDiaries] = useState<Diary[]>([]);

  useEffect(() => {
    getAllDiaries().then((data) => {
      setDiaries(data);
    });
  }, []);

  const diaryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createDairy({ date, visibility, weather, comment }).then((data) => {
      setDiaries(diaries.concat(data));

      setComment("");
    });
    setDiaries([]);
  };

  const handleVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const visibility = Object.values(Visibility).find(
        (g) => g.toString() === value
      );
      if (visibility) {
        setVisibility(visibility);
      }
    }
  };

  const handleWeather = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (typeof event.target.value === "string") {
      const value = event.target.value;
      const weather = Object.values(Weather).find(
        (g) => g.toString() === value
      );
      if (weather) {
        setWeather(weather);
      }
    }
  };

  return (
    <>
      <h2>Add new entry</h2>
      <form onSubmit={diaryCreation}>
        <div>
          date:{" "}
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
          />
        </div>
        <div>
          visibility:
          {Object.values(Visibility).map((option) => (
            <>
              <input
                type="radio"
                name="visibility"
                value={option}
                onChange={handleVisibility}
              />
              <label>{option}</label>
            </>
          ))}
        </div>
        <div>
          weather:
          {Object.values(Weather).map((option) => (
            <>
              <input
                type="radio"
                name="weather"
                value={option}
                onChange={handleWeather}
              />
              <label>{option}</label>
            </>
          ))}
        </div>
        <div>
          comment:{" "}
          <input
            value={comment}
            onChange={(event) => setComment(event.target.value)}
          />
        </div>
        <button type="submit">add</button>
      </form>
      <h2>dairy entries</h2>
      {diaries.map((dairy) => (
        <>
          <h3>{dairy.date}</h3>
          <p> visibility: {dairy.visibility}</p>
          <p> weather: {dairy.weather}</p>
        </>
      ))}
    </>
  );
}

export default App;
