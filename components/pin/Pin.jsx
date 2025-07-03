import { Marker, Popup } from "react-leaflet";
import "./pin.scss";
import { Link } from "react-router-dom";

function Pin({ item }) {
  return (
    <Marker position={[item.latitude, item.longitude]}>
      <Popup>
        <div className="popupContainer">
         <img src={item.images[0]} alt="" />
          <div className="textContainer">
            <Link to={`/${item.id}`}>{item.title}</Link>
            <span>Type: {item.type}</span>
            <span>Foot Traffic: {item.footTrafficPerDay} visitors/day</span>
            <span>Rating: {item.rating} ⭐</span>
            <b>৳ {item.pricePerHour} / hour</b>
          </div>
        </div>
      </Popup>
    </Marker>
  );
}

export default Pin;
