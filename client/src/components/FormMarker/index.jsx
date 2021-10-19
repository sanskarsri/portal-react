import React from "react";

// FormMarkerInput = {
//     valid: boolean,
//     value: String,
//     num: Number,
//     text: string
// }

const FormMarker = props => {
  let theme = "unfilled";

  if (props.value !== "" && props.valid) theme = "accepted";
  else if (props.value !== "" && !props.valid) theme = "failed";

  return (
    <div className={`formMarker__item formMarker__theme--${theme}`}>
      <div className="formMarker__item__num">{props.num}</div>

      <div className="formMarker__item__text">{props.text}</div>
    </div>
  );
};

export default FormMarker;
