import React from "react";
import DefaultAvatar from "../assets/defaultAvatar.jpeg";

function UseAvatar({ avatarUrl }) {
  const handleError = (e) => {
    if (e.target.src !== DefaultAvatar) {
      e.target.src = DefaultAvatar;
    }
  };

  return (
    <img
      src={avatarUrl || DefaultAvatar}
      alt="User avatar"
      className="w-12 h-12 rounded-full object-cover"
      onError={handleError}
    />
  );
}

export default UseAvatar;




