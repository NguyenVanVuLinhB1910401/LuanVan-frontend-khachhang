import { useState } from "react";
const slideStyles = {
    width: "100%", 
    height: "300px",
    position: "relative",
};
const nextStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    right: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  
  const prevStyles = {
    position: "absolute",
    top: "50%",
    transform: "translate(0, -50%)",
    left: "32px",
    fontSize: "45px",
    color: "#fff",
    zIndex: 1,
    cursor: "pointer",
  };
  const imgStyles = {
    width: "100%", 
    height: "100%",
  }

const ImageSlider = ({ slides }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const goToPrevious = () => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  };
  const goToNext = () => {
    const isLastSlide = currentIndex === slides.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  };
  

  return (
    <div className="slider" style={slideStyles}>
      <div style={prevStyles} onClick={goToPrevious}><i className="fa fa-chevron-left" aria-hidden="true"></i></div>
      <div style={nextStyles} onClick={goToNext}><i className="fa fa-chevron-right" aria-hidden="true"></i></div>
      <div style={{width: "100%", height: "100%"}}><img style={imgStyles}  src={`${slides[currentIndex].url}`} alt="" /></div>
    </div>
  );
};

export default ImageSlider;