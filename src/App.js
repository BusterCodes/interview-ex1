import { useState, useEffect } from "react";
import axios from "axios";
import "./App.css";

function App() {
  // state
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filter, setFilter] = useState("");
  // data fetch useEffect
  useEffect(() => {
    axios("https://jsonplaceholder.typicode.com/albums")
      .then((response) => setData(response.data))
      .catch((error) => {
        console.error("Error!!! -> ", error);
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return "Loading...";
  if (error) return "Failed to load. Error!";

  // instantiate data array

  // filter functions
  // const albumItemsFiltered = data.filter((item) => item.title === filter);
  // console.log(albumItemsFiltered);

  //
  const handleFilter = (e) => {
    setFilter(e.target.value);
    console.log(filter);
  };

  const getHighlightedText = (text, highlight) => {
    // Split on highlight term and include term into parts, ignore case
    const parts = text.split(new RegExp(`(${highlight})`, "gi"));
    return (
      <span>
        {parts.map((part, i) => (
          <span
            key={i}
            style={
              part.toLowerCase() === highlight.toLowerCase()
                ? { backgroundColor: "yellow" }
                : {}
            }
          >
            {part}
          </span>
        ))}
      </span>
    );
  };

  return (
    <div className="App">
      {/* render albums list */}
      <input type="text" onChange={(e) => handleFilter(e)} />

      {data
        .filter((item) => item.title.includes(filter))
        .map((item) => (
          <div key={item.title}>{getHighlightedText(item.title, filter)}</div>
        ))}
    </div>
  );
}

export default App;
