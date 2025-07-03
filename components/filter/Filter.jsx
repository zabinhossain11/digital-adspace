import { useState } from "react";
import "./filter.scss";
import { useSearchParams } from "react-router-dom";

function Filter() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [query, setQuery] = useState({
    location: searchParams.get("location") || "",
    adType: searchParams.get("adType") || "",
    minPrice: searchParams.get("minPrice") || "",
    maxPrice: searchParams.get("maxPrice") || "",
    footTraffic: searchParams.get("footTraffic") || "",
    rating: searchParams.get("rating") || "",
  });

  const handleChange = (e) => {
    setQuery({
      ...query,
      [e.target.name]: e.target.value,
    });
  };

  const handleFilter = () => {
    setSearchParams(query);
  };

  return (
    <div className="filter">
      <h1>
        Search results for <b>{searchParams.get("location") || "All Locations"}</b>
      </h1>
      <div className="top">
        <div className="item">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="City or Area"
            onChange={handleChange}
            defaultValue={query.location}
          />
        </div>
      </div>
      <div className="bottom">
        <div className="item">
          <label htmlFor="adType">Ad Type</label>
          <select
            name="adType"
            id="adType"
            onChange={handleChange}
            defaultValue={query.adType}
          >
            <option value="">any</option>
            <option value="billboard">Billboard</option>
            <option value="digital_screen">Digital Screen</option>
            <option value="shop_window">Shop Window</option>
            <option value="street_banner">Street Banner</option>
          </select>
        </div>
        <div className="item">
          <label htmlFor="minPrice">Min Price (per hour)</label>
          <input
            type="number"
            id="minPrice"
            name="minPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.minPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="maxPrice">Max Price (per hour)</label>
          <input
            type="number"
            id="maxPrice"
            name="maxPrice"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.maxPrice}
          />
        </div>
        <div className="item">
          <label htmlFor="footTraffic">Min Foot Traffic (per day)</label>
          <input
            type="number"
            id="footTraffic"
            name="footTraffic"
            placeholder="any"
            onChange={handleChange}
            defaultValue={query.footTraffic}
          />
        </div>
        <div className="item">
          <label htmlFor="rating">Min Rating</label>
          <select
            name="rating"
            id="rating"
            onChange={handleChange}
            defaultValue={query.rating}
          >
            <option value="">any</option>
            <option value="5">5 ⭐</option>
            <option value="4">4+ ⭐</option>
            <option value="3">3+ ⭐</option>
            <option value="2">2+ ⭐</option>
            <option value="1">1+ ⭐</option>
          </select>
        </div>
        <button onClick={handleFilter}>
          <img src="/search.png" alt="Search" />
        </button>
      </div>
    </div>
  );
}

export default Filter;
