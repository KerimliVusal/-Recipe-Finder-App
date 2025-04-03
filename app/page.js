'use client';

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation"; 

const SearchPage = () => {
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");
  const [maxTime, setMaxTime] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);

  const router = useRouter();  // Use the useRouter hook to get the router object

  // Handle input changes
  const handleQueryChange = (e) => {
    setQuery(e.target.value);
  };

  const handleCuisineChange = (e) => {
    setCuisine(e.target.value);
  };

  const handleMaxTimeChange = (e) => {
    setMaxTime(e.target.value);
  };

  const checkFormValidity = () => {
    if (query || cuisine || maxTime) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  };

  const handleNextClick = () => {
    const params = new URLSearchParams();

    if (query) params.append("query", query);
    if (cuisine) params.append("cuisine", cuisine);
    if (maxTime) params.append("maxReadyTime", maxTime);

    router.push(`/Recipes?${params.toString()}`);
  };

  useEffect(() => {
    checkFormValidity();
  }, [query, cuisine, maxTime]);

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h1 className="text-4xl mb-6 font-bold">Recipe Finder</h1>

      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <form>
          <div className="mb-4">
            <label htmlFor="query" className="block text-lg mb-2">
              Recipe Query:
            </label>
            <input
              id="query"
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder="e.g. pasta"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="cuisine" className="block text-lg mb-2">
              Cuisine:
            </label>
            <select
              id="cuisine"
              value={cuisine}
              onChange={handleCuisineChange}
              className="w-full p-2 border rounded-md"
            >
              <option value="">Select a cuisine</option>
              <option value="Italian">Italian</option>
              <option value="Mexican">Mexican</option>
              <option value="Chinese">Chinese</option>
            </select>
          </div>

          <div className="mb-4">
            <label htmlFor="maxTime" className="block text-lg mb-2">
              Max Preparation Time (minutes):
            </label>
            <input
              id="maxTime"
              type="number"
              value={maxTime}
              onChange={handleMaxTimeChange}
              placeholder="e.g. 30"
              className="w-full p-2 border rounded-md"
            />
          </div>

          <button
            type="button"
            onClick={handleNextClick}
            className={`w-full py-2 bg-blue-500 text-white rounded-md ${
              !isFormValid ? "opacity-50 cursor-not-allowed" : "hover:bg-blue-600"
            }`}
            disabled={!isFormValid}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
};

export default SearchPage;