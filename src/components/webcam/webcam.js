import React, { useCallback, useRef, useState, useEffect } from "react";
import Webcam from "react-webcam";
import axios from "axios";
import { setToken } from "../../utils/helper";

const CustomWebcam = ({ width, height, audio, timer, examResultId }) => {
  const webcamRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(null);

  useEffect(() => {
    if (timer % 5 === 0) {
      capture();
      const interval = setInterval(() => {
        if (sessionStorage.getItem('token')) {
          setToken(sessionStorage.getItem('token'));
        }
        axios.post(`${process.env.REACT_APP_BASE_URL}/api/exam-result/proof/${examResultId}`, {
          photoProof: imgSrc,
        })
        .then(response => {
          setImgSrc(null);
          console.log(response);
        })
        .catch(error => {
          console.log(error);
        })
      }, 1000);

      return () => clearInterval(interval);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [timer]);

  const capture = useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImgSrc(imageSrc);
  }, [webcamRef]);

  return (
    <div className="container">
      <Webcam height={height} width={width} ref={webcamRef} audio={audio} />
    </div>
  );
};

export default CustomWebcam;
