import React from "react";

const NotFoundPage = () => {

  const divStyle = {
    height: "100vh",
    width: "100vh",
  };

  const h1Style = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  };

  return (
    <div style={divStyle}>
      <h1 style={h1Style}>404 Not Found </h1>
      <h1 style={h1Style}>Hello!</h1>
      <h1 style={h1Style}>I think you may have lost your way</h1>
    </div>
  );
};

export default NotFoundPage;
