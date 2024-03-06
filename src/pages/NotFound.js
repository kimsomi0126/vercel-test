const NotFound = () => {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        margin: "5rem auto 0",
        background: "#fff",
        padding: "10rem 0",
        boxShadow: "0px 0px 10px 0px rgba(0, 0, 0, 0.05)",
        borderRadius: "2rem",
        maxWidth: "1440px",
      }}
    >
      <img
        src={process.env.PUBLIC_URL + "/images/common/404.png"}
        alt="page not found"
        style={{ maxWidth: "60%" }}
      />
    </div>
  );
};

export default NotFound;
