import { Layout, theme } from "antd";
import { AllLayout, WrapMain } from "../styles/basic";
import NavBar from "../components/common/NavBar";
import Footer from "../components/common/Footer";
import SideBar from "../components/common/SideBar";
import { Outlet } from "react-router";
const MainLayout = ({ children }) => {
  return (
    <AllLayout className="layout-wrap">
      {/* 사이드바(전체메뉴)영역 */}
      <SideBar />
      <Layout>
        {/* 상단네비영역 */}
        <NavBar />
        {/* 컨텐츠영역 */}
        <WrapMain>
          <Outlet />
        </WrapMain>
      </Layout>
      {/* 하단푸터 */}
      <Footer />
    </AllLayout>
  );
};
export default MainLayout;
