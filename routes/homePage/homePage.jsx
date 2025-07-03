import { useContext } from "react";
import SearchBar from "../../components/searchBar/SearchBar";
import "./homePage.scss";
import { AuthContext } from "../../context/AuthContext"; // ✅ Import AuthContext

function HomePage() {
  const { currentUser } = useContext(AuthContext); // ✅ Get logged-in user

  return (
    <div className="homePage">
      <div className="textContainer">
        <div className="wrapper">
          <h1 className="title">Find the Best Ad Spaces & Boost Your Business</h1>
          <p>
            Advertise your brand in high-traffic venues like cafes, salons, hotels, and retail stores. 
            Easily search, book, and manage ad placements in your preferred locations.
          </p>
          <SearchBar />
          <div className="boxes">
            <div className="box">
              <h1>16+</h1>
              <h2>Years of Experience</h2>
            </div>
            <div className="box">
              <h1>200</h1>
              <h2>Awards Gained</h2>
            </div>
            <div className="box">
              <h1>2000+</h1>
              <h2>Marketers Ready</h2>
            </div>
          </div>
          {currentUser && ( // ✅ Show logged-in user info
            <div className="welcome">
              <h2>Welcome, {currentUser.username}!</h2>
              <p>Your role: {currentUser.role}</p>
            </div>
          )}
        </div>
      </div>
      <div className="imgContainer">
        <img src="/bg0.jpg" alt="Homepage Banner" />
      </div>
    </div>
  );
}

export default HomePage;
