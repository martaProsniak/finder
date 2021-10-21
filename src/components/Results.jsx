import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ReactPlayer from "react-player";

import { useResultContext } from "../contexts/ResultContextProvider";
import { Loading } from "./Loading";
import { LINKS } from "../constants";

export const Results = () => {
  const { results, isLoading, getResults, searchTerm } = useResultContext();
  const location = useLocation();

  useEffect(() => {
    if (searchTerm) {
      if (location.pathname === LINKS.videos) {
        getResults(`/search/q=${searchTerm} videos&num=10`);
      } else {
        getResults(`${location.pathname}/q=${searchTerm}&lr=lang_en&num=20`);
      }
    }
  }, [searchTerm, location.pathname]);

  if (isLoading) return <Loading />;

  switch (location.pathname) {
    case LINKS.search:
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56">
          {results?.map(({ link, title, description }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a href={link} target="_blank" rel="noreferrer">
                <p className="text-sm">
                  {link?.length > 30 ? link.substring(0, 30) : link}
                </p>
                <p className="text-lg hover:underline dark:text-blue-300 text-blue-700">
                  {title}
                </p>
                <p className="text-sm mt-1 md:mt-2 dark:text-blue-200 text-blue-800">
                  {description?.length > 240
                    ? description.substring(0, 240)
                    : description}
                </p>
              </a>
            </div>
          ))}
        </div>
      );
    case LINKS.images:
      return (
        <div className="flex flex-wrap justify-center items-center">
          {results?.map(({ image, link: { href, title } }, index) => (
            <a
              href={href}
              target="_blank"
              key={index}
              rel="noreferrer"
              className="sm:p-3 p-5"
            >
              <img src={image?.src} alt={title} loading="lazy" />
              <p className="sm:w-36 w-36 break-words text-sm mt-2">{title}</p>
            </a>
          ))}
        </div>
      );
    case LINKS.news:
      return (
        <div className="flex flex-wrap justify-between space-y-6 sm:px-56 items-center">
          {results?.map(({ links, source, title }, index) => (
            <div key={index} className="md:w-2/5 w-full">
              <a
                href={links?.[0].href}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                <p className="text-lg dark:text-blue-300 text-blue-700">
                  {title}
                </p>
              </a>
              <div className="flex gap-4">
                <a
                  href={source?.href}
                  className="hover:underline hover:text-blue-400"
                >
                  {source?.href}
                </a>
              </div>
            </div>
          ))}
        </div>
      );
    case LINKS.videos:
      return (
        <div className="flex flex-wrap">
          {results?.map((video, index) => (
            <div key={index} className="p-2">
              <ReactPlayer
                url={video.additional_links?.[0].href}
                controls
                width="355px"
                height="200px"
              />
            </div>
          ))}
        </div>
      );
    default:
      return "error";
  }
};
