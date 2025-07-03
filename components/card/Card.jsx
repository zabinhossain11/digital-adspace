import { Link } from "react-router-dom";
import "./card.scss";

function Card({ item }) {
  return (
    <div className="card">
      <Link to={`/${item?.id}`} className="imageContainer">
        <img src={item?.images?.[0] || "/placeholder.png"} alt={item?.title || "No Title"} />
      </Link>
      <div className="textContainer">
        <h2 className="title">
          <Link to={`/${item?.id}`}>{item?.title || "Untitled Ad"}</Link>
        </h2>
        <p className="address">
          <img src="/pin.png" alt="Location" />
          <span>{item?.address || "Unknown Location"}</span>
        </p>
        <p className="price">৳ {item?.price || "N/A"} / hour</p>
        <div className="bottom">
          <div className="features">
            <div className="feature">
              <img src="/type.png" alt="Ad Type" />
              <span>{item?.adType?.replace("_", " ") || "N/A"}</span>
            </div>
            <div className="feature">
              <img src="/foot-traffic.png" alt="Foot Traffic" />
              <span>{item?.footTraffic ? `${item.footTraffic} visitors/day` : "N/A"}</span>
            </div>
            <div className="feature">
              <img src="/star.png" alt="Rating" />
              <span>{item?.rating ? `${item.rating} ⭐` : "No Rating"}</span>
            </div>
          </div>
          <div className="icons">
            <div className="icon">
              <img src="/save.png" alt="Save" />
            </div>
            <div className="icon">
              <img src="/chat.png" alt="Chat" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;
