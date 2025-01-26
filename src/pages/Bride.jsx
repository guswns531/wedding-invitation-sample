import React, { useEffect, useRef, useState } from "react";
import pinIcon from "../assets/location-pin.png";
import brideAccountData from "../assets/bride_account_number_data.json";
import groomAccountData from "../assets/groom_account_number_data.json";
import "bootstrap/dist/css/bootstrap.min.css";
import { motion } from "framer-motion";
import {
  Container as MapDiv,
  NaverMap,
  Marker,
  useNavermaps,
} from "react-naver-maps";
import "../App.css";
import ImageModal from "../components/imageModal";
import AccountModal from "../components/accountModal";
import mainphoto from "../pictures/main.jpeg";
import roadphoto from "../pages/약도.jpg";
import callphoto from "../cal-2.png";
import navermap from "../pages/naver-map.png";
import kakaomap from "../pages/kakao-map.png";
import googlemap from "../pages/google-map.png";
import ment from "../pages/IMG_0236.jpg";
import Snowfall from "react-snowfall";
import "add-to-calendar-button";

const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current);
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${isVisible ? "is-visible" : ""}`}
    >
      {children}
    </div>
  );
};

function Bride() {
  // 1부터 12까지의 큰 이미지 배열 (모달용)
  const galleryImages = [...Array(18)].map((_, index) =>
    require(`../pictures/${index + 1} Large.jpeg`)
  );

  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);

  // state for account modal
  const [buttonText, setButtonText] = useState("복사하기");
  const [clickedAccountData, setClickedAccountData] = useState(null);
  const [copiedAccount, setCopiedAccount] = useState(null);

  const navermaps = useNavermaps();

  const handleClick = (item, index) => {
    setCurrentIndex(index);
    setClickedImg(item.link);
  };

  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };

  const handleRotationRight = () => {
    const totalLength = galleryImages.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      setClickedImg(galleryImages[0]);
    } else {
      const newIndex = currentIndex + 1;
      setCurrentIndex(newIndex);
      setClickedImg(galleryImages[newIndex]);
    }
  };

  const handleRotationLeft = () => {
    const totalLength = galleryImages.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      setClickedImg(galleryImages[totalLength - 1]);
    } else {
      const newIndex = currentIndex - 1;
      setCurrentIndex(newIndex);
      setClickedImg(galleryImages[newIndex]);
    }
  };

  return (
    <div className="outside">
      <div>
        <img src={mainphoto} className="main-image" alt="t1"></img>
      </div>
      <div className="main container">
        <div className="row justify-content-md-center">
          {/* <Snowfall color="white" snowflakeCount={50} /> */}
          {/* <div className="col"></div> */}
          <div className="col-md">
            <div className="mainsection">
              <FadeInSection>
                <div className="mainsection-text">
                  <div className="mainsection-text-2">
                    장현준 <span className="text2-inner"> & </span> 서혜림
                  </div>
                  <div className="mainsection-text-3">
                    2025. 04. 12 토요일 오전 11시
                    <br />
                    잠실 더 베네치아
                  </div>
                </div>
              </FadeInSection>
            </div>
            <div className="mainsection">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <img
                  src={callphoto}
                  className="main-image"
                  alt="t1"
                  style={{
                    width: "95%",
                  }}
                />
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  paddingTop: "10px",
                }}
              >
                <add-to-calendar-button
                  name="장현준・서혜림 결혼식"
                  startDate="2025-04-12"
                  endDate="2025-04-12"
                  startTime="11:00"
                  endTime="13:00"
                  timeZone="Asia/Seoul"
                  description="[url]https://hyeonjun-hyerim-wedding-invitation.vercel.app//|Click here![/url]"
                  options="'Apple','Google','iCal','Outlook.com'"
                  buttonsList
                  hideTextLabelButton
                  buttonStyle="round"
                  lightMode="bodyScheme"
                ></add-to-calendar-button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
                className="location-how2-section-text2"
              >
                캘린더 자동 추가하기
              </div>
            </div>
            <div className="invitation-section">
              <FadeInSection>
                <div className="invitation-section-text2">
                  새로 시작하는 이 자리에 오셔서
                  <br />
                  축복이 가득하길 함께해 주시기 바랍니다.
                  <br />
                  ㅡ<br />
                  <br />
                  그냥 매일 손 잡고 걸을 수 있는
                  <br />
                  여유로운 저녁이 있는 것<br />
                  지친 하루의 끝마다 돌아와 꼭 함께하는 것<br />
                  잠시 마주앉아 서로 이야기 들어줄 수 있는 것<br />
                  - 내 꿈은 당신과 나태하게 사는것. 슌 -<br />
                  <br />
                </div>
                <div className="invitation-section-text3">
                  장영섭・이은우<span className="text3-inner">의 장남</span>{" "}
                  신랑 현준
                </div>
                <div className="invitation-section-text3">
                  서상현・이미영<span className="text3-inner">의 장녀</span>{" "}
                  신부 혜림
                </div>
              </FadeInSection>
            </div>
            <div className="gallery-section">
              <FadeInSection>
                <div className="congratulatory-section-text">GALLERY</div>
              </FadeInSection>
            </div>

            <div className="gallery-image-list-wrapper row">
              {[...Array(18)].map((_, index) => {
                const imgNumber = index + 1;
                const imgSrcMedium = require(`../pictures/${imgNumber} Medium.jpeg`);
                const imgSrc = require(`../pictures/${imgNumber} Large.jpeg`);
                return (
                  <div key={index} className="col-4">
                    <img
                      className="gallery-image"
                      src={imgSrcMedium}
                      alt={`Image ${imgNumber}`}
                      style={{
                        width: "100%",
                        aspectRatio: "1 / 1", // 정사각형 유지
                        objectFit: "cover",
                      }}
                      onClick={() => handleClick({ link: imgSrc }, index)}
                    />
                  </div>
                );
              })}
            </div>
            {clickedImg && (
              <ImageModal
                clickedImg={clickedImg}
                handleRotationRight={handleRotationRight}
                handleRotationLeft={handleRotationLeft}
                setClickedImg={setClickedImg}
              />
            )}

            <div className="location-section">
              <FadeInSection>
                <div className="congratulatory-section-text">LOCATION</div>
              </FadeInSection>
            </div>
            <FadeInSection>
              <div>
                <img
                  src={roadphoto}
                  className="main-image"
                  alt="t1"
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                ></img>
              </div>
              <div className="form-group">
                <div className="col-md-12">
                  <div className="my-3 text-center">
                    <a href="https://naver.me/5PS2KQ4T">
                      <img
                        className="map-icon"
                        src={navermap}
                        alt="naver map"
                      />
                    </a>
                    <a href="https://kko.kakao.com/c3O6C6YDZq">
                      <img
                        className="map-icon"
                        src={kakaomap}
                        alt="kakao map"
                      />
                    </a>
                    <a href="https://maps.app.goo.gl/fdcBbk2fv1ghw1mX8">
                      <img
                        className="map-icon"
                        src={googlemap}
                        alt="google map"
                      />
                    </a>
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  className="location-how2-section-text2"
                >
                  찾아오는 길 찾기
                </div>
              </div>
              <div className="location-how-publictrans-section">
                <div className="location-how-publictrans-section-text1">
                  위치
                </div>
                <div className="location-how2-section-text2">
                  서울시 송파구 올림픽로35다길 42 루터회관 3층 "더 베네치아"
                </div>
              </div>
              <div className="location-how-publictrans-section">
                <div className="location-how-publictrans-section-text1">
                  대중교통
                </div>
                <div className="location-how2-section-text2">
                  {" "}
                  2호선 잠실역 → ⑧번 출구 도보 2분거리
                </div>
                <div className="location-how2-section-text2">
                  {" "}
                  8호선 잠실역 → ⑨번 출구 도보 1분거리
                </div>
              </div>
              <div className="location-how-publictrans-section">
                <div className="location-how-publictrans-section-text1">
                  주차
                </div>
                <div className="location-how2-section-text2">
                  루터회관 지하주차장 이용 (300대 수용, 2시간 무료)
                </div>
              </div>
            </FadeInSection>
            <FadeInSection>
              <div className="congratulatory-section">
                <div className="congratulatory-section-text">
                  마음 전하실 곳
                </div>
                <div
                  className="congratulatory-section-btn"
                  onClick={() => accountClick(groomAccountData)}
                >
                  신랑측
                </div>
                <div
                  className="congratulatory-section-btn"
                  onClick={() => accountClick(brideAccountData)}
                >
                  신부측
                </div>
              </div>
            </FadeInSection>
            {clickedAccountData && (
              <AccountModal
                clickedAccountData={clickedAccountData}
                setClickedAccountData={setClickedAccountData}
                copiedAccount={copiedAccount}
                setCopiedAccount={setCopiedAccount}
                buttonText={buttonText}
                setButtonText={setButtonText}
              />
            )}
          </div>
          {/* <div className="col"></div> */}
        </div>
      </div>
    </div>
  );
}

export default Bride;
