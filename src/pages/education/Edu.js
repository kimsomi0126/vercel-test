import React from "react";

const Edu = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "5rem",
        background: "#fff",
        padding: "10rem 0",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "2rem",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/images/common/ready.png"}
        alt="준비중"
        style={{ maxWidth: "50%" }}
      />
    </div>
  );
};

export default Edu;
