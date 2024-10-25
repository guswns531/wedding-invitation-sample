import React, { useState } from 'react';
import data from '../assets/image_data.json';
import pinIcon from '../assets/location-pin.png';
import brideAccountData from '../assets/bride_account_number_data.json';
import groomAccountData from '../assets/groom_account_number_data.json';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container as MapDiv, NaverMap, Marker, useNavermaps} from 'react-naver-maps';
import '../App.css';
import ImageModal from '../components/imageModal';
import AccountModal from '../components/accountModal';
import mainphoto from '../pages/main.JPG'
import subphoto from '../pages/sub.jpg'

function Bride() {
  // state for image modal
  const [clickedImg, setClickedImg] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(null);
  // state for account modal
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
    <div className="">
      <div className='main container'>
        <div className="row justify-content-md-center">
          <div className="col col-md-2 col-lg-3">
          </div>

          <div className="col-md">
            <div className='mainsection'>
              <div>
                <img src={mainphoto} className='main-image' alt='t1'></img>
              </div>
              <div className='mainsection-text'>
                <div className='mainsection-text-2'>
                  김유리 <span className='text2-inner'> & </span> 함준영
                </div>
                <div className='mainsection-text-3'>2025. 02. 08 토요일 오후 4시 30분<br/>드레스가든 청담</div>
              </div>
            </div>
            <div className='invitation-section'>
              <div className='invitation-section-text1'>INVITATION</div>
              <div className='invitation-section-text2'>
                    INVITATION<br/>
                    INVITATION
              </div>
              <div className='invitation-section-text3'>
                함형인・최금란<span className='text3-inner'>의 아들</span> 준영
              </div>
              <div className='invitation-section-text3'>
                김기태・박재영<span className='text3-inner'>의 딸</span> 유리
              </div>
            </div>
            <div className='gallery-section'>
              <div className='gallery-section-text'>
                GALLERY
              </div>
            </div>
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
            <div className='location-section'>
              <div className='location-section-text1'>
                LOCATION
              </div>
            </div>
            <div className='location-map-section'>
              <MapDiv
                style={{
                  width: '100%',
                  height: '350px'
                }}
              >
                {/* <NaverMap 
                  defaultCenter={new navermaps.LatLng(37.44865592343993,126.95097244672262)}
                  defaultZoom={16}>
                  <Marker 
                  position={new navermaps.LatLng(37.44865592343993,126.95097244672262)} 
                  icon={
                    {
                      url : pinIcon,
                      size : new navermaps.Size(64,64)
                    }
                  }/>
                </NaverMap> */}
                <div>앱(지도) 연동 할건데 인증 오류로 잠시 비어있음</div>
              </MapDiv>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>위치</div>
              <div className='location-how2-section-text2'>
                <div>서울 강남구 영동대로 707</div>
              </div>
            </div>
            <div className='location-how-publictrans-section'>
              <div className='location-how-publictrans-section-text1'>대중교통</div>
              <div className='location-how2-section-text2'>
                <div>청담역 13번 출구</div>
              </div>
            </div>
            <div className='location-how2-section'>
              <div className='location-how2-section-text1'>자가용</div>
              <div className='location-how2-section-text2'>
                그냥 대중교통으로 오세요(기계식 주차임)
              </div>
            </div>
            <div className='congratulatory-section'>
              <div className='congratulatory-section-text'>마음 전하실 곳??(일단 팝업 닫아둠, 계좌 모름)</div>
                <div 
                  className='congratulatory-section-btn' 
                  onClick={() => accountClick(groomAccountData)}>신랑측</div>
                <div 
                  className='congratulatory-section-btn'
                  onClick={() => accountClick(brideAccountData)}>신부측</div>
            </div>
            {clickedAccountData && <AccountModal 
              clickedAccountData={clickedAccountData}
              setClickedAccountData={setClickedAccountData}
              copiedAccount={copiedAccount}
              setCopiedAccount={setCopiedAccount}
              />}
          </div>

          <div className="col col-md-2 col-lg-3">
          </div>
        </div>
      </div>
    </div>
    
  );
}

export default Bride;
