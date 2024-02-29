import React from "react";
import { Outlet } from "react-router";
import { ContentInner, WrapContent } from "../../styles/basic";

const ContentLayout = () => {
  return (
    <WrapContent maxw="1440">
      <ContentInner>
        <Outlet />
      </ContentInner>
    </WrapContent>
  );
};

export default ContentLayout;
