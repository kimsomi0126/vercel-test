import React from "react";
import "react-image-gallery/styles/css/image-gallery.css";
import DetailsNotice from "../../components/notice/DetailsNotice";
import useCustomLogin from "../../hooks/useCustomLogin";
import "../../styles/notice/gallery.css";

const NoticeDetails = () => {
  const { isLogin } = useCustomLogin();

  return <DetailsNotice isLogin={isLogin} />;
};

export default NoticeDetails;
