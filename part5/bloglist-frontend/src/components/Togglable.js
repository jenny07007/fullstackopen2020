import React, { useState, useImperativeHandle } from "react";
import PropTypes from "prop-types";
// eslint-disable-next-line react/display-name
const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false);

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => setVisible(!visible);

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    };
  });

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      <div style={hideWhenVisible}>
        <button className="btn newblog-btn" onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <button className="btn cancle-btn" onClick={toggleVisibility}>
          Cancle
        </button>
      </div>
    </div>
  );
});

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
};

export default Togglable;
