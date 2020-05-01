import React from "react";
import PropTypes from "prop-types";
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

Notification.propTypes = {
  type: PropTypes.string,
  message: PropTypes.string,
};

export default Notification;
