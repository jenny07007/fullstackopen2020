import React from "react";
import PropTypes from "prop-types";

const Notification = ({ type, message }) => {
  if (!message) return;
  return (
    <div className={`${type.slice(0, -1).toLowerCase()} message`}>
      {type} {message}
    </div>
  );
};

Notification.propTypes = {
  type: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired
};

export default Notification;
