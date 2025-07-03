import Chat from "../../components/chat/Chat";
import List from "../../components/list/List";
import "./profilePage.scss";
import apiRequest from "../../lib/apiRequest";
import { Await, Link, useLoaderData, useNavigate ,useSearchParams} from "react-router-dom";
import { Suspense, useContext,useState,useEffect } from "react";
import { AuthContext } from "../../context/AuthContext";

function ProfilePage() {
  const data = useLoaderData();
  const { updateUser, currentUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [chat, setChat] = useState(null);
const [searchParams] = useSearchParams();
const chatId = searchParams.get("chatId");


useEffect(() => {
  if (chatId) {
    handleOpenChat(chatId);
  }
}, [chatId]);

const handleOpenChat = async (id) => {
  try {
    const res = await apiRequest("/chats/" + id);
    setChat(res.data);
  } catch (err) {
    console.log("Failed to open chat:", err);
  }
};
  const handleLogout = async () => {
    try {
      await apiRequest.post("/auth/logout");
      updateUser(null);
      navigate("/");
    } catch (err) {
      console.log("Logout failed:", err);
    }
  };

  return (
    <div className="profilePage">
      <div className="details">
        <div className="wrapper">
          <div className="title">
            <h1>User Information</h1>
            <Link to="/profile/update">
              <button>Update Profile</button>
            </Link>
          </div>
          <div className="info">
            <span>
              Avatar:
              <img src={currentUser.avatar || "noavatar.jpg"} alt="User Avatar" />
            </span>
            <span>Username: <b>{currentUser.username}</b></span>
            <span>E-mail: <b>{currentUser.email}</b></span>
            <button onClick={handleLogout} className="logout-btn">
              Logout
            </button>
          </div>

          <div className="title">
            <h1>My List</h1>
            <Link to="/add">
              <button>Create New Post</button>
            </Link>
          </div>

          <Suspense fallback={<p>Loading posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => postResponse.data.userPosts?.length ? (
                <List posts={postResponse.data.userPosts} />
              ) : (
                <p>No posts available.</p>
              )}
            </Await>
          </Suspense>

          <div className="title">
            <h1>Saved List</h1>
          </div>

          <Suspense fallback={<p>Loading saved posts...</p>}>
            <Await resolve={data.postResponse} errorElement={<p>Error loading posts!</p>}>
              {(postResponse) => postResponse.data.savedPosts?.length ? (
                <List posts={postResponse.data.savedPosts} />
              ) : (
                <p>No saved posts available.</p>
              )}
            </Await>
          </Suspense>
        </div>
      </div>

      <div className="chatContainer">
        <div className="wrapper">
          <Suspense fallback={<p>Loading chats...</p>}>
            <Await resolve={data.chatResponse} errorElement={<p>Error loading chats!</p>}>
              {(chatResponse) => chatResponse.data?.length ? (
               <Chat chats={chatResponse.data} openChat={chat} />

              ) : (
                <p>No chats available.</p>
              )}
            </Await>
          </Suspense>
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
