import React from "react";


const Layout = props => {
  return (
    <div className="platformLayout">

      <div className="platformLayout__body">{props.children}</div>
    </div>
  );
};

export default Layout;