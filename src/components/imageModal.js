import { ReactComponent as LeftArrow } from '../assets/left-arrow.png';
import { ReactComponent as RightArrow } from '../assets/right-arrow.png';

const ImageModal = ({ clickedImg, handleRotationRight, handleRotationLeft, setClickedImg }) => {
    const handleClick = (e) => {
        if (e.target.classList.contains("dismiss")) {
            setClickedImg(null);
        }
    }

    return (
      <div className="overlay dismiss" onClick={handleClick}>
        <img src={clickedImg} alt="original size"/>
        <span className="dismiss" onClick={handleClick}>X</span>
        
        <div className="overlay-arrows_right" onClick={handleRotationRight}>
          <RightArrow />
        </div>
        <div className="overlay-arrows_left" onClick={handleRotationLeft}>
          <LeftArrow />
        </div>
      </div>
    );
};

export default ImageModal;