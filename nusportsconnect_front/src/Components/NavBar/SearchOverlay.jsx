import React, { useState } from "react";
import SearchOverlayUsernames from "./SearchOverlayUsernames";
import SearchOverlayFLNames from "./SearchOverlayFLNames";
import "./searchOverlayStyles.css";

function SearchResult({ open, closeOverlay, searchInput, allSearches }) {
  const [view, setView] = useState("Usernames");

  function handleClick(viewState) {
    setView(viewState);
  }

  if (!open) {
    return null;
  }
  function handleClose() {
    setView("Usernames");
    closeOverlay();
  }

  const filteredUsernames = allSearches.filter((name) =>
    name.username.startsWith(searchInput)
  );

  const filteredFLNames = allSearches.filter((name) => {
    let flName = name.fName + name.lName;
    flName = flName.toLowerCase();
    return flName.startsWith(searchInput);
  });

  return (
    <div className="search-overlay">
      <div className="search-modal">
        <button className="close-search-overlay-btn" onClick={handleClose}>
          x
        </button>
        <h2>Search results: {view}</h2>
        <div className="search-overlay-list">
          {(() => {
            switch (view) {
              case "Usernames":
                return (
                  <SearchOverlayUsernames
                    filteredUsernames={filteredUsernames}
                    handleClick={handleClick}
                  />
                );
              case "Names":
                return (
                  <SearchOverlayFLNames
                    filteredFLNames={filteredFLNames}
                    handleClick={handleClick}
                  />
                );
              default:
                return null;
            }
          })()}
        </div>
      </div>
    </div>
  );
}

export default SearchResult;
