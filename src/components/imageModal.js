import LeftArrow from '../assets/left-arrow.png'; // PNG 이미지 임포트
import RightArrow from '../assets/right-arrow.png'; // PNG 이미지 임포트

const ImageModal = ({ clickedImg, handleRotationRight, handleRotationLeft, setClickedImg }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    };

    return (
      <div className="overlay dismiss" onClick={handleClick}>
        <img src={clickedImg} alt="original size"/>
        <span className="dismiss" onClick={handleClick}>X</span>
        
        {/* 오른쪽 화살표 */}
        <div className="overlay-arrows_right" onClick={handleRotationRight}>
          <img src={RightArrow} alt="Right Arrow" style={{ width: "24px", height: "24px" }} />
        </div>
        
        {/* 왼쪽 화살표 */}
        <div className="overlay-arrows_left" onClick={handleRotationLeft}>
          <img src={LeftArrow} alt="Left Arrow" style={{ width: "24px", height: "24px" }} />
        </div>
      </div>
    );
};

export default ImageModal;