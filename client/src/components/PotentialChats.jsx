import { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import { AuthContext } from "../context/AuthContext";

const PotentialChats = () => {
  const { user } = useContext(AuthContext);
  const { potentialChats, createChat }  = useContext(ChatContext);

  const handleClick = (userId) => {
    try {
      createChat(user._id, userId);
      // add success feedback here
    } catch (error) {
      // add error handling here
      console.error(error);
    }
  };

  return (
    <div className="all-users">
      {potentialChats && potentialChats.map((u, index) => (
        <div className="single-user" key={index} onClick={() => handleClick(u._id)}>
          {u.name}
          <span className="user-online"></span>
        </div>
      ))}
    </div>
  );
};

export default PotentialChats;