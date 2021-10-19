
import React from "react";

// buttonProps = {
//   color: string,
//   disabled?: boolean,
//   type?: string,
//   onClick?: Function,
//   children: Node
// };

const Button = (props) => {
  const buttonStyle = `Button Button--${props.color} `;
  return (
    <button
      className={buttonStyle}
      disabled={props.disabled}
      onClick={props.onClick}
      type={props.type}
    >
      {props.children}
    </button>
  );
};

Button.defaultProps = {
  color: "brand",
  type: "submit"
};

export default Button;
