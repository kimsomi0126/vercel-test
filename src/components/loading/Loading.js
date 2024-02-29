import React from "react";
import { BeatLoader, ClipLoader, FadeLoader } from "react-spinners";

const Loading = () => {
  const laodingCss = {
    position: "fixed",
    left: 0,
    top: 0,
    zIndex: 999,
    width: "100%",
    height: "100%",
    background: "rgba(255,255,255,0.8)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  };
  return (
    <div style={laodingCss}>
      <FadeLoader size={20} color="#D3ECC8" loading={true} />
    </div>
  );
};

export default Loading;
