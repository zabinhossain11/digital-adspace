import "./singlePage.scss";
import Slider from "../../components/slider/Slider";
import Map from "../../components/map/Map";
import { useNavigate, useLoaderData } from "react-router-dom";
import DOMPurify from "dompurify";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";
import apiRequest from "../../lib/apiRequest";

function SinglePage() {
  const rawPost = useLoaderData();
  const [post, setPost] = useState(null);
  const [saved, setSaved] = useState(false);
  const { currentUser } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (rawPost) {
      setPost(rawPost);
      setSaved(rawPost.isSaved);
    }
  }, [rawPost]);

  const handleSave = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }

    setSaved((prev) => !prev);
    try {
      await apiRequest.post("/users/save", { postId: post.id });
    } catch (err) {
      console.log(err);
      setSaved((prev) => !prev);
    }
  };
  const handleSendMessage = async () => {
    if (!currentUser) {
      navigate("/login");
      return;
    }
  
    try {
      const res = await apiRequest.post("/chats", { receiverId: post.user.id });
      navigate(`/profile?chatId=${res.data.id}`); // Redirect to profile chat section
    } catch (err) {
      console.log("Failed to initiate chat:", err);
    }
  };
  if (!post) {
    return <p>Loading ad details...</p>;
  }

  return (
    <div className="singlePage">
      <div className="details">
        <div className="wrapper">
          <Slider images={post.images} />
          <div className="info">
            <div className="top">
              <div className="post">
                <h1>{post.title}</h1>
                <div className="address">
                  <img src="/pin.png" alt="Location" />
                  <span>{post.address}</span>
                </div>
                <div className="price">৳ {post.price} / hour</div>
              </div>
              <div className="user">
                <img src={post.user.avatar} alt="User Avatar" />
                <span>{post.user.username}</span>
              </div>
            </div>
            <div
              className="bottom"
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(post.postDetail.desc),
              }}
            ></div>
          </div>
        </div>
      </div>

      <div className="features">
        <div className="wrapper">
          <p className="title">Ad Details</p>
          <div className="listVertical">
            <div className="feature">
              <img src="/type.png" alt="Ad Type" />
              <div className="featureText">
                <span>Ad Type</span>
                <p>{post.adType.replace("_", " ")}</p>
              </div>
            </div>
            <div className="feature">
              <img src="/foot-traffic.png" alt="Foot Traffic" />
              <div className="featureText">
                <span>Foot Traffic</span>
                <p>{post.footTraffic} visitors/day</p>
              </div>
            </div>
            <div className="feature">
              <img src="/star.png" alt="Rating" />
              <div className="featureText">
                <span>Rating</span>
                <p>{post.rating} ⭐</p>
              </div>
            </div>
          </div>

          <p className="title">Nearby Places</p>
          <div className="listHorizontal">
            <div className="feature">
              <img src="/school.png" alt="Nearby School" />
              <div className="featureText">
                <span>School</span>
                <p>
                  {post.postDetail.school > 999
                    ? (post.postDetail.school / 1000).toFixed(1) + " km"
                    : post.postDetail.school + " m"}{" "}
                  away
                </p>
              </div>
            </div>
            <div className="feature">
              <img src="/bus.png" alt="Nearby Bus Stop" />
              <div className="featureText">
                <span>Bus Stop</span>
                <p>{post.postDetail.busStop} m away</p>
              </div>
            </div>
            <div className="feature">
              <img src="/restaurant.png" alt="Nearby Restaurant" />
              <div className="featureText">
                <span>Restaurant</span>
                <p>{post.postDetail.restaurant} m away</p>
              </div>
            </div>
          </div>

          <p className="title">Location</p>
          <div className="mapContainer">
            <Map items={[post]} />
          </div>
          <div className="buttons">
    <button onClick={handleSendMessage}>
      <img src="/chat.png" alt="Chat" />
      Send a Message
    </button>
            <button
              onClick={handleSave}
              style={{ backgroundColor: saved ? "#fece51" : "white" }}
            >
              <img src="/save.png" alt="Save" />
              {saved ? "Ad Saved" : "Save this Ad"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SinglePage;
