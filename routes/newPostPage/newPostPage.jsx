import { useState } from "react";
import "./newPostPage.scss";
import apiRequest from "../../lib/apiRequest";
import UploadWidget from "../../components/uploadWidget/UploadWidget";
import { useNavigate } from "react-router-dom";

function NewPostPage() {
  const [desc, setDesc] = useState("");
  const [images, setImages] = useState([]);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const inputs = Object.fromEntries(formData);

    try {
      const res = await apiRequest.post("/posts", {
        postData: {
          title: inputs.title,
          price: parseInt(inputs.price),
          address: inputs.address,
          city: inputs.city,
          adType: inputs.adType,
          footTraffic: parseInt(inputs.footTraffic),
          rating: parseFloat(inputs.rating),
          latitude: inputs.latitude,
          longitude: inputs.longitude,
          images: images,
        },
        postDetail: {
          desc: desc, // Updated from state
          adType: inputs.adType,
          rating: parseFloat(inputs.rating),
          footTraffic: parseInt(inputs.footTraffic),
          school: parseInt(inputs.school),
          busStop: parseInt(inputs.busStop),
          restaurant: parseInt(inputs.restaurant),
        },
      });
      navigate("/" + res.data.id);
    } catch (err) {
      console.log(err);
      setError("Failed to create post");
    }
  };

  return (
    <div className="newPostPage">
      <div className="formContainer">
        <h1>Add New Ad Space</h1>
        <div className="wrapper">
          <form onSubmit={handleSubmit}>
            <div className="item">
              <label htmlFor="title">Title</label>
              <input id="title" name="title" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="price">Price (per hour)</label>
              <input id="price" name="price" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="address">Address</label>
              <input id="address" name="address" type="text" required />
            </div>
            <div className="item description">
              <label htmlFor="desc">Description</label>
              <textarea 
                id="desc" 
                name="desc" 
                rows="4" 
                value={desc} 
                onChange={(e) => setDesc(e.target.value)} 
                required
              />
            </div>
            <div className="item">
              <label htmlFor="city">City</label>
              <input id="city" name="city" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="adType">Ad Type</label>
              <select name="adType" required>
                <option value="billboard">Billboard</option>
                <option value="digital_screen">Digital Screen</option>
                <option value="shop_window">Shop Window</option>
                <option value="street_banner">Street Banner</option>
              </select>
            </div>
            <div className="item">
              <label htmlFor="footTraffic">Foot Traffic (visitors/day)</label>
              <input id="footTraffic" name="footTraffic" type="number" required />
            </div>
            <div className="item">
              <label htmlFor="rating">Rating (1-5)</label>
              <input id="rating" name="rating" type="number" step="0.1" min="1" max="5" required />
            </div>
            <div className="item">
              <label htmlFor="latitude">Latitude</label>
              <input id="latitude" name="latitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="longitude">Longitude</label>
              <input id="longitude" name="longitude" type="text" required />
            </div>
            <div className="item">
              <label htmlFor="school">Distance to School (m)</label>
              <input id="school" name="school" type="number" />
            </div>
            <div className="item">
              <label htmlFor="busStop">Distance to Bus Stop (m)</label>
              <input id="busStop" name="busStop" type="number" />
            </div>
            <div className="item">
              <label htmlFor="restaurant">Distance to Restaurant (m)</label>
              <input id="restaurant" name="restaurant" type="number" />
            </div>
            <button className="sendButton">Add</button>
            {error && <span>{error}</span>}
          </form>
        </div>
      </div>
      <div className="sideContainer">
        {images.map((image, index) => (
          <img src={image} key={index} alt="Ad Space" />
        ))}
        <UploadWidget
          uwConfig={{
            multiple: true,
            cloudName: "djpexa9bz",
            uploadPreset: "adecoproject",
            folder: "posts",
          }}
          setState={setImages}
        />
      </div>
    </div>
  );
}

export default NewPostPage;
