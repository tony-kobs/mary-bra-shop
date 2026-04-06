import React, { useEffect, useRef, useState } from "react";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function HeaderSearch({ onSearchSubmit }) {
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);

  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isSearchActive) {
      searchInputRef.current?.focus();
    }
  }, [isSearchActive]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setIsSearchActive(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleToggleSearch = () => {
    setIsSearchActive((prev) => !prev);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    onSearchSubmit?.(searchQuery);

    setSearchQuery("");
    setIsSearchActive(false);
  };

  return (
    <div
      className={`nav-item nav-item-search ${isSearchActive ? "search-active" : ""}`}
      ref={searchRef}
    >
      <button
        type="button"
        className="nav-links search-toggle"
        onClick={handleToggleSearch}
        aria-label="Відкрити пошук"
      >
        <FaMagnifyingGlass className="nav-icons" />
      </button>

      <form className="search-field" onSubmit={handleSubmit}>
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
