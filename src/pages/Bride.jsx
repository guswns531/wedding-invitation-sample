import React, { useEffect, useRef, useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';
import mainphoto from '../pages/KakaoTalk_Photo_005.jpeg'
import subphoto from '../pages/sub.jpg'
import ment from '../pages/IMG_0236.jpg'
import { Snackbar, Button } from '@mui/material';
import { motion } from 'framer-motion';
import Snowfall from 'react-snowfall';


const FadeInSection = ({ children }) => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target); // 중복 관찰 방지
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={sectionRef}
      className={`fade-in-section ${isVisible ? 'is-visible' : ''}`}
    >
      {children}
    </div>
  );
};


function Bride() {
  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  // state for account modal
  const [ buttonText, setButtonText ] = useState("복사하기"); 
  const [ clickedAccountData, setClickedAccountData ] = useState(null);
  const [ copiedAccount, setCopiedAccount ] = useState(null);

  const navermaps = useNavermaps()

  const handleClick = (item, index) => {
    //setCurrentIndex(index);
    //setClickedImg(item.link);
  };
  const accountClick = (account_data) => {
    setClickedAccountData(account_data.data);
  };


  const handleRotationRight = () => {
    const totalLength = data.data.length;
    if (currentIndex + 1 >= totalLength) {
      setCurrentIndex(0);
      const newUrl = data.data[0].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex + 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };
  
  const handleRotationLeft = () => {
    const totalLength = data.data.length;
    if (currentIndex === 0) {
      setCurrentIndex(totalLength - 1);
      const newUrl = data.data[totalLength-1].link;
      setClickedImg(newUrl);
      return;
    }
    const newIndex = currentIndex - 1;
    const newUrl = data.data.filter((item) => {
      return data.data.indexOf(item) === newIndex;
      });
    const newItem = newUrl[0].link;
    setClickedImg(newItem);
    setCurrentIndex(newIndex);
  };

  return (
    <div className="outside">
      <div className='main container'>
        <div className="row justify-content-md-center">
          <Snowfall color="white" snowflakeCount={50}/>
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
              <div>
                <img src={mainphoto} className='main-image' alt='t1'></img>
              </div>
              <FadeInSection>
                <div className='mainsection-text'>
                  <div className='mainsection-text-2'>
                    장현준 <span className='text2-inner'> 그리고 </span> 서혜림
                  </div>
                  <div className='mainsection-text-3'>2025. 04. 12 토요일 오전 11시<br/>잠실 더 베네치아</div>
                </div>
              </FadeInSection>
            </div>
            <div className='invitation-section'>
              <FadeInSection>
                <div className='invitation-section-text2'>
                  새로 시작하는 이 자리에 오셔서<br/>
                  축복이 가득하길 함께해 주시기 바랍니다.<br/>
                  ㅡ<br/><br/>
                  그냥 매일 손 잡고 걸을 수 있는<br/>
                  여유로운 저녁이 있는 것<br/>
                  지친 하루의 끝마다 돌아와 꼭 함께하는 것<br/><br/>
                  잠시 마주앉아 서로 이야기 들어줄 수 있는 것<br/>
                  - 내 꿈은 당신과 나태하게 사는것. 슌 -<br/><br/>
                </div>
                <div className='invitation-section-text3'>
                  장영섭・이은우<span className='text3-inner'>의 아들</span> 신랑 현준
                </div>
                <div className='invitation-section-text3'>
                  서상현・이미영<span className='text3-inner'>의 딸</span> 신부 현준
                </div>
              </FadeInSection>
            </div>
            <div className='gallery-section'>
              <FadeInSection>
                <div className='gallery-section-text'>
                  GALLERY
                </div>
              </FadeInSection>
            </div>
            <FadeInSection>
              <div>
                <div className='gallery-image-list-wrapper row'>
                    {data.data.map((item, index) => (
                      <div key={index} className='col-4'>
                        <img className='gallery-image' src={subphoto} alt={item.text} onClick={()=> handleClick(item, index)}/>
                      </div>
                    ))}
                </div>
                {clickedImg && <ImageModal 
                clickedImg={clickedImg}
                handleRotationRight={handleRotationRight}
                handleRotationLeft={handleRotationLeft}
                setClickedImg={setClickedImg}
                />}
              </div>
            </FadeInSection>
            <div className='location-section'>
              <FadeInSection>
              <div className='location-section-text1'>
                LOCATION
              </div>
              </FadeInSection>
            </div>
            <div className='location-map-section'>
              <MapDiv
                style={{
                  width: '100%',
                  height: '350px'
                }}
              >
                <NaverMap 
                  defaultCenter={new navermaps.LatLng(37.5206757,127.0558977)}
                  defaultZoom={18}>
                </NaverMap>
                <div></div>
              </MapDiv>
            </div>
            <FadeInSection>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>위치</div>
              <div className='location-how2-section-text2'>서울 강남구 영동대로 707</div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>대중교통</div>
              <div className='location-how2-section-text2'>청담역 13번 출구</div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>주차</div>
              <div className='location-how2-section-text2'>건물 내 기계식 주차</div>
            </div>
            </FadeInSection>
            <FadeInSection>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳</div>
                <div 
                  className='congratulatory-section-btn' 
                  onClick={() => accountClick(groomAccountData)}>신랑측</div>
                <div 
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측</div>
            </div>
            </FadeInSection>
            {clickedAccountData && <AccountModal 
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
              buttonText={buttonText}
              setButtonText={setButtonText}
              />}
          </div>
          <img src={ment} className='main-image' alt='t1'></img>
          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Bride;
