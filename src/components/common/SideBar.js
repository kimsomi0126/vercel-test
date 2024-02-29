import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LogoWrap, SideBarWrap } from "../../styles/basic";
import Sider from "antd/es/layout/Sider";
import SideMenu from "./SideMenu";
import { AllBtn } from "../../styles/ui/buttons";

const SideBar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const sideMenuRef = useRef(null);
  useEffect(() => {
    const handleOutsideClose = e => {
      if (
        window.innerWidth <= 798 &&
        !collapsed &&
        !sideMenuRef.current.contains(e.target)
      )
        setCollapsed(true);
    };
    document.addEventListener("click", handleOutsideClose);

    return () => document.removeEventListener("click", handleOutsideClose);
  }, [collapsed]);

  return (
    <SideBarWrap ref={sideMenuRef}>
      <Sider
        breakpoint="lg"
        onCollapse={(collapsed, type) => {
          setCollapsed(true);
        }}
        trigger={null}
        collapsible
        collapsed={collapsed}
        theme="light"
      >
        <LogoWrap>
          <Link to={"/"}>
            {collapsed ? (
              <img
                src={
                  process.env.PUBLIC_URL + "/images/common/header/smallLogo.svg"
                }
              />
            ) : (
              <img
                src={process.env.PUBLIC_URL + "/images/common/header/logo.svg"}
              />
            )}
          </Link>
        </LogoWrap>
        <SideMenu />
        <AllBtn type="text" onClick={() => setCollapsed(!collapsed)}>
          {collapsed ? "펼치기" : "접기"}
        </AllBtn>
      </Sider>
    </SideBarWrap>
  );
};

export default SideBar;
