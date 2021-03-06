import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Links } from "./Links";

export const Search = () => {
  const [text, setText] = useState("");
  const { setSearchTerm, setResults } = useResultContext();
  const [debouncedValue] = useDebounce(text, 300);
    

  useEffect(() => {
    if (debouncedValue) setSearchTerm(debouncedValue);
  }, [debouncedValue]);

  return (
    <div className="relative sm:ml-48 md:ml-72 sm:-mt-10 mt-3">
      <input
        type="text"
        value={text}
        placeholder="Search inder of type URL"
        autoFocus
        className="sm:w-96 w-80 h-10 dark:bg-gray-200 rounded-full shadow-sm outline-none p-6 text-black hover:shadow-lg"
        onChange={(e) => setText(e.target.value)}
      />
      {!text !== "" && (
        <button
          type="button"
          className="absolute align-middle top-1.5 right-4 text-xl text-gray-500"
          onClick={() => { setText(''); setResults([]); setSearchTerm('') }}
        >
          x
        </button>
      )}
      <Links />
    </div>
  );
};
