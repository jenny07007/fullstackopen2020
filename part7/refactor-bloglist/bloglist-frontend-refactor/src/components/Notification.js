import React from "react";
import { useSelector } from "react-redux";

const Notification = () => {
  const { type, message } = useSelector((state) => state.notification);

  if (!message || !type) return null;
  return (
    <div className={`${type.slice(0, -1).toLowerCase()} message`}>
      {type} {message}
    </div>
  );
};

export default Notification;
