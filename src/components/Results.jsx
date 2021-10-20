import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    const results = getResults("/search/q=JavaScript Mastery&num=40");
  }, []);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case "/search":
      return "search";
    case "/images":
      return "images";
    case "/news":
      return "news";
    case "/videos":
      return "videos";
    default:
      return "error";
  }
};
