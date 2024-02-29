import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import {
  AboutIcon,
  AboutInfo,
  AboutItem,
  AboutList,
  AboutWrap,
  BackEndWrap,
  FrontEndWrap,
  TeamItem,
  TeamList,
  TeamWrap,
} from "../styles/about";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <>
      <Header sub={true}>About Team</Header>
      <AboutWrap>
        {/* 프론트엔드팀 */}
        <TeamWrap>
          <h2>
            <img src={process.env.PUBLIC_URL + "/images/frontend_logo.svg"} />
            <br />
            <a
              href="https://github.com/kimsomi0126/culturelog.git"
              target="_blank"
              rel="noopener noreferrer"
            >
              Team GitHub
            </a>
          </h2>

          <AboutList>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon01.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>김소미(팀장)</dt>
                <dd>
                  <a
                    href="https://github.com/kimsomi0126"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon02.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>이상재(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/devcodemaestro"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon03.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>도선경(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/do-sg"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon04.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>최동환(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/codefinger10"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
          </AboutList>
        </TeamWrap>
        {/* 백엔드팀 */}
        <TeamWrap>
          <h2>
            <img src={process.env.PUBLIC_URL + "/images/backend_logo.svg"} />
            <br />
            <a
              href="https://github.com/GYEONGROK11/culture-log"
              target="_blank"
              rel="noopener noreferrer"
            >
              Team GitHub
            </a>
          </h2>
          <AboutList>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon01.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>곽경록(팀장)</dt>
                <dd>
                  <a
                    href="https://github.com/GYEONGROK11"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon02.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>이영웅(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/lhero0105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon03.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>김현빈(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/gusqls3329"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
            <AboutItem>
              <AboutIcon className="about_icon">
                <img
                  src={process.env.PUBLIC_URL + "/images/about_icon04.svg"}
                />
              </AboutIcon>
              <AboutInfo className="about_info">
                <dt>박동현(팀원)</dt>
                <dd>
                  <a
                    href="https://github.com/dongki08"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    GitHub Link
                  </a>
                </dd>
              </AboutInfo>
            </AboutItem>
          </AboutList>
        </TeamWrap>
      </AboutWrap>
      <Footer />
    </>
  );
};

export default About;
