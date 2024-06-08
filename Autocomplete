import { useEffect } from "react";

const SearchUI = () => {
  const [searchText, setSearchText] = useState(""); // controlled to input
  const [searchResults, setSearchResults] = useState([]); // search results from api
  const [isResultsVisible, setIsResultsVisible] = useState(false); // show/hide results
  const [cache, setCache] = useState({}); // cache for search results - Note: Cache will always be object b/v Time complexity is O(1) for object

  useEffect(() => {
    // logic of debouncing
    const s = setTimeout(() => {
      fetchData();
    }, 300);
    return () => clearTimeout(s); // clear the setTimeout - cleanup will run b/w re-renders or unmount
  }, [searchText]);

  const fetchData = async () => {
    // check if search text is already in cache
    if (cache[searchText]) {
      setSearchResults(cache[searchText]);
      return;
    } else {
      try {
        // Google hack - add client=firefox to get JSON response
        // CORS extension in browser is required to fetch data
        const data = await fetch(
          "https://www.google.com/complete/search?client=firefox&q=" +
            searchText
        );
        const json = await data.json();
        setCache((prevCache) => ({ ...prevCache, [searchText]: json[1] })); // update the cache state here
        setSearchResults(json[1]);
      } catch (err) {}
    }
  };

  return (
    <div>
      {/* input and list should have same width */}
      <input
        type="text"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsResultsVisible(true)}
        onBlur={() => setIsResultsVisible(false)}
      />
      {searchResults.length > 1 && isResultsVisible && (
        <ul>
          {/* on hover give back ground color and cursor to pointer */}
          {searchResults.map((result) => (
            <li key={result}>{result}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchUI;
