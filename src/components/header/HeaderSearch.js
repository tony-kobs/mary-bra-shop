import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function HeaderSearch({ onSearch, onSearchSubmit }) {
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isSearchActive && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);

    if (onSearch) {
      onSearch(query);
    }
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();

    if (onSearch) {
      onSearch(searchQuery);
    }

    if (onSearchSubmit) {
      onSearchSubmit();
    }

    setSearchQuery("");
  };

  return (
    <div
      className={`nav-item nav-item-search ${isSearchActive ? "search-active" : ""}`}
      ref={searchRef}
    >
      <button
        type="button"
        className="nav-links search-toggle"
        onClick={() => setIsSearchActive((prev) => !prev)}
      >
        <FaMagnifyingGlass className="nav-icons" />
      </button>

      <form className="search-field" onSubmit={handleSearchSubmit}>
        <input
          ref={searchInputRef}
          type="text"
          className="search-input"
          placeholder="Пошук товарів..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </form>
    </div>
  );
}
