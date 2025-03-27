import { useState, forwardRef, useImperativeHandle } from "react";

const Togglable = forwardRef((props, refs) => {
  const [visible, setVisible] = useState();

  const hideWhenVisible = { display: visible ? "none" : "" };
  const showWhenVisible = { display: visible ? "" : "none" };

  const toggleVisibility = () => {
    setVisible(!visible);
  };

  useImperativeHandle(refs, () => {
    return {
      toggleVisibility,
    };
  });

  return (
    <>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div id="hidden-form-container" style={showWhenVisible}>        
        {props.children}    
        <button id="btn-cancel" onClick={toggleVisibility}>
          Cancel
        </button>    
      </div>
    </>
  );
});

Togglable.displayName = "Togglable";

export default Togglable;
